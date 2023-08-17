import './styles/reset.css'
import './styles/canvas.sass'
// @ts-ignore-next-line
import TWEEN from '@tweenjs/tween.js'
import {createLights} from "./createLight.ts"
import {createCamera} from "./createCamera.ts";
import {createRender} from "./createRender.ts";
import {createScene} from "./createScene.ts";
import {loadObjects} from "./loadObjects.ts";

export const setup = async () => {

    const {scene} = createScene()

// load object
    const {baseObj, testObj} = await loadObjects()

    if (baseObj !== undefined) {
        scene.add(baseObj);
    }

    if (testObj !== undefined) {
        testObj.position.y = 1;
        scene.add(testObj)
    }

//createLights(scene)

    const {camera, updateCamera} = createCamera(scene)
    const {renderer, updateRenderer} = createRender()
    const lights = createLights()
    for (let i = 0; i < lights.length; i++) {
        scene.add(lights[i])
    }

// setup event
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
        updateCamera()
        updateRenderer()
    }


// finally, render
    const animationLoop = () => {
        TWEEN.update();
        renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animationLoop);

    document.getElementById('canvas')?.appendChild(renderer.domElement)
}


setup()
