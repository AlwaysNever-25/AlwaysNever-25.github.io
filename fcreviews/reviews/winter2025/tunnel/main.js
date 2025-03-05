import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

if ( WebGL.isWebGL2Available() ) {

	const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

    const torus = new THREE.Mesh( geometry, material );
    scene.add( torus );

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5,5,5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    
    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper);
    
    //const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //const cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;

        controls.update();

        renderer.render( scene, camera );

    }

    function addStar(){
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
        const star = new THREE.Mesh(geometry, material);

        const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z);
        scene.add(star);
    }

    Array(200).fill().forEach(addStar);

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}