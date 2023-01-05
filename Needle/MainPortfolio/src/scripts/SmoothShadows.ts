import { Behaviour, serializable, Light} from "@needle-tools/engine";
import { Object3D } from "three";
import * as THREE from 'three';

export class SmoothShadows extends Behaviour {
	@serializable()
	radius ?: number = 5;
	@serializable()
	blurSamples ?: number = 25;

	start() {
		//Light changes
		this.context.renderer.shadowMap.enabled = true
		this.context.renderer.shadowMap.type = THREE.VSMShadowMap

		console.log(this.gameObject)

		//@ts-ignore
		this.gameObject.shadow.radius = this.radius
		//@ts-ignore
		this.gameObject.shadow.blurSamples = this.blurSamples
	}
}