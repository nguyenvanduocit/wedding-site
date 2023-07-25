import {Color, Fog, Scene} from "three";

export const createScene = () => {
    const scene = new Scene()
    scene.background = new Color(0x000000)
    scene.fog = new Fog(0xf7d9aa, 100, 950)
    return {
        scene
    }
}
