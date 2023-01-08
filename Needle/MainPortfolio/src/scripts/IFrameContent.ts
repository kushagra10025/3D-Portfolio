import { Behaviour, serializable } from "@needle-tools/engine";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { Scene, Quaternion, Vector3 } from "three";
import { setWorldQuaternion, setWorldPosition, getWorldPosition, getWorldQuaternion } from "@needle-tools/engine/engine/engine_three_utils";

export class IFrameContent extends Behaviour {

	@serializable()
	url : string = "https://kushagra10025.github.io";
	
	@serializable()
	pixelsPerUnit : number = 500;

	@serializable()
	borderRadius : number = 50;

	private cssRenderer !: CSS3DRenderer;
	private cssScene !: Scene;
	private cssObj !: CSS3DObject;
	private rotate90 : Quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);

	start() {
		const div = document.createElement('div');
		div.innerHTML = `<iframe width="1000" height="1000" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe>`;
		div.style.zIndex = "10000";
		div.style.position = "absolute";
		div.style.pointerEvents = "initial";

		const iframe = div.querySelector('iframe')!;
		// slight delay for opening after page load
		iframe.addEventListener('load', () => {
			console.log("Loaded IFrame Loader");
			// setTimeout(() => {
			// 	this.animator?.SetBool("Open", true);
			// }, 1000);
		});
		iframe.src =  this.url;

		// scale so that aspect is always nice
		let size = 1000;
		// get object scale, multiply by pixelsPerUnit and round to int
		const scaleX = Math.round(this.gameObject.scale.x * this.pixelsPerUnit);
		const scaleY = Math.round(this.gameObject.scale.y * this.pixelsPerUnit);
		size = Math.max(scaleX, scaleY);
		iframe.width = scaleX + 'px';
		iframe.height = scaleY + 'px';

		// absolute positioning and round corners
		div.style.position = "absolute";
		if (this.borderRadius > 0)
			div.style.borderRadius = this.borderRadius + "px";
		div.style.overflow = "visible";
		div.style.pointerEvents = "initial";

		document.body.append(div);

		// set up CSS3D renderer for this object
		this.cssRenderer = new CSS3DRenderer();
		this.cssRenderer.domElement.style.pointerEvents = "none";
		this.cssRenderer.domElement.style.position = 'absolute';
		this.cssRenderer.domElement.style.top = '0px';
		this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
		document.body.append(this.cssRenderer.domElement);

		// set up CSS3D scene
		this.cssScene = new Scene();
		const obj = new CSS3DObject(div);
		obj.scale.setScalar(Math.max(this.gameObject.scale.x, this.gameObject.scale.y) / size);

		// sync transforms
		setWorldPosition(obj, getWorldPosition(this.gameObject));
		setWorldQuaternion(obj, getWorldQuaternion(this.gameObject));
		obj.quaternion.multiply(this.rotate90);

		this.cssScene.add(obj);
		this.cssObj = obj;
		// Set to Invisible by Default
		this.cssObj.visible = false;

		// attach to post_render events to get perfect sync to the camera
		this.context.post_render_callbacks.push(this.onPostRender.bind(this));
		window.addEventListener( 'resize', () => {
			this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
		});
	}

	onPostRender() {
		// sync transforms
		setWorldPosition(this.cssObj, getWorldPosition(this.gameObject));
		setWorldQuaternion(this.cssObj, getWorldQuaternion(this.gameObject));
		this.cssObj.quaternion.multiply(this.rotate90);

		this.cssRenderer.render(this.cssScene, this.context.mainCamera!);
	}

	public SetVisibilityIFrame(visibility : boolean) {
		this.cssObj.visible = visibility;
		console.log(visibility);
		
	}
}