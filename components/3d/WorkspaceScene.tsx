'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Types
interface VoxelData {
  x: number;
  y: number;
  z: number;
  color: THREE.Color;
}

interface Book {
  w: number;
  d: number;
  h: number;
  col: number;
  rot: number;
}

interface Pencil {
  x: number;
  z: number;
  h: number;
  c: number;
}

interface Leaf {
  x: number;
  y: number;
  z: number;
  s: number;
}

const VOXEL_SIZE = 1;
const PALETTE = {
  table: 0x8B5A2B,      // Wood brown
  tableDark: 0x5C3A18,  // Darker wood
  laptopBody: 0xDDDDDD, // Light grey
  laptopKey: 0x222222,  // Black keys
  laptopScreen: 0x6495ED, // Cornflower blue
  laptopBezel: 0x111111,// Black bezel
  mug: 0x8B4513,        // Saddle Brown
  coffee: 0x3e2723,     // Dark coffee
  paper: 0xE0E0E0,      // Off-white paper
  paperText: 0x999999,  // Grey text lines
  pencilCup: 0xA0522D,  // Sienna wood
  pencilWood: 0xF4A460, // Sandy brown
  pencilYellow: 0xFFD700,
  pencilBlue: 0x4682B4,
  pencilRed: 0xCD5C5C,
  pencilLead: 0x111111,
  bookCoverBlue: 0x6495ED,
  bookCoverBeige: 0xF5F5DC,
  bookPages: 0xFFFAFA,
  glassesFrame: 0x000000,
  glass: 0xAACCFF,      // Light blue tint for glass
  glassGlare: 0xFFFFFF, // White reflection
  plantPot: 0xFFFFFF,
  plantSoil: 0x4E342E,
  plantStem: 0x795548,
  plantLeafDark: 0x388E3C,
  plantLeafLight: 0x66BB6A,
  notePage: 0xFFFAFA,
  noteText: 0x999999
};

export default function WorkspaceScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Build functions
  function buildNotePage(cx: number, cz: number, rotation: number, voxels: VoxelData[]) {
    const w = 10;
    const d = 14;
    const y = 0;

    for(let x = -w/2; x < w/2; x++) {
      for(let z = -d/2; z < d/2; z++) {
        const rx = x * Math.cos(rotation) - z * Math.sin(rotation);
        const rz = x * Math.sin(rotation) + z * Math.cos(rotation);
        
        let col = PALETTE.notePage;
        if (z > -d/2 + 2 && z < d/2 - 2 && (Math.floor(z) % 2 === 0)) {
          if (Math.abs(x) < w/2 - 1) {
            col = PALETTE.noteText;
          }
        }
        
        voxels.push({
          x: rx + cx,
          y: y,
          z: rz + cz,
          color: new THREE.Color(col)
        });
      }
    }
  }

  function buildPlant(cx: number, cz: number, voxels: VoxelData[]) {
    // Pot
    for(let y = 0; y < 7; y++) {
      for(let x = -3; x <= 3; x++) {
        for(let z = -3; z <= 3; z++) {
          const dist = Math.sqrt(x*x + z*z);
          if (dist <= 3 && y === 0) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.plantPot)});
          }
          if (dist <= 3 && dist > 2) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.plantPot)});
          }
          if (dist <= 2 && y > 0 && y < 6) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.plantSoil)});
          }
        }
      }
    }

    // Stems
    for(let y = 6; y < 18; y++) {
      if (y < 12) voxels.push({x: cx, y, z: cz, color: new THREE.Color(PALETTE.plantStem)});
      if (y < 10) {
        voxels.push({x: cx + 1, y, z: cz + 1, color: new THREE.Color(PALETTE.plantStem)});
        voxels.push({x: cx - 1, y, z: cz - 1, color: new THREE.Color(PALETTE.plantStem)});
      }
    }

    // Leaves
    const leaves: Leaf[] = [
      {x: 0, y: 12, z: 0, s: 3},
      {x: 2, y: 10, z: 2, s: 3},
      {x: -2, y: 9, z: -2, s: 3},
      {x: -1, y: 14, z: 1, s: 2},
      {x: 1, y: 13, z: -1, s: 2},
    ];

    leaves.forEach(leaf => {
      for(let lx = -leaf.s; lx <= leaf.s; lx++) {
        for(let lz = -leaf.s; lz <= leaf.s; lz++) {
          const dist = Math.sqrt(lx*lx + lz*lz);
          if (dist <= leaf.s) {
            const ly = Math.floor(Math.cos(dist / leaf.s * Math.PI/2) * 2);
            const col = (lx + lz) % 2 === 0 ? PALETTE.plantLeafDark : PALETTE.plantLeafLight;
            voxels.push({
              x: cx + leaf.x + lx,
              y: leaf.y + ly,
              z: cz + leaf.z + lz,
              color: new THREE.Color(col)
            });
          }
        }
      }
    });
  }

  function buildBooks(cx: number, cz: number, rotation: number, voxels: VoxelData[]) {
    const books: Book[] = [
      { w: 14, d: 18, h: 3, col: PALETTE.bookCoverBeige, rot: 0.1 },
      { w: 13, d: 17, h: 2, col: PALETTE.pencilCup, rot: -0.15 },
      { w: 14, d: 18, h: 3, col: PALETTE.bookCoverBlue, rot: 0.05 }
    ];

    let currentY = 0;

    books.forEach((book, index) => {
      for(let y = 0; y < book.h; y++) {
        for(let x = -book.w/2; x < book.w/2; x++) {
          for(let z = -book.d/2; z < book.d/2; z++) {
            let col = book.col;
            if (x > -book.w/2 + 1 && x < book.w/2 - 0.5 && z > -book.d/2 + 0.5 && z < book.d/2 - 0.5) {
              if (y > 0 && y < book.h - 1) col = PALETTE.bookPages;
            }
            if (x <= -book.w/2 + 1) col = book.col;
            if (index === books.length - 1 && y === book.h - 1 && Math.abs(x) < 2 && z > 0) {
              col = 0xEEEEEE;
            }
            
            const rx = x * Math.cos(rotation + book.rot) - z * Math.sin(rotation + book.rot);
            const rz = x * Math.sin(rotation + book.rot) + z * Math.cos(rotation + book.rot);
            
            voxels.push({
              x: rx + cx,
              y: currentY + y,
              z: rz + cz,
              color: new THREE.Color(col)
            });
          }
        }
      }
      currentY += book.h;
    });
  }

  function buildTable(voxels: VoxelData[]) {
    const width = 60;
    const depth = 40;
    const height = 2;
    const y = -1;

    for(let x = -width/2; x < width/2; x++) {
      for(let z = -depth/2; z < depth/2; z++) {
        for(let h = 0; h < height; h++) {
          voxels.push({
            x,
            y: y - h,
            z,
            color: new THREE.Color(PALETTE.table)
          });
        }
      }
    }
  }

  function buildLaptop(offsetX: number, offsetZ: number, rotation: number, voxels: VoxelData[]) {
    const width = 20;
    const depth = 14;

    // Base
    for(let x = -width/2; x < width/2; x++) {
      for(let z = -depth/2; z < depth/2; z++) {
        let col = PALETTE.laptopBody;
        if (x > -width/2 + 1 && x < width/2 - 1 && z > -depth/2 + 4 && z < depth/2 - 1) {
          if (x % 2 !== 0 && z % 2 !== 0) col = PALETTE.laptopKey;
          else col = PALETTE.laptopBody;
        }
        if (Math.abs(x) < 3 && z < -depth/2 + 3 && z > -depth/2 + 0.5) {
          col = 0x999999;
        }

        const rx = x * Math.cos(rotation) - z * Math.sin(rotation);
        const rz = x * Math.sin(rotation) + z * Math.cos(rotation);
        
        voxels.push({
          x: rx + offsetX,
          y: 0.5,
          z: rz + offsetZ,
          color: new THREE.Color(col)
        });
      }
    }

    // Screen
    const screenHeight = 12;
    const angle = Math.PI / 6;

    for(let x = -width/2; x < width/2; x++) {
      for(let h = 0; h < screenHeight; h++) {
        for(let t = 0; t < 1; t++) {
          const localY = h * Math.cos(angle) + t * Math.sin(angle);
          const localZ = (depth/2) + h * Math.sin(angle) - t * Math.cos(angle);
          
          let col = PALETTE.laptopBezel;
          if (x > -width/2 + 1 && x < width/2 - 1 && h > 1 && h < screenHeight - 1 && t === 0) {
            col = PALETTE.laptopScreen;
            if (h - x > 5 && h - x < 7) col = 0x87CEFA;
          }
          
          const rx = x * Math.cos(rotation) - (localZ - 1) * Math.sin(rotation);
          const rz = x * Math.sin(rotation) + (localZ - 1) * Math.cos(rotation);
          
          voxels.push({
            x: rx + offsetX,
            y: 1 + localY,
            z: rz + offsetZ,
            color: new THREE.Color(col)
          });
        }
      }
    }
  }

  function buildMug(cx: number, cz: number, voxels: VoxelData[]) {
    const radius = 3.5;
    const height = 7;
    
    for(let y = 0; y < height; y++) {
      for(let x = -radius - 2; x <= radius + 2; x++) {
        for(let z = -radius - 2; z <= radius + 2; z++) {
          const dist = Math.sqrt(x*x + z*z);
          
          if (dist <= radius && dist > radius - 1) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.mug)});
          }
          if (y === 0 && dist <= radius) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.mug)});
          }
          if (y === height - 1 && dist <= radius - 1) {
            voxels.push({x: cx + x, y: y - 1, z: cz + z, color: new THREE.Color(PALETTE.coffee)});
          }
          
          // Handle
          if (x > radius - 1 && x < radius + 3 && z > -1 && z < 1) {
            const handleYCenter = height / 2;
            const dy = y - handleYCenter;
            if (x > radius && Math.abs(dy) < 2.5 && (Math.abs(dy) > 1.5 || x > radius + 1.5)) {
              voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.mug)});
            }
          }
        }
      }
    }
  }

  function buildPencilHolder(cx: number, cz: number, voxels: VoxelData[]) {
    const radius = 3;
    const height = 6;

    // Cup
    for(let y = 0; y < height; y++) {
      for(let x = -radius; x <= radius; x++) {
        for(let z = -radius; z <= radius; z++) {
          const dist = Math.sqrt(x*x + z*z);
          if (dist <= radius && dist > radius - 1) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.pencilCup)});
          }
          if (y === 0 && dist <= radius) {
            voxels.push({x: cx + x, y, z: cz + z, color: new THREE.Color(PALETTE.pencilCup)});
          }
        }
      }
    }

    // Pencils
    const pencils: Pencil[] = [
      { x: -1, z: -1, h: 9, c: PALETTE.pencilYellow },
      { x: 1, z: 1, h: 8, c: PALETTE.pencilBlue },
      { x: -1.5, z: 1, h: 10, c: PALETTE.pencilRed },
      { x: 1.5, z: -0.5, h: 7, c: PALETTE.pencilWood }
    ];

    pencils.forEach(p => {
      for(let y = 1; y < p.h; y++) {
        let col = p.c;
        if (y >= p.h - 2) col = PALETTE.pencilWood;
        if (y === p.h - 1) col = p.c;
        if (y === p.h - 3 && p.c === PALETTE.pencilYellow) col = 0xC0C0C0;
        if (y >= p.h - 2 && p.c === PALETTE.pencilYellow) col = 0xFF69B4;
        
        voxels.push({
          x: cx + p.x,
          y,
          z: cz + p.z,
          color: new THREE.Color(col)
        });
      }
    });
  }

  function buildPaperStack(cx: number, cz: number, rotation: number, voxels: VoxelData[]) {
    const w = 10;
    const d = 14;
    const stackHeight = 12;

    for (let i = 0; i < stackHeight; i++) {
      if (i % 2 !== 0) continue;
      
      const jiggleX = (Math.random() - 0.5) * 1.5;
      const jiggleZ = (Math.random() - 0.5) * 1.5;
      const sheetRot = (Math.random() - 0.5) * 0.1;
      
      const localCos = Math.cos(sheetRot);
      const localSin = Math.sin(sheetRot);

      for(let x = -w/2; x < w/2; x++) {
        for(let z = -d/2; z < d/2; z++) {
          const lx = x * localCos - z * localSin + jiggleX;
          const lz = x * localSin + z * localCos + jiggleZ;
          
          let col = PALETTE.paper;
          if (Math.abs(lx) < w/2 - 1 && (Math.floor(lz) % 2 === 0)) {
            if (Math.random() > 0.2) col = PALETTE.paperText;
          }
          if (i === stackHeight - 2 && z < -d/2 + 4 && Math.abs(x) < 3) {
            col = 0x555555;
          }
          
          const rx = lx * Math.cos(rotation) - lz * Math.sin(rotation);
          const rz = lx * Math.sin(rotation) + lz * Math.cos(rotation);
          
          voxels.push({
            x: rx + cx,
            y: i * 0.5,
            z: rz + cz,
            color: new THREE.Color(col)
          });
        }
      }
    }
  }

  useEffect(() => {
    if (!mountRef.current) return;
    
    setLoading(true);
    
    // 1. Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF0ECE1);
    scene.fog = new THREE.Fog(0xF0ECE1, 50, 200);
    
    // 2. Create camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 30, 30);
    camera.lookAt(0, 10, 0);
    
    // 3. Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Clear the container and append the renderer
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
      mountRef.current.tabIndex = 0;
      mountRef.current.style.outline = 'none';
    }
    
    // 2. Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 30, 30);
    camera.lookAt(0, 0, 0);
    
    // 3. Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear the container and append the renderer
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
      
      // Make it focusable for keyboard controls
      mountRef.current.tabIndex = 0;
      mountRef.current.style.outline = 'none';
    }
    
    // 4. Add basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    });
  }
}
}

  function buildMug(cx: number, cz: number, voxels: VoxelData[]) {
    const radius = 3.5;
const height = 7;
  
for(let y = 0; y < height; y++) {
  for(let x = -radius - 2; x <= radius + 2; x++) {
    for(let z = -radius - 2; z <= radius + 2; z++) {
      const dist = Math.sqrt(x*x + z*z);
      
      if (dist <= radius && dist > radius - 1) {
    // Handle window resize
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    
    // 4. Add basic lighting
    // 4. Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(30, 60, 30);
    dirLight.castShadow = true;
    scene.add(dirLight);
    
    // 5. Create voxel geometry and material
    const voxelGeometry = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);
    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      shininess: 20,
      specular: 0x222222,
      flatShading: false
    });

    // 6. Generate voxel data
    const voxels: VoxelData[] = [];
    buildTable(voxels);
    buildLaptop(0, 5, 0, voxels);
    buildMug(15, 5, voxels);
    buildPencilHolder(-18, -5, voxels);
    buildPaperStack(-15, 10, -0.2, voxels);
    buildBooks(20, -10, -0.1, voxels);
    buildPlant(20, 12, voxels);
    buildNotePage(0, -12, 0.1, voxels);

    // 7. Create instanced mesh
    const count = voxels.length;
    const instancedMesh = new THREE.InstancedMesh(voxelGeometry, material, count);
    
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      const v = voxels[i];
      matrix.setPosition(v.x, v.y, v.z);
      instancedMesh.setMatrixAt(i, matrix);
      instancedMesh.setColorAt(i, v.color);
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    
    scene.add(instancedMesh);
    setLoading(false);
    
    // 8. Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 200;
    controls.target.set(0, 10, 0);
    
    // 9. Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }} 
      />
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#333333',
          fontSize: '24px',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          Generating Voxels...
        </div>
      )}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }} 
      />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: 'rgba(51, 51, 51, 0.5)',
        fontSize: '14px',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
