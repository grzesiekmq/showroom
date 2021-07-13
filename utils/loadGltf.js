import { GLTFLoader } from "https://cdn.skypack.dev/three@v0.130.1-bsY6rEPcA1ZYyZeKdbHd/examples/jsm/loaders/GLTFLoader.js";

import { app, scene } from "../app.js";
export function loadGltf(name) {
  const loader = new GLTFLoader();

  function onLoad(gltf) {
    app.model = gltf.scene;
    app.model.name = name;

    scene.add(app.model);
  }

  function onError(error) {
    console.error(error);
  }
  loader.load(`models/${name}.gltf`, onLoad, undefined, onError);
  return app.model;
}
