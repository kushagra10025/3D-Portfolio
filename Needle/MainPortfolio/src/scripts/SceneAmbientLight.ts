import { Behaviour, serializable } from "@needle-tools/engine";
// import { Color } from "three";
import * as THREE from "three"

export class SceneAmbientLight extends Behaviour {

	@serializable(THREE.Color)
	lightColor: THREE.Color = new THREE.Color(255, 0, 0);
	@serializable()
	lightIntensity : number = 1;

	private ambientLight !: THREE.AmbientLight;

	start(): void {
		this.ambientLight = new THREE.AmbientLight(this.lightColor , this.lightIntensity);
		this.context.scene.add(this.ambientLight);
	}

}