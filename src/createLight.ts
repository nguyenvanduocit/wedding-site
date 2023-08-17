import * as THREE from 'three';
import {HemisphereLight} from "three";

export function createLights() {
    const hemisphereLight = new HemisphereLight(0xFFFFFF,0x000000, .9)
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9)
    shadowLight.position.set(150, 350, 350);

	shadowLight.castShadow = true;

	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

return [hemisphereLight, shadowLight]
}
