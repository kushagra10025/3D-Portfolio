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
	private _camAngles : any;

	onEnable(): void {
		this._controls = this.gameObject.getComponent(OrbitControls)!;
		this._cameraObject = this.gameObject;
		this.SetCamAngles();
		this.SetTransitions();
	}

	start(): void {
		this.SetDirectionMastView();
	}

	update(): void {
		
	}

	// Custom Private Functions
	private SetCamAngles() {
		if(this._controls.controls == null)
			return;
		const threeOrbit = this._controls.controls;
		this._camAngles = {};

		const convFact = (Math.PI/180);
		const _defaultMinDistance = threeOrbit.minDistance;
		const _defaultMaxDistance = threeOrbit.maxDistance;
		const _defaultMinAzimuth = threeOrbit.minAzimuthAngle;
		const _defaultMaxAzimuth = threeOrbit.maxAzimuthAngle;
		const _defaultMinPolar = threeOrbit.minPolarAngle;
		const _defaultMaxPolar = threeOrbit.maxPolarAngle;

		// Default Angle
		this._camAngles.resetAngle = () => {
			threeOrbit.minDistance = _defaultMinDistance;
			threeOrbit.maxDistance = _defaultMaxDistance;
			threeOrbit.minAzimuthAngle = _defaultMinAzimuth;
			threeOrbit.maxAzimuthAngle = _defaultMaxAzimuth;
			threeOrbit.minPolarAngle = _defaultMinPolar;
			threeOrbit.maxPolarAngle = _defaultMaxPolar;
		};

		// Direction Mast Cam Angle
		this._camAngles.directionMastAngle = () => {
			threeOrbit.minDistance = 3;
			threeOrbit.maxDistance = 5;
			threeOrbit.minAzimuthAngle = -45 * convFact;
			threeOrbit.maxAzimuthAngle = -15 * convFact;
			threeOrbit.minPolarAngle = 60 * convFact;
			threeOrbit.maxPolarAngle = 120 * convFact;
		};

		// Blueprint Cam Angle
		this._camAngles.blueprintAngle = () => {
			threeOrbit.minDistance = 4;
			threeOrbit.maxDistance = 17;
			threeOrbit.minPolarAngle = 20 * convFact;
			threeOrbit.maxPolarAngle = 90 * convFact;
		};

		// About & Projects Cam Angle
		this._camAngles.aboutprojectsAngle = () => {
			threeOrbit.minDistance = 0.75;
			threeOrbit.maxDistance = 1.35;
		};

		// Interests Angle
		this._camAngles.interestsAngle = () => {
			threeOrbit.minDistance = 3.30;
			threeOrbit.maxDistance = 3.75;
		};

		// Contact Angle
		this._camAngles.contactAngle = () => {
			threeOrbit.minDistance = 0.85;
			threeOrbit.maxDistance = 1.15;
		};
	}

	private SetTransitions() {
		if(this._controls.controls == null)
			return;
		const threeOrbit = this._controls.controls;
		this._transitions = {};

		// Direction Mast View
		this._transitions.directionMastView = () => {
			var lookOnStart = () => {
				threeOrbit.enableZoom = false;
				threeOrbit.enableRotate = false;

				this.aboutProjectGoBackBtn.activeSelf = false;
				this.interestsGoBackBtn.activeSelf = false;
				this.contactViewGoBackBtn.activeSelf = false;

				this._camAngles.resetAngle();
			};

			var lookOnComplete = () => {
				threeOrbit.enableZoom = true;
				threeOrbit.enableRotate = true;

				this._camAngles.directionMastAngle();
			};

			this.TranstionTemplate(1.5, this.directionMastLookAt, this.directionMastCamPos, lookOnStart, lookOnComplete);
		};

		// Blueprint View
		this._transitions.blueprintView = () => {
			var lookOnStart = () => {
				threeOrbit.enableZoom = false;
				threeOrbit.enableRotate = false;

				this.aboutProjectGoBackBtn.activeSelf = false;
				this.interestsGoBackBtn.activeSelf = false;
				this.contactViewGoBackBtn.activeSelf = false;

				this._camAngles.resetAngle();
			};

			var lookOnComplete = () => {
				threeOrbit.enableZoom = true;
				threeOrbit.enableRotate = true;
				threeOrbit.autoRotate = true;

				this._camAngles.blueprintAngle();
			};

			this.TranstionTemplate(1.5, this.blueprintViewLookAt, this.blueprintViewCamPos, lookOnStart, lookOnComplete);
		};

		// About & Projects View
		this._transitions.aboutprojectsView = () => {
			var lookOnStart = () => {
				threeOrbit.enableZoom = false;
				threeOrbit.enableRotate = false;

				this.aboutProjectGoBackBtn.activeSelf = false;
				this.interestsGoBackBtn.activeSelf = false;
				this.contactViewGoBackBtn.activeSelf = false;

				this._camAngles.resetAngle();
			};

			var lookOnComplete = () => {
				threeOrbit.enableZoom = true;

				this.aboutProjectGoBackBtn.activeSelf = true;
				this._camAngles.aboutprojectsAngle();
			};

			this.TranstionTemplate(1.5, this.aboutProjectViewLookAt, this.aboutProjectViewCamPos, lookOnStart, lookOnComplete);
		};

		// Interests View
		this._transitions.interestsView = () => {
			var lookOnStart = () => {
				threeOrbit.enableZoom = false;
				threeOrbit.enableRotate = false;

				this.aboutProjectGoBackBtn.activeSelf = false;
				this.interestsGoBackBtn.activeSelf = false;
				this.contactViewGoBackBtn.activeSelf = false;

				this._camAngles.resetAngle();
			};

			var lookOnComplete = () => {
				threeOrbit.enableZoom = true;

				this.interestsGoBackBtn.activeSelf = true;
				this._camAngles.interestsAngle();
			};

			this.TranstionTemplate(1.5, this.interestsViewLookAt, this.interestsViewCamPos, lookOnStart, lookOnComplete);
		}

		// Contact View
		this._transitions.contactsView = () => {
			var lookOnStart = () => {
				threeOrbit.enableZoom = false;
				threeOrbit.enableRotate = false;

				this.aboutProjectGoBackBtn.activeSelf = false;
				this.interestsGoBackBtn.activeSelf = false;
				this.contactViewGoBackBtn.activeSelf = false;

				this._camAngles.resetAngle();
			};

			var lookOnComplete = () => {
				threeOrbit.enableZoom = true;
				
				this.contactViewGoBackBtn.activeSelf = true;
				this._camAngles.contactAngle();
			}

			this.TranstionTemplate(1.5, this.contactViewLookAt, this.contactViewCamPos, lookOnStart, lookOnComplete);
		}
	}

	private TranstionTemplate(duration : number, lookAtVector : Vector3, cameraPositionVector : Vector3, lookOnStart : gsap.Callback, lookOnComplete : gsap.Callback) {
		gsap.to(this.lookAtObject.position, {
			x : lookAtVector.x,
			y : lookAtVector.y,
			z : lookAtVector.z,
			duration : duration,
			onStart : lookOnStart,
			onComplete : lookOnComplete
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