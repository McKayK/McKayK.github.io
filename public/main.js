import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//torus/background

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const ring = new THREE.TextureLoader().load("koaopal.png");
// const material = new THREE.MeshStandardMaterial({
//   map: ring,
// });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

//avatar

const meTexture = new THREE.TextureLoader().load("mckay.jpeg");

const mckay = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: meTexture })
);

scene.add(mckay);

//moon

// const moonTexture = new THREE.TextureLoader().load("moon.jpg");
// const normalTexture = new THREE.TextureLoader().load("normal.jpg");

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

//custom 3d

let loader = new GLTFLoader();
let mRing;
let castle;

loader.load("./koaopal.gltf", function (gltf) {
  mRing = gltf.scene;
  scene.add(gltf.scene);
  animate();
});

loader.load("./hommCastle.gltf", function (gltf) {
  castle = gltf.scene;
  scene.add(gltf.scene);
  animate();
});

const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  // if (castle) castle.rotation.x += 0.05;
  // if (castle) castle.rotation.y += 0.075;
  // if (castle) castle.rotation.z += 0.05;

  mckay.rotation.y += 0.01;
  mckay.rotation.z += 0.01;

  if (castle) castle.position.z = 10;
  if (castle) castle.position.setX(-40);
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
};

document.body.onscroll = moveCamera;

const animate = () => {
  requestAnimationFrame(animate);

  if (mRing) mRing.rotation.x += 0.0008;
  if (mRing) mRing.rotation.y += 0.0008;
  if (mRing) mRing.rotation.z += 0.0008;

  // if (castle) castle.rotation.x += 0.0008;
  if (castle) castle.rotation.y += 0.0008;
  // if (castle) castle.rotation.z += 0.0008;

  controls.update();

  renderer.render(scene, camera);
};

animate();
