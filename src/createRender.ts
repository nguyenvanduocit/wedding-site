import {SRGBColorSpace, WebGLRenderer} from "three";

export const createRender = () => {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
    })
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = SRGBColorSpace;

    renderer.setPixelRatio(window.devicePixelRatio);
    return {
        renderer
    }
}
