import {OrthographicCamera, PerspectiveCamera, Scene} from "three";

export const createCamera = (scene: Scene, width: number, height: number) => {
    const aspect = width / height;
    const d = 6;
    const camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 100);
    new PerspectiveCamera()
    camera.position.setZ(5);
    camera.position.setY(3);
    camera.position.setX(5);
    camera.lookAt(scene.position);

    const updateCamera = (width: number, height: number) => {
        const aspect = width/height;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.updateProjectionMatrix();
    }

    return {
        camera,
        updateCamera
    }
}
