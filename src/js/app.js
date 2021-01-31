import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
function main() {
	let canvas = document.getElementById('canvas');
	const renderer = new THREE.WebGLRenderer({canvas})

	const fov = 50; // field of view; vertical dimension
	const aspect = 1; // canvas default
	const near = 1; // space in front of camera
	const far = 15;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.x = 1;
	camera.position.y = 1;
	camera.position.z = 8;
	const controls = new OrbitControls(camera, renderer.domElement)
	// controls.enableZoom = false;

	const scene = new THREE.Scene();
	scene.background = new THREE.Color("#2e2e28")
	{
		const color = 0x8f8f89;
		const intensity = 2;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(1, 1 , 1);
		scene.add(light);
		// const light2 = new THREE.DirectionalLight(color, intensity);
		// light2.position.set(1,1,1);
		// scene.add(light2);
	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth =1 ;
	const geometry = new THREE.ConeBufferGeometry(1, 1,38);
	

	// renderer.render(scene,camera)

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({color})
		const cube = new THREE.Mesh(geometry,material)
		scene.add(cube)
		cube.position.x = x;
		return cube;
	}

	const cubes = [
		// makeInstance(geometry, 0x44aa88, 0),
	]

	// LOAD GLTF
	const loader = new GLTFLoader();
	loader.load('models/sculpture/scene.gltf', function(gltf) {
		gltf.scene.position.x = 0
		gltf.scene.rotateX(-0.5)
		gltf.scene.rotateZ(0.1)
		gltf.scene.position.y += 1
		scene.add(gltf.scene)
	}, function(xhr) {
		console.log((xhr.loaded/xhr.total*100) + '% loaded');
	}, function(error) {
		console.log('an error happened')
	})

	function render(time) {
		time *= 0.001; // convert time to seconds
		
		canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		// camera.updateProjectionMatrix();
		// cubes.forEach(cube => {
		// 	cube.rotation.y += 1;
		// })

		renderer.render(scene,camera);
		requestAnimationFrame(render)
	}
	requestAnimationFrame(render)
}
main()