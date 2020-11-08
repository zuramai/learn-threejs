import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
function main() {
	let canvas = document.getElementById('canvas');
	const renderer = new THREE.WebGLRenderer({canvas})

	const fov = 75; // field of view; vertical dimension
	const aspect = 2; // canvas default
	const near = 1; // space in front of camera
	const far = 5;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 3;
	const controls = new OrbitControls(camera, renderer.domElement)

	const scene = new THREE.Scene();
	scene.background = new THREE.Color("white")
	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(1, 0 , 0);
		scene.add(light);
		const light2 = new THREE.DirectionalLight(color, intensity);
		light2.position.set(-2, 2 ,2);
		scene.add(light2);
	  }

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth =1 ;
	const geometry = new THREE.ConeBufferGeometry(1, 1,38);
	

	renderer.render(scene,camera)

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({color})
		const cube = new THREE.Mesh(geometry,material)
		scene.add(cube)
		cube.position.x = x;
		return cube;
	}

	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
	]

	function render(time) {
		time *= 0.001; // convert time to seconds
		
		canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		cubes.forEach(cube => {
			cube.rotation.y = time;
		})

		renderer.render(scene,camera);
		requestAnimationFrame(render)
	}
	requestAnimationFrame(render)
}
main()