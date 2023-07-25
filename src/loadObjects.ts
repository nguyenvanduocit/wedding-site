import {Object3D} from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";

export const loadObjects = async () => {
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
    baseObj.castShadow = true;
    baseObj.receiveShadow = true;

    // test object
    const testScene = await loader.loadAsync('/test.glb')
    console.log(testScene)
    const testObj = testScene.scene

    return {
        baseObj,
        testObj
    }
}
