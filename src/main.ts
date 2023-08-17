import './styles/reset.css'
import './styles/canvas.sass'
// @ts-ignore-next-line
import TWEEN from '@tweenjs/tween.js'
import {createLights} from "./createLight.ts"
import {createCamera} from "./createCamera.ts";
import {createRender} from "./createRender.ts";
import {createScene} from "./createScene.ts";
import {loadScene} from "./loadScene.ts";
import {Vector3} from "three";

export const setup = async () => {
    const canvas = document.getElementById('canvas')
    if (!canvas) throw new Error('canvas not found')

    const {scene} = createScene()

    // load base
    const {scene: baseObj} = await loadScene("/base.glb")
    scene.add(baseObj);

    loadScene("./scene-1.glb").then(({scene}) => {
        scene.visible = true
        const scale = 0.6
        scene.scale.set(scale, scale, scale)
        baseObj.add(scene)
    })

    const rotateBaseTween = new TWEEN.Tween({rotationY: 0})
    .to({rotationY: Math.PI * 2}, 20000)
    .repeat(Infinity)
    .onUpdate((obj: { rotationY: number; }) => {
        baseObj.rotation.y = obj.rotationY
    })
    rotateBaseTween.start()


    const {camera, updateCamera} = createCamera(scene, canvas.clientWidth, canvas.clientHeight)
    const {renderer} = createRender()
    const lights = createLights()
    for (let i = 0; i < lights.length; i++) {
        scene.add(lights[i])
    }

    const moveCamera1Tween = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
    .to({x: 0, y: 0, z: 0}, 2000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((obj: Vector3) => {
        camera.lookAt(scene.position)
        camera.position.setY(obj.y)
    })

    moveCamera1Tween.start()

    const animationLoop = () => {
        TWEEN.update();
        renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animationLoop);

     const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const {width, height} = entry.contentRect
            renderer.setSize(width, height)
            updateCamera(width, height)
        }
    })

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    observer.observe(canvas)
    canvas.appendChild(renderer.domElement)
}


setup().then(()=>{
    console.log('setup done')
})
