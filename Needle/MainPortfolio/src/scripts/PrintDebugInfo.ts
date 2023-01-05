import { Behaviour, serializable, Light} from "@needle-tools/engine";
import { Object3D } from "three";
import * as THREE from 'three';

export class PrintDebugInfo extends Behaviour {
	start(): void {
		console.log(this.gameObject);
		
	}
}