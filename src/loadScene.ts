import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";

export const loadScene = async (path: string) => {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(draco);

    const gltf = await loader.loadAsync(path)
    gltf.scene.castShadow = true;

    return {
        scene: gltf.scene
    }
}
