import { Behaviour, OrbitControls, serializable, GameObject } from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";
import gsap from "gsap";

export class AdvancedCamera extends Behaviour {

	@serializable(Object3D)
	public lookAtObject !: Object3D;

	@serializable(Vector3)
	public directionMastLookAt : Vector3 = new Vector3(0, 0, 0);
	@serializable(Vector3)
	public directionMastCamPos : Vector3 = new Vector3(0, 0, 0);

	@serializable(Vector3)
	public blueprintViewLookAt : Vector3 = new Vector3(0, 0, 0);
	@serializable(Vector3)
	public blueprintViewCamPos : Vector3 = new Vector3(0, 0, 0);

	@serializable(Vector3)
	public aboutProjectViewLookAt : Vector3 = new Vector3(0, 0, 0);
	@serializable(Vector3)
	public aboutProjectViewCamPos : Vector3 = new Vector3(0, 0, 0);
	@serializable(GameObject)
	public aboutProjectGoBackBtn !: GameObject;

	@serializable(Vector3)
	public interestsViewLookAt : Vector3 = new Vector3(0, 0, 0);
	@serializable(Vector3)
	public interestsViewCamPos : Vector3 = new Vector3(0, 0, 0);
	@serializable(GameObject)
	public interestsGoBackBtn !: GameObject;

	@serializable(Vector3)
	public contactViewLookAt : Vector3 = new Vector3(0, 0, 0);
	@serializable(Vector3)
	public contactViewCamPos : Vector3 = new Vector3(0, 0, 0);
	@serializable(GameObject)
	public contactViewGoBackBtn !: GameObject;

	private _controls !: OrbitControls;
	private _cameraObject !: Object3D;

	private _transitions : any;

	onEnable(): void {
		this._controls = this.gameObject.getComponent(OrbitControls)!;
		this._cameraObject = this.gameObject;
		this.SetTransitions();
	}

	start(): void {
		this.SetDirectionMastView();
	}

	update(): void {
		
	}

	// Custom Private Functions
	private SetTransitions() {
		if(this._controls.controls == null)
			return;
		const threeOrbit = this._controls.controls;
		this._transitions = {};

		// Direction Mast View
		this._transitions.directionMastView = () => {
			threeOrbit.enableZoom = false;
			threeOrbit.enableRotate = false;

			this.aboutProjectGoBackBtn.activeSelf = false;
			this.interestsGoBackBtn.activeSelf = false;
			this.contactViewGoBackBtn.activeSelf = false;

			this.TranstionTemplate(1.5, this.directionMastLookAt, this.directionMastCamPos);

			threeOrbit.enableZoom = true;
		};

		// Blueprint View
		this._transitions.blueprintView = () => {
			threeOrbit.enableZoom = false;
			threeOrbit.enableRotate = false;

			this.aboutProjectGoBackBtn.activeSelf = false;
			this.interestsGoBackBtn.activeSelf = false;
			this.contactViewGoBackBtn.activeSelf = false;

			this.TranstionTemplate(1.5, this.blueprintViewLookAt, this.blueprintViewCamPos);

			threeOrbit.enableZoom = true;
			threeOrbit.enableRotate = true;
			threeOrbit.autoRotate = true;
		};

		// About & Projects View
		this._transitions.aboutprojectsView = () => {
			threeOrbit.enableZoom = false;
			threeOrbit.enableRotate = false;

			this.TranstionTemplate(1.5, this.aboutProjectViewLookAt, this.aboutProjectViewCamPos);

			this.aboutProjectGoBackBtn.activeSelf = true;
			this.interestsGoBackBtn.activeSelf = false;
			this.contactViewGoBackBtn.activeSelf = false;

			threeOrbit.enableZoom = true;

		};

		// Interests View
		this._transitions.interestsView = () => {
			threeOrbit.enableZoom = false;
			threeOrbit.enableRotate = false;

			this.TranstionTemplate(1.5, this.interestsViewLookAt, this.interestsViewCamPos);

			this.aboutProjectGoBackBtn.activeSelf = false;
			this.interestsGoBackBtn.activeSelf = true;
			this.contactViewGoBackBtn.activeSelf = false;

			threeOrbit.enableZoom = true;
		}

		// Contact View
		this._transitions.contactsView = () => {
			threeOrbit.enableZoom = false;
			threeOrbit.enableRotate = false;

			this.TranstionTemplate(1.5, this.contactViewLookAt, this.contactViewCamPos);

			this.aboutProjectGoBackBtn.activeSelf = false;
			this.interestsGoBackBtn.activeSelf = false;
			this.contactViewGoBackBtn.activeSelf = true;

			threeOrbit.enableZoom = true;
		}
	}

	private TranstionTemplate(duration : number, lookAtVector : Vector3, cameraPositionVector : Vector3) {
		gsap.to(this.lookAtObject.position, {
			x : lookAtVector.x,
			y : lookAtVector.y,
			z : lookAtVector.z,
			duration : duration
		});

		gsap.to(this._cameraObject.position, {
			x : cameraPositionVector.x,
			y : cameraPositionVector.y,
			z : cameraPositionVector.z,
			duration : duration
		});
	}

	// Custom Public Functions
	public SetDirectionMastView() {
		this._transitions.directionMastView();
	}
	public SetBlueprintView() {
		this._transitions.blueprintView();
	}
	public SetAboutProjectsView() {
		this._transitions.aboutprojectsView();
	}
	public SetInterestsView() {
		this._transitions.interestsView();
	}
	public SetContactView() {
		this._transitions.contactsView();
	}
}