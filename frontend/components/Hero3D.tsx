"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./Hero3D.module.css";

// Physics wrapper for 3D models
class PhysicsObject {
    mesh: THREE.Object3D;
    vx: number;
    vy: number;
    x: number;
    y: number;
    isDragging: boolean;
    boundaryX: number;
    boundaryY: number;

    constructor(mesh: THREE.Object3D, x: number, y: number, boundaryX = 4.5, boundaryY = 2.5) {
        this.mesh = mesh;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.03;
        this.vy = (Math.random() - 0.5) * 0.03;
        this.isDragging = false;
        this.boundaryX = boundaryX;
        this.boundaryY = boundaryY;
        mesh.position.set(x, y, 0);
    }

    update() {
        if (this.isDragging) return;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.995;
        this.vy *= 0.995;

        // Minimum speed (perpetual motion)
        const minSpeed = 0.015;
        const currentSpeed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        if (currentSpeed < minSpeed && currentSpeed > 0) {
            const scale = minSpeed / currentSpeed;
            this.vx *= scale;
            this.vy *= scale;
        }

        // Bounce off boundaries
        if (this.x > this.boundaryX || this.x < -this.boundaryX) {
            this.vx *= -0.8;
            this.x = Math.max(-this.boundaryX, Math.min(this.boundaryX, this.x));
        }
        if (this.y > this.boundaryY || this.y < -this.boundaryY) {
            this.vy *= -0.8;
            this.y = Math.max(-this.boundaryY, Math.min(this.boundaryY, this.y));
        }

        // Update mesh position
        this.mesh.position.set(this.x, this.y, 0);

        // Slow rotation for visual interest
        this.mesh.rotation.y += 0.002;
        this.mesh.rotation.x += 0.001;
    }
}

// Model configurations
const models = [
    { path: "/models/pest_damage.glb", scale: 0.8, x: -3, y: 1 },
    { path: "/models/river_statue.glb", scale: 0.5, x: 0, y: 0 },
    { path: "/models/scan_01.glb", scale: 0.6, x: 3, y: -1 },
];

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;

        // Scene setup
        const scene = new THREE.Scene();

        // Camera
        const width = container.clientWidth;
        const height = container.clientHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.z = 10;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x96A589, 0.5);
        pointLight.position.set(-5, 3, 3);
        scene.add(pointLight);

        // Physics objects array
        const physicsObjects: PhysicsObject[] = [];

        // Raycaster for interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        let activeObject: PhysicsObject | null = null;
        let offset = new THREE.Vector3();
        let lastMousePos = new THREE.Vector3();

        // Load models
        const loader = new GLTFLoader();
        models.forEach((config) => {
            loader.load(
                config.path,
                (gltf) => {
                    const model = gltf.scene;
                    model.scale.setScalar(config.scale);
                    scene.add(model);

                    const physicsObj = new PhysicsObject(
                        model,
                        config.x,
                        config.y,
                        (width / height) * 3,
                        3
                    );
                    physicsObjects.push(physicsObj);
                },
                undefined,
                (error) => {
                    console.warn(`Could not load model ${config.path}:`, error);
                }
            );
        });

        // Mouse handlers
        const getMousePos = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const onMouseDown = (e: MouseEvent) => {
            getMousePos(e);
            raycaster.setFromCamera(mouse, camera);

            const meshes = physicsObjects.map((p) => p.mesh);
            const intersects = raycaster.intersectObjects(meshes, true);

            if (intersects.length > 0) {
                const hitMesh = intersects[0].object;
                const physObj = physicsObjects.find((p) => {
                    let current: THREE.Object3D | null = hitMesh;
                    while (current) {
                        if (current === p.mesh) return true;
                        current = current.parent;
                    }
                    return false;
                });

                if (physObj) {
                    activeObject = physObj;
                    activeObject.isDragging = true;
                    canvas.style.cursor = "grabbing";

                    // Calculate offset
                    const intersectPoint = new THREE.Vector3();
                    raycaster.ray.intersectPlane(plane, intersectPoint);
                    offset.copy(intersectPoint).sub(activeObject.mesh.position);
                    lastMousePos.copy(intersectPoint);
                }
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!activeObject) return;

            getMousePos(e);
            raycaster.setFromCamera(mouse, camera);

            const intersectPoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, intersectPoint);

            // Calculate velocity from mouse movement
            activeObject.vx = (intersectPoint.x - lastMousePos.x) * 0.5;
            activeObject.vy = (intersectPoint.y - lastMousePos.y) * 0.5;

            // Update position
            activeObject.x = intersectPoint.x - offset.x;
            activeObject.y = intersectPoint.y - offset.y;
            activeObject.mesh.position.set(activeObject.x, activeObject.y, 0);

            lastMousePos.copy(intersectPoint);
        };

        const onMouseUp = () => {
            if (activeObject) {
                activeObject.isDragging = false;
                activeObject = null;
                canvas.style.cursor = "grab";
            }
        };

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave", onMouseUp);

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Update physics
            physicsObjects.forEach((obj) => obj.update());

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

            // Update boundaries
            physicsObjects.forEach((obj) => {
                obj.boundaryX = (newWidth / newHeight) * 3;
            });
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("mouseleave", onMouseUp);
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
