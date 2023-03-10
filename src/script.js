import '../style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from 'gsap';

// Debug

// Constants
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Texture Loader
const loader = new THREE.TextureLoader();
const texture = loader.load('/vanIsle.png');
const alpha = loader.load('/alpha.png');

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const plane = new THREE.PlaneGeometry(10, 10, 512, 512);


// Materials
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: texture,
  displacementScale: 0.2,
  alphaMap: texture,
  transparent: true,
});

// Mesh
const planeMesh = new THREE.Mesh(plane, material);
planeMesh.rotation.set(-0.4, 0.1, 0.1)
scene.add(planeMesh);

// Lights
const light = { color: 0x2a6db9, intensity: 2 }
const ambientLightParams = {color: 0xffffff, intensity: 0.8}
const pointLight = new THREE.PointLight(light.color, light.intensity);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 15;
const ambientLight = new THREE.AmbientLight(ambientLightParams.color, ambientLightParams.intensity);

scene.add(pointLight, ambientLight);

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// gsap Animation sequence
const timeline = gsap.timeline({repeat: -1})
timeline.to(camera.position, {x: -5, y: 3.3, z: 1.5, duration: 15})
timeline.to(camera.position, {x: 3.75, y: -2.75, z: 2.5, duration: 40})
timeline.to(camera.position, {x: 0, y: 1, z: 5, duration: 15})
// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()