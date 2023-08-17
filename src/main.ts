import './styles/reset.css'
import './styles/canvas.sass'
import {
    Scene,
    WebGLRenderer,
    Color, SRGBColorSpace, BasicShadowMap, NoToneMapping, Object3D,
} from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import {createLights} from "./createLight.ts";

const scene = new Scene()

// Set the background to the gradient.
scene.background = new Color(0x56af70)
scene.backgroundBlurriness = 1;
scene.backgroundIntensity = 1;

// load object
const loader = new GLTFLoader();
const draco = new DRACOLoader();
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(draco);

const gltf = await loader.loadAsync('/scene.glb')

const mainScene = gltf.scene.children[0].children.find((child) => child.name === 'Content') as Object3D
if (mainScene === undefined) {
    throw new Error('Failed to load scene')
}


const baseObj = mainScene.children.find((child) => child.name === 'GroundCubeQuad') as Object3D
if (baseObj !== undefined) {
    baseObj.castShadow = true;
    baseObj.receiveShadow = true;
    scene.add(baseObj);
}

// Create a cube.
const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), cubeMaterial);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

createLights(scene)

// setup helper


// setup camera
const aspect = window.innerWidth / window.innerHeight;
const d = 10;
const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.setZ(4);
camera.position.setY(3);
camera.position.setX(4);
camera.lookAt(scene.position);

// setup render
const canvasEl = document.querySelector<HTMLDivElement>('#canvas')
const renderer = new WebGLRenderer({
    canvas: canvasEl!,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
})

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = BasicShadowMap;
renderer.toneMapping = NoToneMapping;
renderer.outputColorSpace = SRGBColorSpace;
renderer.gammaOutput = true;
renderer.gammaFactor = 1.8;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// setup event
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const animationLoop = () => {
    TWEEN.update();

    if (baseObj !== undefined) {
        baseObj.rotation.y += 0.002;
        cube.rotation.y -= 0.002;
    }

    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animationLoop);

new TWEEN.Tween(cube.position)
    .to(
        {
            y: 4
        },
        1000
    )
    .repeat(Infinity)
    .yoyo(true)
    .start()
