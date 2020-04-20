// three.js
const camera_width = window.innerWidth;
const camera_height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, camera_width / camera_height, 0.1, 1000);
camera.position.z = 1.5;

var renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('main').appendChild(renderer.domElement);

// set the lights
var ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

var light = new THREE.DirectionalLight('#fff', 1);
light.position.set(5, 3, 5);
scene.add(light);

// create earth
var earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('./earthmap.jpg'),
    bumpMap: new THREE.TextureLoader().load('./earthbumpmap.jpg'),
    bumpScale: 0.009,
    specularMap: new THREE.TextureLoader().load('./earthwater.png'),
    specular: '#1d1d1e'
  })
);

// create clouds
var clouds = new THREE.Mesh(
  new THREE.SphereGeometry(0.503, 32, 32),
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('./earthclouds.png'),
    transparent: true
  })
);

// create space
var space = new THREE.Mesh(
  new THREE.SphereGeometry(90, 32, 32),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./space.png'),
    side: THREE.BackSide
  })
);

// interactions
var controls = new THREE.OrbitControls( camera, renderer.domElement );

earth.add(clouds);
scene.add(earth);
scene.add(space);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  earth.rotation.y += 0.0005;
  clouds.rotation.y += 0.0003;
  renderer.render(scene, camera);
}

animate();