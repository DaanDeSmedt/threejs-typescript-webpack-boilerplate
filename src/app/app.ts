import { PerspectiveCamera, Scene, TextureLoader, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sphere } from "./shapes";

export class App {

    private renderer: WebGLRenderer;
    private scene: Scene;
    private camera: PerspectiveCamera;
    private controls: OrbitControls;

    private sphere: Sphere;

    constructor(canvasElem: HTMLCanvasElement, width: number, height: number) {

        this.scene = new Scene();
        this.scene.background = new TextureLoader().load("./assets/textures/background.png");

        this.camera = new PerspectiveCamera(50, width / height, 1, 1000);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.position.z = 5;

        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: canvasElem
        });

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        this.sphere = new Sphere();
        this.scene.add(this.sphere);
        
        this.resize(width, height);
        this.render();
    }

    private render() {
        this.sphere.rotate();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    };

    public resize(width: number, height: number) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}