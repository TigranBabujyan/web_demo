"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./Hero3D.module.css";

// Animation configuration for each model
interface ModelConfig {
    path: string;
    scale: number;
    x: number;
    y: number;
    rotationSpeed: THREE.Vector3; // Rotation per frame
    floatSpeed: THREE.Vector3;    // Speed of bobbing
    floatAmp: THREE.Vector3;      // Amplitude of bobbing
    floatOffset: THREE.Vector3;   // Phase offset
}

// 6 models arranged around center (PARANOID'S logo area)
// Configured for zero-gravity floating effect matching Figma prototype
const models: ModelConfig[] = [
    // Top row
    {
        path: "/models/uiux.glb",
        scale: 0.8, x: -3.5, y: 1.8,
        rotationSpeed: new THREE.Vector3(0.001, 0.002, 0.001),
        floatSpeed: new THREE.Vector3(0.0005, 0.0008, 0.0004),
        floatAmp: new THREE.Vector3(0.1, 0.2, 0.1),
        floatOffset: new THREE.Vector3(0, 0, 0)
    },
    {
        path: "/models/3d_motion_design.glb",
        scale: 0.6, x: -0.5, y: 2.2,
        rotationSpeed: new THREE.Vector3(0.0005, 0.003, 0.0005),
        floatSpeed: new THREE.Vector3(0.0004, 0.001, 0.0006),
        floatAmp: new THREE.Vector3(0.05, 0.15, 0.05),
        floatOffset: new THREE.Vector3(1, 2, 0)
    },
    {
        path: "/models/product_design_2.glb",
        scale: 0.9, x: 3.5, y: 1.5,
        rotationSpeed: new THREE.Vector3(0.002, 0.001, 0.001),
        floatSpeed: new THREE.Vector3(0.0006, 0.0005, 0.0007),
        floatAmp: new THREE.Vector3(0.1, 0.1, 0.1),
        floatOffset: new THREE.Vector3(2, 4, 1)
    },

    // Bottom row
    {
        path: "/models/vr.glb",
        scale: 1.0, x: -3.2, y: -1.8,
        rotationSpeed: new THREE.Vector3(0.001, 0.001, 0.002),
        floatSpeed: new THREE.Vector3(0.0007, 0.0006, 0.0005),
        floatAmp: new THREE.Vector3(0.12, 0.12, 0.12),
        floatOffset: new THREE.Vector3(3, 1, 2)
    },
    {
        path: "/models/about_us.glb",
        scale: 0.7, x: 0.5, y: -1.5,
        rotationSpeed: new THREE.Vector3(0.001, 0.0005, 0.002), // Tumbling motion
        floatSpeed: new THREE.Vector3(0.0005, 0.0009, 0.0004),
        floatAmp: new THREE.Vector3(0.08, 0.15, 0.05),
        floatOffset: new THREE.Vector3(4, 3, 5)
    },
    {
        path: "/models/2d.glb",
        scale: 0.8, x: 3.8, y: -0.8,
        rotationSpeed: new THREE.Vector3(0.002, 0.002, 0.002),
        floatSpeed: new THREE.Vector3(0.0006, 0.0007, 0.0006),
        floatAmp: new THREE.Vector3(0.1, 0.1, 0.1),
        floatOffset: new THREE.Vector3(5, 5, 3)
    },
];

class AnimatedObject {
    mesh: THREE.Object3D;
    initialPos: THREE.Vector3;
    config: ModelConfig;

    constructor(mesh: THREE.Object3D, config: ModelConfig) {
        this.mesh = mesh;
        this.config = config;
        this.initialPos = new THREE.Vector3(config.x, config.y, 0);

        // Set initial state
        mesh.position.copy(this.initialPos);
        // Random initial rotation
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    }

    update(time: number) {
        // Continuous rotation
        this.mesh.rotation.x += this.config.rotationSpeed.x;
        this.mesh.rotation.y += this.config.rotationSpeed.y;
        this.mesh.rotation.z += this.config.rotationSpeed.z;

        // Floating motion using sine waves
        // x = initial + sin(time * speed + offset) * amp
        this.mesh.position.x = this.initialPos.x + Math.sin(time * this.config.floatSpeed.x + this.config.floatOffset.x) * this.config.floatAmp.x;
        this.mesh.position.y = this.initialPos.y + Math.sin(time * this.config.floatSpeed.y + this.config.floatOffset.y) * this.config.floatAmp.y;
        this.mesh.position.z = this.initialPos.z + Math.sin(time * this.config.floatSpeed.z + this.config.floatOffset.z) * this.config.floatAmp.z;
    }
}

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera — adjusted for 6-model composition
        const width = container.clientWidth;
        const height = container.clientHeight;
        const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
        camera.position.set(0, 0, 8);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Lighting — warm key/fill/rim setup for quality rendering
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Key light — warm directional from upper right
        const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.5); // Slightly increased intensity
        keyLight.position.set(5, 6, 5);
        scene.add(keyLight);

        // Fill light — cooler from the left
        const fillLight = new THREE.DirectionalLight(0xe0e8ff, 0.8);
        fillLight.position.set(-5, 2, 3);
        scene.add(fillLight);

        // Rim light — accent (olive tint matching brand color)
        const rimLight = new THREE.PointLight(0x96A589, 0.6);
        rimLight.position.set(0, -3, 4);
        scene.add(rimLight);

        // Additional point light for specular highlights on metallic objects (like GPU)
        const specularLight = new THREE.PointLight(0xffffff, 0.5);
        specularLight.position.set(3, 3, 5);
        scene.add(specularLight);

        // Animation objects array
        const animatedObjects: AnimatedObject[] = [];

        // Load models
        const loader = new GLTFLoader();
        models.forEach((config) => {
            loader.load(
                config.path,
                (gltf) => {
                    const model = gltf.scene;
                    model.scale.setScalar(config.scale);
                    scene.add(model);

                    const animObj = new AnimatedObject(model, config);
                    animatedObjects.push(animObj);
                },
                undefined,
                (error) => {
                    console.warn(`Could not load model ${config.path}:`, error);
                }
            );
        });

        // Animation loop
        let animationId: number;
        let startTime = Date.now();

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const now = Date.now();
            const time = now - startTime;

            // Update animation
            animatedObjects.forEach((obj) => obj.update(time));

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
