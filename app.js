import { OrbitControls } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/controls/OrbitControls.js";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
} from "https://cdn.skypack.dev/pin/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/mode=imports/optimized/three.js";

import { loadGltf } from "./utils/loadGltf.js";
import { cars } from "./data/cars.js";
import { selectionButtons } from "./components/selection-buttons.js";

let model,
  scene,
  camera,
  renderer = null;

class App {
  constructor() {
    this.createScene();

    selectionButtons();
  }

  createScene() {
    scene = new Scene();

    this.createCamera();

    this.createLight();

    renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.update();

    this.render();

    this.model = model;
  }

  createCamera() {
    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 10000;
    camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-50, 100, 500);

    camera.name = "camera";
  }

  createLight() {
    const intensity = 3;
    const light = new DirectionalLight(0xffffff, intensity);
    scene.add(light);
  }

  render() {
    requestAnimationFrame(() => {
      this.render();

      if (this.model) {
        this.model.rotation.y += 0.01;
      }
    });
    renderer.render(scene, camera);
  }
}

export let app = new App();

function loadInitial() {
  const initialCar = cars[0];
  const title = document.querySelector(".title");
  title.textContent = initialCar;
  app.model = loadGltf(initialCar);
}

loadInitial();

export { scene };
