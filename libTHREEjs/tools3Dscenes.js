

// var TEMP1 =[];

//
//
//
//
//
//
//

function make3Dplotdom(width,height, CurrentdomElement) {
//  this function creates the scene, rendering abilities and cameras
//  and allocates them to the domElement,
//  input: height and width of the scene, and pointer to domElement
//
//

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(25, width / height, 0.3, 100000);
    // console.log(window);
    // create a render and set the size
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // renderer.setClearColor(new THREE.Color(0xFFFFFF));
    // renderer.setClearColor(new THREE.Color(0x93C47D));

    $("#"+CurrentdomElement).append(renderer.domElement);

 // TEMP1=$("#"+CurrentdomElement).width();
// TEMP1= document.getElementById(CurrentdomElement).style.width
// alert($("#"+CurrentdomElement).width);

    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;

    createLights(scene)

    //  renderer.setSize(width, height);


    camera.position.x = 10;
    camera.position.y = 10;
    camera.position.z = 10;

    scene.position.x= 0;

    camera.lookAt(scene.position);
    camera.lookAt(new THREE.Vector3(0, 0, 0));






    // add the output of the renderer to the html element
    $("#"+CurrentdomElement).append(renderer.domElement);

    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', render );
		// controls.enableZoom = false;

    // render the scene
    renderer.render(scene, camera);
    // console.log(scene);
    return [scene, camera, renderer]
    // return scene
};

//

function add_3D_element_to_scene(rotor_wake_system, scene){
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  //scene=null;
  // scene = new THREE.Scene();
  rings = rotor_wake_system.rings;




  var rotor = createRotor(rotor_wake_system.bladepanels);

  var wake= new createWakeMesh(rings);
  // scene.add(wake);

  var rotorwake = new THREE.Object3D();
  rotorwake.name = 'RotorWake';
  rotorwake.add(wake);
  rotorwake.add(rotor);

  scene.add(rotorwake);
  return scene;

};


function createLights(scenetarget) {

  var hemisphereLight = new THREE.HemisphereLight(0xffffff,0xffffff, .9)
// var hemisphereLight = new THREE.HemisphereLight(Colors["red"],0x000000, .9)
hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
// hemisphereLight.color.setHSL( 0.6, 1, 0.6)
// hemisphereLight.groundColor.setHSL( 0.095, 1, 0.75)
hemisphereLight.position.set( 0, 500, 0)

  var ambientLight = new THREE.AmbientLight(0xffffff, .6);
  var shadowLight = new THREE.DirectionalLight(0xffffff, 1.0);
  shadowLight.position.set(1500, 3500, 3500);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -4000;
  shadowLight.shadow.camera.right = 4000;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 10000;
  shadowLight.shadow.mapSize.width = 4096;
  shadowLight.shadow.mapSize.height = 4096;


  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);

  //scene.add(ch);
  scenetarget.add(hemisphereLight);
  scenetarget.add(shadowLight);
  scenetarget.add(ambientLight);

};





THREE.PolarHelper = function(radius, rStep, aStep, color) {

  var helper = new THREE.Mesh();

  function line(r, a, color) {
    var material = new THREE.LineBasicMaterial({ color: color });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( Math.cos(a)*r, Math.sin(a)*r, 0 ),
      new THREE.Vector3( -Math.cos(a)*r, -Math.sin(a)*r, 0 )
    );
    return new THREE.Line( geometry, material );
  }

  function circle(r, color) {
    var curve = new THREE.EllipseCurve( 0,  0,  r, r, 0,  2 * Math.PI, false,   0 );
    var path = new THREE.Path( curve.getPoints( 72 ) );
    var geometry = path.createPointsGeometry( 72 );
    var material = new THREE.LineBasicMaterial( { color : color } );
    return new THREE.Line( geometry, material );
  }

  var d = radius/rStep;
  for (var r=1; r<=rStep; r++) {
    helper.add(circle(r*d, color));
  }

  d = Math.PI/aStep;
  for (var a=0; a<aStep; a++) {
    helper.add( line(radius, a*d, color) );
  }

  return helper;
}
