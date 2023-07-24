import * as THREE from 'three';
import chroma from 'chroma-js'

export function createLights(scene: THREE.Scene) {
    let scale = chroma.scale(['#e00606', "#00ffc1"])

    let light = new THREE.DirectionalLight(scale(0.8).hex())
    light.position.set(10, 0, 0)
    scene.add(light)
    //scene.add(new THREE.DirectionalLightHelper(light))

    light = new THREE.DirectionalLight(scale(0.8).hex())
    light.position.set(0, 10, 0)
    scene.add(light)
    //scene.add(new THREE.DirectionalLightHelper(light))

    light = new THREE.DirectionalLight(scale(0.9).hex())
    light.position.set(0, 0, 10)
    scene.add(light)
    //scene.add(new THREE.DirectionalLightHelper(light))

    let light4 = new THREE.PointLight(scale(0.8).hex())
    light.position.set(0, 25, 100)
    scene.add(light4)
    //scene.add(new THREE.PointLightHelper(light4))
}
