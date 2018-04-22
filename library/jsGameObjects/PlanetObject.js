// script for definition of Planet Object

function PlanetObject(){
  this.name="aPlanetobject" ; // default name
  this.threeDObj = new THREE.Object3D(); // define the object as having a 3D mesh
  this.planetazimuth = 0;
  this.rotationalspeed = 2*Math.PI/8;
  //default definitions
  // body definition
  this.body = { radius : 0.5, color : 0x68c3c0 , threeDObj: [], type: 'planet'};
  // add planet body
  this.body.name = "foundation";
  this.body.threeDObj = new THREE.Object3D(); // define the object as having a 3D mesh

  var earthMesh	= THREEx.Planets.createEarth(0.1);

  this.body.threeDObj.add(earthMesh);

  // assemble 3DObject
  this.threeDObj.add(this.body.threeDObj);
  this.threeDObj.rotation.x = 23.5*Math.PI/180;




  this.updatePhysics = function(time, deltatime){
    this.planetazimuth += this.rotationalspeed * (deltatime) ;
    this.planetazimuth = this.planetazimuth % (2*Math.PI);
    // var RotorWake = this.scene.getObjectByName( "Rotor", true );
    // var RotorWake = this.gameHAWTobjects[i].threeDObj.getObjectByName( "Rotor", true );
    // console.log(scene);
    // console.log(RotorWake);
    this.body.threeDObj.rotation.y = this.planetazimuth;
    // this.wake.threeDObj.rotation.x = this.planetazimuth;
    // console.log(" time is "+ this.gamePlay.time + "  this.gameHAWTobjects[0].planetazimuth " + this.gameHAWTobjects[0].planetazimuth);
  };

};
