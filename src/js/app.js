import * as THREE from 'three';

function main() {
	const canvas = document.getElementById('canvas');
	const renderer = new THREE.WebGLRenderer({canvas})

	const fov = 75; // field of view; vertical dimension
	const aspect = 2; // canvas default
	const near = 0.1; // space in front of camera
	const far = 5;

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	camera.position.z = 2;

	const scene = new THREE.Scene();

	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);
	  }

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight,boxDepth);
	

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
		makeInstance(geometry, 0x8844aa, -2),
		makeInstance(geometry, 0xaa8844, 2)
	]

	function render(time) {
		time *= 0.001; // convert time to seconds
	
		cubes.forEach(cube => {
			cube.rotation.y = time;
			cube.rotation.x = time;
		})

		renderer.render(scene,camera);
		requestAnimationFrame(render)
	}
	requestAnimationFrame(render)
}
main()