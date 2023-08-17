import {DirectionalLight} from "three";

export function createLights() {
    const mainLight = new DirectionalLight(0xffffff,.8)
    mainLight.position.set(10, 7, 10);
    mainLight.castShadow = true

    const leftLight = new DirectionalLight(0xffffff,1)
    leftLight.position.set(0, 7, 10);
    leftLight.castShadow = true


	return [
        mainLight,
        leftLight,
        //new THREE.DirectionalLightHelper( mainLight, 5 ),
        //new THREE.DirectionalLightHelper( leftLight, 5 )
    ]
}
