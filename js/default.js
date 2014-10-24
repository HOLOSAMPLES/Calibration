var camera, scene, renderer;
 var mesh;
 var winWidth = window.innerWidth;
 var winHeight = window.innerHeight;
 init();
 animate();
 
 function init() {
 
 	renderer = new LeiaWebGLRenderer({
 		antialias: true,
 		renderMode: _renderMode,
 		camPanelVisible: _camPanelVisible,
 		gyroPanelVisible: _gyroPanelVisible,
 		camFov: _camFov, 
 		devicePixelRatio: 1
 	});
 	renderer.Leia_setSize(winWidth, winHeight);
 	document.body.appendChild(renderer.domElement);
 
 	//
 	camera = new LeiaCamera(70, winWidth / winHeight, 1, 1000);
 	camera.position.z = 1000;
 
 	scene = new THREE.Scene();
 
 	//add light
 	var xl = new THREE.DirectionalLight(0x555555);
 	xl.position.set(1, 0, 2);
 	scene.add(xl);
 	var pl = new THREE.PointLight(0x111111);
 	pl.position.set(-20, 10, 20);
 	scene.add(pl);
 
 	var ambientLight = new THREE.AmbientLight(0x111111);
 	scene.add(ambientLight);
 
 	var sphere = new THREE.Mesh(new THREE.SphereGeometry(window.innerWidth * 0.03, 100, 100), new THREE.MeshPhongMaterial({ color: 0xffffff }));
 	sphere.overdraw = true;
 	sphere.position.z = 10;
 	scene.add(sphere);
 
 	//THREE.ImageUtils.crossOrigin = "anonymous";
 	var LEIA_centerPlaneTexture = THREE.ImageUtils.loadTexture("resource/target.png");
 	LEIA_centerPlaneTexture.wrapS = LEIA_centerPlaneTexture.wrapT = THREE.RepeatWrapping;
 	LEIA_centerPlaneTexture.repeat.set(1, 1);
 	var LEIA_centerPlaneMaterial = new THREE.MeshPhongMaterial({ map: LEIA_centerPlaneTexture, transparent: true, side: THREE.DoubleSide });
 	var LEIA_centerPlaneGeometry;
 
 	LEIA_centerPlaneGeometry = new THREE.PlaneGeometry(window.innerWidth * 0.75, window.innerHeight * 0.75, 10, 10);
 	LEIA_centerPlane = new THREE.Mesh(LEIA_centerPlaneGeometry, LEIA_centerPlaneMaterial);
 	LEIA_centerPlane.position.x = 0;
 	LEIA_centerPlane.position.y = 0;
 	LEIA_centerPlane.position.z = 0;
 	scene.add(LEIA_centerPlane);
 }
 
 
 function animate() {
 
 	requestAnimationFrame(animate);
 
 	renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render(scene, camera,undefined,undefined,0.4);
 
 }
