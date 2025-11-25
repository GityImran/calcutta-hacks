'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const VoxelWorkspace = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuration ---
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

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEFDFBB);
    scene.fog = new THREE.Fog(0xEFDFBB, 50, 200);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Adjust camera position to better frame the scene
    camera.position.set(40, 50, 60);
    // Look at the center of the table
    camera.lookAt(0, 10, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear the container and append the renderer
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
      // Ensure the canvas is focusable
      renderer.domElement.tabIndex = 0;
      renderer.domElement.style.outline = 'none';
    }

    // Create controls after renderer is set up
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // Basic controls setup
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.screenSpacePanning = false;
    
    // Enable all controls
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    
    // Set limits
    controls.minDistance = 20;
    controls.maxDistance = 200;
    controls.minPolarAngle = 0; // Allow looking from top
    controls.maxPolarAngle = Math.PI / 2 + 0.5; // Limit vertical rotation
    
    // Set initial target
    controls.target.set(0, 10, 0);
    controls.update();
    
    // Prevent default touch actions
    const preventDefault = (e: Event) => e.preventDefault();
    const preventContextMenu = (e: Event) => e.preventDefault();
    
    // Add event listeners
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', preventDefault);
    canvas.addEventListener('touchstart', preventDefault, { passive: false });
    canvas.addEventListener('touchmove', preventDefault, { passive: false });
    canvas.addEventListener('contextmenu', preventContextMenu);
    
    // Set cursor style
    canvas.style.cursor = 'grab';
    canvas.addEventListener('mousedown', () => {
      canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('mouseup', () => {
      canvas.style.cursor = 'grab';
    });

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(40, 60, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    scene.add(dirLight);

    // --- Voxel Generation Logic ---
    const voxelGeometry = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);
    voxelGeometry.scale(0.95, 0.95, 0.95);

    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.8,
    });

    const voxels: {x: number, y: number, z: number, color: THREE.Color}[] = [];

    function addVoxel(x: number, y: number, z: number, colorHex: number) {
      voxels.push({ x, y, z, color: new THREE.Color(colorHex) });
    }

    // --- Builder Functions ---
    function buildTable() {
      const width = 60;
      const depth = 40;
      const height = 2;
      const y = -1;

      for(let x = -width/2; x < width/2; x++) {
        for(let z = -depth/2; z < depth/2; z++) {
          for(let h = 0; h < height; h++) {
            addVoxel(x, y - h, z, PALETTE.table);
          }
        }
      }
    }

    function buildLaptop(offsetX: number, offsetZ: number, rotation: number) {
      const width = 20;
      const depth = 14;
      
      // Transform helpers
      const transform = (x: number, y: number, z: number) => {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const rx = x * cos - z * sin;
        const rz = x * sin + z * cos;
        return { x: rx + offsetX, y: y, z: rz + offsetZ };
      };

      // Base
      for(let x = -width/2; x < width/2; x++) {
        for(let z = -depth/2; z < depth/2; z++) {
          let col = PALETTE.laptopBody;
          // Keyboard area
          if (x > -width/2 + 1 && x < width/2 - 1 && z > -depth/2 + 4 && z < depth/2 - 1) {
            if (x % 2 !== 0 && z % 2 !== 0) col = PALETTE.laptopKey;
            else col = PALETTE.laptopBody; 
          }
          // Trackpad
          if (Math.abs(x) < 3 && z < -depth/2 + 3 && z > -depth/2 + 0.5) {
            col = 0x999999;
          }

          const pos = transform(x, 0.5, z);
          addVoxel(pos.x, pos.y, pos.z, col);
        }
      }

      // Screen
      const screenHeight = 12;
      const angle = Math.PI / 6; // 30 degrees back

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

            const pos = transform(x, 1 + localY, localZ - 1); 
            addVoxel(pos.x, pos.y, pos.z, col);
          }
        }
      }
    }

    function buildMug(cx: number, cz: number) {
      const radius = 3.5;
      const height = 7;
      
      for(let y = 0; y < height; y++) {
        for(let x = -radius - 2; x <= radius + 2; x++) {
          for(let z = -radius - 2; z <= radius + 2; z++) {
            const dist = Math.sqrt(x*x + z*z);
            
            if (dist <= radius && dist > radius - 1) {
              addVoxel(cx + x, y, cz + z, PALETTE.mug);
            }
            if (y === 0 && dist <= radius) {
              addVoxel(cx + x, y, cz + z, PALETTE.mug);
            }
            if (y === height - 1 && dist <= radius - 1) {
              addVoxel(cx + x, y - 1, cz + z, PALETTE.coffee);
            }
            // Handle
            if (x > radius - 1 && x < radius + 3 && z > -1 && z < 1) {
              const handleYCenter = height / 2;
              const dy = y - handleYCenter;
              if (x > radius && Math.abs(dy) < 2.5 && (Math.abs(dy) > 1.5 || x > radius + 1.5)) {
                addVoxel(cx + x, y, cz + z, PALETTE.mug);
              }
            }
          }
        }
      }
    }

    // --- Builder Functions (additional objects) ---
    function buildPencilHolder(cx: number, cz: number) {
      const radius = 3;
      const height = 6;

      for(let y = 0; y < height; y++) {
        for(let x = -radius; x <= radius; x++) {
          for(let z = -radius; z <= radius; z++) {
            const dist = Math.sqrt(x*x + z*z);
            if (dist <= radius && dist > radius - 1) {
              addVoxel(cx + x, y, cz + z, PALETTE.pencilCup);
            }
            if (y === 0 && dist <= radius) {
              addVoxel(cx + x, y, cz + z, PALETTE.pencilCup);
            }
          }
        }
      }

      // Add pencils
      const pencils = [
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
          addVoxel(cx + p.x, y, cz + p.z, col);
        }
      });
    }

    function buildBooks(cx: number, cz: number, rotation: number) {
      const books = [
        { w: 6, d: 8, h: 3, col: PALETTE.bookCoverBlue, rot: 0 },
        { w: 6, d: 8, h: 2, col: PALETTE.bookCoverBeige, rot: 0.1 },
        { w: 6, d: 8, h: 4, col: PALETTE.bookPages, rot: -0.1 }
      ];

      let currentY = 0;
      books.forEach((book, index) => {
        for(let y = 0; y < book.h; y++) {
          for(let x = -book.w/2; x < book.w/2; x++) {
            for(let z = -book.d/2; z < book.d/2; z++) {
              const rx = x * Math.cos(book.rot) - z * Math.sin(book.rot);
              const rz = x * Math.sin(book.rot) + z * Math.cos(book.rot);
              
              let col = book.col;
              // Add some variation
              if (y === 0 && Math.random() > 0.8) col = col - 0x111111;
              
              addVoxel(cx + rx, currentY + y, cz + rz, col);
            }
          }
        }
        currentY += book.h;
      });
    }

    function buildPlant(cx: number, cz: number) {
      // Pot
      for(let y = 0; y < 7; y++) {
        for(let x = -3; x <= 3; x++) {
          for(let z = -3; z <= 3; z++) {
            const dist = Math.sqrt(x*x + z*z);
            if (dist <= 3 && y === 0) addVoxel(cx + x, y, cz + z, PALETTE.plantPot);
            if (dist <= 3 && dist > 2) addVoxel(cx + x, y, cz + z, PALETTE.plantPot);
            if (dist <= 2 && y > 0 && y < 6) addVoxel(cx + x, y, cz + z, PALETTE.plantSoil);
          }
        }
      }

      // Stems
      for(let y = 6; y < 18; y++) {
        if (y < 12) addVoxel(cx, y, cz, PALETTE.plantStem);
        if (y < 10) {
          addVoxel(cx + 1, y, cz + 1, PALETTE.plantStem);
          addVoxel(cx - 1, y, cz - 1, PALETTE.plantStem);
        }
      }

      // Leaves
      const leaves = [
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
              addVoxel(cx + leaf.x + lx, leaf.y + ly, cz + leaf.z + lz, col);
            }
          }
        }
      });
    }

    function buildNotePage(cx: number, cz: number, rotation: number) {
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
          
          addVoxel(cx + rx, y, cz + rz, col);
        }
      }
    }

    // --- Build Scene ---
    console.time("Building Voxels");
    buildTable();
    // Position objects around the table
    buildLaptop(0, 5, 0);          // Center
    buildMug(15, 5);              // Right side
    buildPencilHolder(-15, 10);    // Left side
    buildBooks(15, -12, -0.1);     // Front right
    buildPlant(-15, 15);           // Back left
    buildNotePage(-12, -10, 0.3);  // Front left
    console.timeEnd("Building Voxels");

    // --- Render InstancedMesh ---
    const count = voxels.length;
    const instancedMesh = new THREE.InstancedMesh(voxelGeometry, material, count);
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const v = voxels[i];
      dummy.position.set(v.x, v.y, v.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, v.color);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    scene.add(instancedMesh);

    // --- Animation Loop ---
    let animationFrameId: number;
    let isMounted = true;
    
    const animate = () => {
      if (!isMounted) return;
      
      animationFrameId = requestAnimationFrame(animate);
      
      // Only update controls if they need it
      if (controls.enabled) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    
    // Start the animation loop
    animate();
    
    // Force an initial render
    renderer.render(scene, camera);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Initial render
    handleResize();

    // Cleanup function
    return () => {
      isMounted = false;
      
      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      
      // Remove canvas event listeners
      const canvas = renderer.domElement;
      canvas.removeEventListener('mousedown', preventDefault);
      canvas.removeEventListener('touchstart', preventDefault);
      canvas.removeEventListener('touchmove', preventDefault);
      canvas.removeEventListener('contextmenu', preventContextMenu);
      
      // Clean up renderer
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      controls.dispose();
      renderer.dispose();
      
      // Clear any remaining WebGL contexts
      const gl = renderer.domElement.getContext('webgl');
      if (gl) {
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
    };
  }, []);

  // Responsive container with proper aspect ratio
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      touchAction: 'none',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
      outline: 'none',
      WebkitTapHighlightColor: 'transparent',
      zIndex: 0 // Ensure this is below other content
    }}>
      <div 
        ref={mountRef} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          touchAction: 'none',
          outline: 'none',
          WebkitTapHighlightColor: 'transparent',
          zIndex: 0,
          pointerEvents: 'auto' // Ensure the canvas can receive events
        }}
        tabIndex={0}
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(51, 51, 51, 0.9)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 20px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 500,
        pointerEvents: 'none',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        whiteSpace: 'nowrap',
        zIndex: 1 // Keep this above the canvas
      }}>
        🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
      </div>
    </div>
  );
};

export default VoxelWorkspace;
