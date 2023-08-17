import {OrthographicCamera, Scene} from "three";

export const createCamera = (scene: Scene) => {
    const aspect = window.innerWidth / window.innerHeight;
    const d = 10;
    const camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.setZ(4);
    camera.position.setY(3);
    camera.position.setX(4);
    camera.lookAt(scene.position);

    const updateCamera = () => {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.updateProjectionMatrix();
    }

    return {
        camera,
        updateCamera
    }
}
