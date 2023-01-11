import { Behaviour, serializable } from "@needle-tools/engine";
import { OrbitControls } from "@needle-tools/engine";
import { getWorldPosition } from "@needle-tools/engine/engine/engine_three_utils";
import gsap from "gsap";
import { Object3D, Vector3 } from "three";

export class AdvancedCamera extends Behaviour {

	// TODO Clear this Script and Redo the Transitions using GSAP

	@serializable(Object3D)
	lookAtObject !: Object3D;

	@serializable(Object3D)
	cameraObject !: Object3D;

	@serializable(OrbitControls)
	controls !: OrbitControls;

	@serializable(Vector3)
	directionMastLookAt : Vector3 = new Vector3(5.5, 2.5, 5.85);
	@serializable(Vector3)
	directionMastCameraPositon : Vector3 = new Vector3(7.75, 3.15, 8.85);

	@serializable(Vector3)
	blueprintViewLookAt : Vector3 = new Vector3(0, 3, 0);
	@serializable(Vector3)
	blueprintsViewCameraPosition : Vector3 = new Vector3(10, 10, 10);

	@serializable(Vector3)
	aboutMeViewLookAt : Vector3 = new Vector3(2.25, 4.10, 1.97);
	@serializable(Vector3)
	aboutMeViewCameraPosition : Vector3 = new Vector3(2, 4,-1);

	@serializable(Vector3)
	projectViewLookAt : Vector3 = new Vector3(2.25, 4.10, 1.97);
	@serializable(Vector3)
	projectViewCameraPosition : Vector3 = new Vector3(2, 4,-1);

	private transitions : any;

	onEnable(): void {
		this.SetTransitions();
	}

	start(): void {
		this.transitions.initialView();
	}

	update(): void {
	}

	private SetTransitions() {
		this.transitions = {};

		// Initial View
		this.transitions.initialView = () => {
			this.controls.controls!.enableZoom = false;
			this.controls.controls!.enableRotate = false;

			gsap.to(this.lookAtObject.position, {
				x : this.directionMastLookAt.x,
				y : this.directionMastLookAt.y,
				z : this.directionMastLookAt.z,
				duration : 1.5
			});
			gsap.to(this.cameraObject.position, {
				x : this.directionMastCameraPositon.x,
				y : this.directionMastCameraPositon.y,
				z : this.directionMastCameraPositon.z,
				duration : 1.5
			});

			// this.controls.controls!.enableZoom = true;
			// this.controls.controls!.enableRotate = true;
			// this.controls.controls!.autoRotate = true;
		};

		// The Blueprint View
		this.transitions.theblueprint = () => {
			this.controls.controls!.enableZoom = false;
			this.controls.controls!.enableRotate = false;

			gsap.to(this.lookAtObject.position, {
				x : this.blueprintViewLookAt.x,
				y : this.blueprintViewLookAt.y,
				z : this.blueprintViewLookAt.z,
				duration : 1.5
			});
			gsap.to(this.cameraObject.position, {
				x : this.blueprintsViewCameraPosition.x,
				y : this.blueprintsViewCameraPosition.y,
				z : this.blueprintsViewCameraPosition.z,
				duration : 1.5
			});

			this.controls.controls!.enableZoom = true;
			this.controls.controls!.enableRotate = true;
			this.controls.controls!.autoRotate = true;
		};

		// The About Me View
		this.transitions.aboutMeView = () => {
			this.controls.controls!.enableZoom = false;
			this.controls.controls!.enableRotate = false;

			gsap.to(this.lookAtObject.position, {
				x : this.aboutMeViewLookAt.x,
				y : this.aboutMeViewLookAt.y,
				z : this.aboutMeViewLookAt.z,
				duration : 1.5
			});
			gsap.to(this.cameraObject.position, {
				x : this.aboutMeViewCameraPosition.x,
				y : this.aboutMeViewCameraPosition.y,
				z : this.aboutMeViewCameraPosition.z,
				duration : 1.5
			});

			this.controls.controls!.enableZoom = true;
			this.controls.controls!.enableRotate = false;
		};

		// The Project View
		this.transitions.projectView = () => {
			this.controls.controls!.enableZoom = false;
			this.controls.controls!.enableRotate = false;

			gsap.to(this.lookAtObject.position, {
				x : this.projectViewLookAt.x,
				y : this.projectViewLookAt.y,
				z : this.projectViewLookAt.z,
				duration : 1.5
			});
			gsap.to(this.cameraObject.position, {
				x : this.projectViewCameraPosition.x,
				y : this.projectViewCameraPosition.y,
				z : this.projectViewCameraPosition.z,
				duration : 1.5
			});

			this.controls.controls!.enableZoom = true;
			this.controls.controls!.enableRotate = false;
		};
	}

	public SetTransitionToBlueprintView() {
		this.transitions.theblueprint();
	}
	public SetTransitionToAboutMeView() {
		this.transitions.aboutMeView();
	}
	public SetTransitionToProjectView() {
		this.transitions.projectView();
	}

}