import {Scene} from "three";

export const createScene = () => {
    const scene = new Scene()
    //scene.add(new AxesHelper(10))
    return {
        scene
    }
}
