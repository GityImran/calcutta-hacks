'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSSProperties } from 'react';

// Extend the Mesh type to include our custom properties
interface AnimatedMesh extends THREE.Mesh {
  speed?: number;
  angle?: number;
}

export function VoxelBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xefdfbb);
    scene.fog = new THREE.Fog(0xefdfbb, 50, 200);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(50, 60, 50);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    mountRef.current.appendChild(renderer.domElement);

    // Controls - disable user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.target.set(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(40, 60, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // Create a more visible and interesting scene
    const group = new THREE.Group();
    
    // Add multiple colorful cubes in a circle
    const size = 5;
    const count = 8;
    const radius = 30;
    
    for (let i = 0; i < count; i++) {
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(i / count, 0.7, 0.5),
        roughness: 0.2,
        metalness: 0.7
      });
      
      const cube = new THREE.Mesh(geometry, material) as AnimatedMesh;
      const angle = (i / count) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.z = Math.sin(angle) * radius;
      cube.position.y = 0;
      
      // Add animation properties
      cube.speed = 0.5 + Math.random() * 2;
      cube.angle = angle;
      
      cube.castShadow = true;
      cube.receiveShadow = true;
      group.add(cube);
    }
    
    scene.add(group);
    
    // Add a ground plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.2
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    plane.receiveShadow = true;
    scene.add(plane);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // Animate the group
      group.rotation.y += 0.002;
      
      // Animate individual cubes
      group.children.forEach((obj, i) => {
        const cube = obj as AnimatedMesh;
        if (cube.isMesh) {
          cube.rotation.x += 0.01 * (i + 1) * 0.2;
          cube.rotation.y += 0.01 * (i + 1) * 0.2;
          
          // Bounce animation
          if (cube.speed !== undefined) {
            cube.position.y = Math.sin(Date.now() * 0.001 * cube.speed) * 5;
          }
        }
      });
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const style: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -10,
    opacity: 0.7,
    pointerEvents: 'none'
  };

  return <div ref={mountRef} style={style} />;
}
