import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CADViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        
        // 1. Scene Setup
        this.scene = new THREE.Scene();
        
        // 2. Camera Setup (Perspective for general viewing)
        this.camera = new THREE.PerspectiveCamera(
            50, 
            this.container.clientWidth / this.container.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(10, 10, 10);

        // 3. Renderer Setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // 4. Controls (Pan, Zoom, Rotate)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // 5. Lighting (CAD needs clear, multi-directional light to see edges)
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
        this.scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(10, 20, 10);
        this.scene.add(dirLight);

        // 6. The "Environment" (Grid and Origin Axes)
        const gridHelper = new THREE.GridHelper(50, 50, 0x444444, 0x222222);
        this.scene.add(gridHelper);
        
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        // Placeholder Geometry (A basic cube to prove it works before OpenCascade is loaded)
        this.addTestCube();

        // 7. Handle Window Resizing
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Start animation loop
        this.animate();
    }

    addTestCube() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x007acc,
            roughness: 0.4,
            metalness: 0.1
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 1; // Sit on the grid
        this.scene.add(cube);
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update(); // Required if controls.enableDamping or controls.autoRotate are set
        this.renderer.render(this.scene, this.camera);
    }
}
