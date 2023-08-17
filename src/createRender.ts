import {BasicShadowMap, SRGBColorSpace, WebGLRenderer} from "three";

export const createRender = () => {
    const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
    })

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = BasicShadowMap;
    renderer.outputColorSpace = SRGBColorSpace;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);

    const updateRenderer = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    return {
        renderer,
        updateRenderer
    }
}
