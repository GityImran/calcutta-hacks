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

// Build functions
function buildLaptop(cx: number, cy: number, cz: number, voxels: VoxelData[]) {
  // Laptop base
  for (let x = -8; x <= 8; x++) {
    for (let y = 0; y <= 1; y++) {
      for (let z = -12; z <= 0; z++) {
        // Base
        if (Math.abs(x) <= 8 && y <= 0 && z <= 0 && z >= -12) {
          voxels.push({
            x: cx + x,
            y: cy + y,
            z: cz + z,
            color: new THREE.Color(PALETTE.laptopBody)
          });
        }
        // Screen
        if (Math.abs(x) <= 7 && y >= 1 && y <= 2 && z >= -11 && z <= -1) {
          if (y === 2) {
            // Screen
            voxels.push({
              x: cx + x,
              y: cy + y + 5,
              z: cz + z + 6,
              color: new THREE.Color(PALETTE.laptopScreen)
            });
            // Bezel
            if (Math.abs(x) >= 6 || z <= -10 || z >= -2) {
              voxels.push({
                x: cx + x,
                y: cy + y + 5,
                z: cz + z + 6,
                color: new THREE.Color(PALETTE.laptopBezel)
              });
            }
          }
        }
      }
    }
  }
  
  // Keyboard
  for (let x = -6; x <= 6; x += 3) {
    for (let z = -10; z <= -2; z += 2) {
      voxels.push({
        x: cx + x,
        y: cy + 0.5,
        z: cz + z,
        color: new THREE.Color(PALETTE.laptopKey)
      });
    }
  }
}

function buildBooks(cx: number, cy: number, cz: number, voxels: VoxelData[]) {
  const books: Book[] = [
    { w: 6, d: 8, h: 2, col: PALETTE.bookCoverBlue, rot: 0 },
    { w: 6, d: 8, h: 1, col: PALETTE.bookCoverBeige, rot: 0.1 },
    { w: 6, d: 8, h: 3, col: PALETTE.bookPages, rot: -0.1 }
  ];

  let xOffset = 0;
  books.forEach(book => {
    for (let y = 0; y < book.h; y++) {
      for (let x = -book.w/2; x < book.w/2; x++) {
        for (let z = -book.d/2; z < book.d/2; z++) {
          const rx = x * Math.cos(book.rot) - z * Math.sin(book.rot);
          const rz = x * Math.sin(book.rot) + z * Math.cos(book.rot);
          
          let col = book.col;
          // Add some variation
          if (y === 0 && Math.random() > 0.8) col = col - 0x111111;
          
          voxels.push({
            x: cx + rx + xOffset,
            y: cy + y,
            z: cz + rz,
            color: new THREE.Color(col)
          });
        }
      }
    }
    xOffset += book.w * 0.8;
  });
}

function buildMug(cx: number, cz: number, voxels: VoxelData[]) {
  const radius = 3;
  const height = 6;
  
  // Mug body
  for (let y = 0; y < height; y++) {
    for (let x = -radius; x <= radius; x++) {
      for (let z = -radius; z <= radius; z++) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist <= radius && dist >= radius - 1) {
          voxels.push({
            x: cx + x,
            y: y,
            z: cz + z,
            color: new THREE.Color(PALETTE.mug)
          });
        }
      }
    }
  }
  
  // Coffee
  for (let y = 1; y < height - 1; y++) {
    for (let x = -radius + 1; x <= radius - 1; x++) {
      for (let z = -radius + 1; z <= radius - 1; z++) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist <= radius - 1) {
          voxels.push({
            x: cx + x,
            y: y,
            z: cz + z,
            color: new THREE.Color(PALETTE.coffee)
          });
        }
      }
    }
  }
}

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

// Add other build functions here...

function buildTable(voxels: VoxelData[]) {
  // Table top
  for (let x = -30; x <= 30; x++) {
    for (let z = -30; z <= 30; z++) {
      if (Math.abs(x) <= 30 && Math.abs(z) <= 30) {
        voxels.push({
          x,
          y: 0,
          z,
          color: new THREE.Color(PALETTE.table)
        });
      }
    }
  }
  
  // Table legs
  for (let y = -10; y < 0; y++) {
    for (let x of [-25, 25]) {
      for (let z of [-25, 25]) {
        voxels.push({
          x,
          y,
          z,
          color: new THREE.Color(PALETTE.tableDark)
        });
      }
    }
  }
}

// Add other build functions...

export default function WorkspaceScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

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
    buildBooks(15, 1, 10, voxels);
    buildMug(-10, 5, voxels);
    buildNotePage(-15, -10, 0.3, voxels);
    
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
    
    // 9. Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    // 10. Animation loop
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
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      window.removeEventListener('resize', handleResize);
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
          Loading 3D scene...
        </div>
      )}
    </div>
  );
}
