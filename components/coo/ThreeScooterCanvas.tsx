'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeScooterCanvasProps {
  status: string;
  battery: number;
  charging: boolean;
  heading?: number;
  size?: number;
  modelUrl?: string;
}

export function ThreeScooterCanvas({
  status,
  battery,
  charging,
  heading = 0,
  size = 48,
  modelUrl = '/models/luwai_HD_1782756995630.glb',
}: ThreeScooterCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera, Renderer Setup
    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 3.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 1.8, 5);
    pointLight.position.set(0, 1.5, 1);
    scene.add(pointLight);

    // 3. Status Color Determination
    let primaryColor = 0x059669; // Emerald green
    let glowColor = 0x10b981;
    if (status === 'CRITICAL' || battery < 20) {
      primaryColor = 0xdc2626; // Red
      glowColor = 0xef4444;
    } else if (charging || status === 'CHARGING') {
      primaryColor = 0x7c3aed; // Purple
      glowColor = 0x8b5cf6;
    }

    const scooterGroup = new THREE.Group();
    let isGlbLoaded = false;

    // Under-body Neon Glow Disk
    const glowGeo = new THREE.RingGeometry(0.2, 0.65, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.rotation.x = Math.PI / 2;
    glowMesh.position.set(0, 0.02, 0);
    scooterGroup.add(glowMesh);

    // 4. Try Loading 3D GLB Model (item3d-1782911545161.glb)
    if (modelUrl) {
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          isGlbLoaded = true;
          const model = gltf.scene;

          // Auto-scale and center loaded GLB model
          const box = new THREE.Box3().setFromObject(model);
          const modelSize = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
          if (maxDim > 0) {
            const scale = 1.6 / maxDim;
            model.scale.set(scale, scale, scale);
          }

          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center.clone().multiplyScalar(model.scale.x));
          model.position.y += 0.35;

          scooterGroup.add(model);
        },
        undefined,
        () => {
          // GLB file not found at URL -> render procedural 3D model
          buildProceduralScooter();
        }
      );
    } else {
      buildProceduralScooter();
    }

    function buildProceduralScooter() {
      if (isGlbLoaded) return;
      // Body Frame (Chassis)
      const bodyGeo = new THREE.BoxGeometry(0.5, 0.35, 1.2);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        metalness: 0.6,
        roughness: 0.25,
      });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.set(0, 0.45, 0);
      scooterGroup.add(bodyMesh);

      // Seat Cushion
      const seatGeo = new THREE.BoxGeometry(0.42, 0.12, 0.55);
      const seatMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
      const seatMesh = new THREE.Mesh(seatGeo, seatMat);
      seatMesh.position.set(0, 0.68, -0.15);
      scooterGroup.add(seatMesh);

      // Front Steering Column & Handlebars
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12);
      const barMat = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.8 });
      const barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.position.set(0, 0.8, 0.45);
      barMesh.rotation.x = -0.15;
      scooterGroup.add(barMesh);

      // Handlebar T-Pipe
      const handleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 12);
      const handleMesh = new THREE.Mesh(handleGeo, barMat);
      handleMesh.rotation.z = Math.PI / 2;
      handleMesh.position.set(0, 1.18, 0.38);
      scooterGroup.add(handleMesh);

      // LED Headlight
      const lightGeo = new THREE.BoxGeometry(0.18, 0.1, 0.1);
      const lightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const lightMesh = new THREE.Mesh(lightGeo, lightMat);
      lightMesh.position.set(0, 1.15, 0.44);
      scooterGroup.add(lightMesh);

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.12, 24);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.9 });

      const frontWheel = new THREE.Mesh(wheelGeo, wheelMat);
      frontWheel.rotation.z = Math.PI / 2;
      frontWheel.position.set(0, 0.22, 0.52);
      const frontRim = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.13, 16), rimMat);
      frontRim.rotation.z = Math.PI / 2;
      frontRim.position.copy(frontWheel.position);
      scooterGroup.add(frontWheel);
      scooterGroup.add(frontRim);

      const rearWheel = new THREE.Mesh(wheelGeo, wheelMat);
      rearWheel.rotation.z = Math.PI / 2;
      rearWheel.position.set(0, 0.22, -0.48);
      const rearRim = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.13, 16), rimMat);
      rearRim.rotation.z = Math.PI / 2;
      rearRim.position.copy(rearWheel.position);
      scooterGroup.add(rearWheel);
      scooterGroup.add(rearRim);
    }

    scene.add(scooterGroup);

    // Initial Y Heading Alignment
    scooterGroup.rotation.y = (heading * Math.PI) / 180;

    // 5. Render & Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      scooterGroup.rotation.y += 0.015;
      scooterGroup.position.y = Math.sin(elapsedTime * 3) * 0.04;

      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      glowGeo.dispose();
      glowMat.dispose();
    };
  }, [status, battery, charging, heading, size, modelUrl]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className="flex items-center justify-center pointer-events-none drop-shadow-md"
    />
  );
}
