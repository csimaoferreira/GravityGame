// game object, that allows for all controls and game play
var gamePlanet = {
  scene : [],
  camera : [],
  renderer : [],
  controls : [],
  pointerAnimationrequest : [],
  gamewindow : [],
  // gameHAWTnumber: 1,
  gamePlanetobjects: [],
  gameGridObject: {threeDObj: [], size: 100, divisions:100},
  gamePlay: {time : 0 , gametime : 0},
  gamePhysics: {
    Uinf: 10, // unperturbed wind speed, in m/s
    waterPumpPower: 0,
    waterLevel: -0.6,
    waterLevelIncreaseRate: .3 // persecond
  },
  gameStarSkyObject : [],
  stats : [],
  create3Dcanvas: function(width, height, divname) {
    this.gamewindow.width = width;
    this.gamewindow.height = height;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(25, width / height, 0.3, 100000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.scene.position.x= 0;
    this.camera.lookAt(this.scene.position);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    // createLights(this.scene)

    var scaletemp=50;
    this.camera.position.set(200/scaletemp, 00/scaletemp, 0/scaletemp);

    this.camera.lookAt(new THREE.Vector3(0/scaletemp, 0/scaletemp, 0));
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    $("#"+ divname).append(this.renderer.domElement);

    // set lights for scene
    var light	= new THREE.AmbientLight( 0x888888 ,.9)
  	this.scene.add( light )
  	// var light	= new THREE.DirectionalLight( 'white', 1)
  	// light.position.set(5,5,5)
  	// light.target.position.set( 0, 0, 0 )
  	// scene.add( light )

  	var light	= new THREE.DirectionalLight( 0xcccccc, 0.5 )
    console.log('being there');
    // var light = new THREE.PointLight( 0xcccccc, 0.5, 100 );
    var lightpos=1000.0;
    light.position.set(0*lightpos, 0*lightpos, 5*lightpos)
  	this.scene.add( light )
  	light.castShadow	= true
  	light.shadowCameraNear	= 0.1
  	light.shadowCameraFar	= 55
  	light.shadowCameraFov	= 95

  	light.shadowCameraLeft	= -1
  	light.shadowCameraRight	=  1
  	light.shadowCameraTop	=  1
  	light.shadowCameraBottom= -1
  	// light.shadowCameraVisible	= true

  	light.shadowBias	= 0.001
  	light.shadowDarkness	= 0.2

  	light.shadowMapWidth	= 1024*2
  	light.shadowMapHeight	= 1024*2




    // render the scene
    this.renderer.render(this.scene, this.camera);

  },
  intialize3DgameScene: function(){
    // var dgrid = this.gameGridObject.size/this.gameGridObject.divisions;
    // console.log('I am here');
    // var test =  new PlanetObject();
    // console.log(test);
    this.gamePlanetobjects[0] = new PlanetObject();
    // console.log('I am here 2');
    // this.gameHAWTobjects[0].rotorazimuth += Math.random()*3.14*2;
    // this.gameHAWTobjects[0].yawangle= 0;
    // this.gameHAWTobjects[0].nblades = 4;
    // this.gameHAWTobjects[0].rotationalspeed =0.7;
    // this.gameHAWTobjects[0].foundation = { height : 0 , topradius : 4 , bottomradius : 4 ,
    //   color : colorthemes["portugueseWindmill"] , threeDObj: [], type: 'portugueseWindMillfoundation'};
    // this.gameHAWTobjects[0].tower = {type : 'portugueseWindMilltower', color : colorthemes["portugueseWindmill"],
    //   height : 5.5, topradius : 5/2, bottomradius : 6/2};
    // this.gameHAWTobjects[0].nacelle ={type : 'portugueseWindMillnacelle', color : colorthemes["portugueseWindmill"],
    //   width : 5, length : 5, height : 1.5};
    // this.gameHAWTobjects[0].rotor = {type:'portugueseWindMill', hub: {diameter: [ 0.33 , 0.20], length: [4.2 , 3.3 ]},
    //     blade : {length: 6.4 , mastdiameter: 0.15}, color : colorthemes["portugueseWindmill"], tilt: 15*3.14/180}; // tilt angle of the rotor nacelle
    //   this.gameHAWTobjects[0].assembleHAWT();
    //   this.gameHAWTobjects[0].wake.threeDObj.visible  = false;
    //   this.gameHAWTobjects[0].rotornacellesystem.threeDObj.rotation.y = this.gameHAWTobjects[0].yawangle;
      this.scene.add(this.gamePlanetobjects[0].threeDObj);
      // console.log('I am here 3');


    // add Sky full of Stars
    this.gameStarSkyObject.name = 'SkyFullStars';
    this.gameStarSkyObject.threeDObj = new THREE.Object3D(); // define the object as having a 3D mesh
    var newsky = new THREE.Object3D();
    var meshsky = THREEx.Planets.createStarfield();
    meshsky.castShadow = false;
    meshsky.receiveShadow = false;
    newsky.add(meshsky)

    this.gameStarSkyObject.threeDObj.add(newsky);
    this.scene.add(this.gameStarSkyObject.threeDObj);
    // this.scene.add(this.gamePlanetobjects[0].threeDObj);


    // };
    // // add windrose
    // this.windrose = new WindRoseObject(5, 10);
    // this.windrose.generateWindField();
    // this.windrose.threeDObj.scale.set(20,20,20);
    // this.windrose.threeDObj.position.set(100,40,150);
    // this.scene.add(this.windrose.threeDObj);

    // // add landscape
    // this.gameLandscapeObject = new DutchPolderLandscape();
    // this.scene.add( this.gameLandscapeObject.threeDObj );

    // add flag
    // this.flag = new flagWind(12,5);
    // this.flag.threeDObj.position.set(0, this.gameHAWTobjects[0].foundation.height,this.gameLandscapeObject.width*0.2);
    // this.scene.add(this.flag.threeDObj);

    // add house to the polder
    // this.house =new HouseObject({color: colorthemes["vintage1"], length: 10, height: 3, width:5});
    // this.house.startPosition = [this.gameLandscapeObject.width*0.4, -2.5, this.gameLandscapeObject.width*0.35];
    // this.house.threeDObj.position.set(this.house.startPosition[0], this.house.startPosition[1], this.house.startPosition[2]);
    // this.house.timefloating = 0;
    // this.house.floatingspeed = 10;
    // this.scene.add(this.house.threeDObj);

    // add grid to the game
//     this.gameGridObject.threeDObj[0] = new THREE.GridHelper( this.gameGridObject.size, this.gameGridObject.divisions );
//     this.gameGridObject.threeDObj[1] = new THREE.GridHelper( this.gameGridObject.size, this.gameGridObject.divisions );
//     this.gameGridObject.threeDObj[2] = new THREE.GridHelper( this.gameGridObject.size, this.gameGridObject.divisions );
//     this.gameGridObject.threeDObj[1].rotation.x =Math.PI/2;
//     this.gameGridObject.threeDObj[2].rotation.z =Math.PI/2;
// // console.log(this.gameGridObject.threeDObj[2]);
//     this.scene.add( this.gameGridObject.threeDObj[0] );
//
//     this.scene.add( this.gameGridObject.threeDObj[1] );
//     this.scene.add( this.gameGridObject.threeDObj[2] );

  },
  startGame: function(width, height, divname){
    var d = new Date();
    var time = (d.getTime())/1000;
    this.gamePlay.time = time;
    this.create3Dcanvas(width, height, divname);
    this.intialize3DgameScene();
    this.renderer.render( this.scene, this.camera );

    this.stats[0] = new Stats();
    this.stats[0].showPanel(0); // Panel 0 = fps
    this.stats[0].domElement.style.cssText = 'position:absolute;top:0px;left:0px;';
    document.body.appendChild(this.stats[0].domElement);

    this.stats[1] = new Stats();
    this.stats[1].showPanel(1); // Panel 2 = ms
    this.stats[1].domElement.style.cssText = 'position:absolute;top:0px;left:80px;';
    document.body.appendChild(this.stats[1].domElement);

    this.stats[2] = new Stats();
    this.stats[2].showPanel(2); // Panel 3 = MB
    this.stats[2].domElement.style.cssText = 'position:absolute;top:0px;left:160px;';
    document.body.appendChild(this.stats[2].domElement);

    this.fieldScore = document.getElementById("scoreValue");
    this.powerBar = document.getElementById("powerBar");
    // this.replayMessage = document.getElementById("replayMessage");
    // this.fieldLevel = document.getElementById("levelValue");
    this.levelCircle = document.getElementById("levelCircleStroke");


    this.updateGamePhysics();
    this.updateGameAnimation();

  },

  updateGamePhysics: function (){
    // get current time
    var d = new Date();
    var time = (d.getTime())/1000;
    this.gamePlanetobjects[0].updatePhysics(time, (time - this.gamePlay.time)) ;

    // this.gameLandscapeObject.updatelandscape(time);
    // var windloc = this.windrose.randomWind(time, 30);
    // for (var i = 0; i < this.gameHAWTnumber; i++) {
    //   this.gameHAWTobjects[i].updatePhysics(time, (time - this.gamePlay.time)) ;
    // };
    // this.flag.updateFlagDynamics(time, windloc.direction, windloc.magnitude);
    // this.gameHAWTobjects[0].yawmodel.calculateCP(windloc.direction, this.gameHAWTobjects[0].yawangle);
    // this.gamePhysics.waterPumpPower = 0.25;
     // this.gameHAWTobjects[0].yawmodel.CP*0.5*1;
    // this.updateWaterLevel(time - this.gamePlay.time);
    // this.gameLandscapeObject.water.threeDObj.position = this.gameLandscapeObject.water.threeDObj.position;
    // this.gameLandscapeObject.water.threeDObj.position.y =   this.gamePhysics.waterLevel;
    // console.log(this.gameLandscapeObject.water.threeDObj.position);
    // this.updateHousePosition(time - this.gamePlay.time);
    this.gamePlay.gametime += (time - this.gamePlay.time);
    this.gamePlay.time = time;
  },
  //////////////////////////////////////////////////////////////////////////
  updateGameAnimation: function(){
    this.stats[0].update();
    this.stats[1].update();
    this.stats[2].update();
    // this.pointerAnimationrequest=requestAnimationFrame(this.updateGameAnimation());
    this.pointerAnimationrequest=requestAnimationFrame(function() {gamePlanet.updateGameAnimation();});
    this.updateGamePhysics();
    this.updateScore();
    // check if window has resized
    if ( !(this.gamewindow.width == window.innerWidth  && this.gamewindow.height == window.innerHeight)) {
      this.gamewindow.width = window.innerWidth;
      this.gamewindow.height = window.innerHeight;
      this.renderer.setSize(this.gamewindow.width, this.gamewindow.height);
      this.camera.aspect = this.gamewindow.width/ this.gamewindow.height;
      this.camera.updateProjectionMatrix();
    };
    this.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    this.renderer.render( this.scene, this.camera );
    },
  updateScore: function(){
    // this.powerBar.innerHTML = Math.floor(this.gameHAWTobjects[0].yawmodel.CP);
    // powerBar.style.right = (100-this.gameHAWTobjects[0].yawmodel.CP*100/(16/27))+"%";
    // powerBar.style.backgroundColor = (this.gameHAWTobjects[0].yawmodel.CP*100<20)? "#f25346" : "#68c3c0";

    // this.fieldScore.innerHTML = Math.floor(this.gamePlay.gametime);
  },
  updateWarp: function(input1){
     // console.log(this.gamePlanetobjects[0].body.threeDObj);
      var xscale = this.gamePlanetobjects[0].body.threeDObj.scale.x;
      var zscale = this.gamePlanetobjects[0].body.threeDObj.scale.z;
      // console.log(this.gamePlanetobjects[0].body.threeDObj.scale);
      if (input1<0) {
        this.gamePlanetobjects[0].body.threeDObj.scale.x=(xscale*0.9)
        this.gamePlanetobjects[0].body.threeDObj.scale.z=(zscale*0.9)
      } else {
        this.gamePlanetobjects[0].body.threeDObj.scale.x=(xscale/0.9)
        this.gamePlanetobjects[0].body.threeDObj.scale.z=(zscale/0.9)
      };

  }





  // updateYaw: function(angle_nodim, set){
  //   // update Yaw angle of the windmill
  //   if (set === undefined) {
  //     set = false;
  //   };
  //   if (set) {
  //     this.gameHAWTobjects[0].yawangle = angle_nodim;
  //     this.gameHAWTobjects[0].rotornacellesystem.threeDObj.rotation.y = angle_nodim;
  //   } else {
  //     this.gameHAWTobjects[0].yawangle += angle_nodim *5*Math.PI/180;
  //     this.gameHAWTobjects[0].rotornacellesystem.threeDObj.rotation.y = this.gameHAWTobjects[0].yawangle;
  //   };
  // },
  // updateWaterLevel: function(dtime){
  //   var dlevel = (-this.gamePhysics.waterPumpPower+this.gamePhysics.waterLevelIncreaseRate)*dtime;
  //   this.gamePhysics.waterLevel += dlevel;
  //   this.gamePhysics.waterLevel = Math.max( this.gamePhysics.waterLevel  , -.6  );
  //   this.gamePhysics.waterLevel = Math.min( this.gamePhysics.waterLevel  , 0.3  );
  //   // this.gamePhysics.waterLevel = .06;
  // },
  // updateHousePosition: function(dtime){
  //   // calculates the position of the house
  //
  //     var testfalling = (
  //       (this.house.threeDObj.position.x > this.gameLandscapeObject.limitsXZ[0]   ) ||
  //       (this.house.threeDObj.position.z > this.gameLandscapeObject.limitsXZ[1]   )
  //     );
  //     if (testfalling) {
  //       this.house.timefloating += dtime;
  //       var angle = 2*Math.PI*Math.random();
  //       var dx = this.house.floatingspeed*dtime;
  //       var dz = this.house.floatingspeed*dtime;
  //       var x = dx + this.house.threeDObj.position.x;
  //       var z = dz + this.house.threeDObj.position.z;
  //       var time = (x-this.gameLandscapeObject.limitsXZ[0])/this.house.floatingspeed;
  //       var dy = -0.5*9.81*(time*time - (time-dtime)*(time-dtime));
  //       x = Math.max(x, this.house.startPosition[0]+this.house.timefloating*this.house.floatingspeed*0.1);
  //       z = Math.max(z, this.house.startPosition[2]+this.house.timefloating*this.house.floatingspeed*0.1);
  //       this.house.threeDObj.rotation.x = 3.14*Math.cos(time/2);
  //       this.house.threeDObj.rotation.y = 3.14*Math.cos(time/2);
  //       this.house.threeDObj.rotation.z = 3.14*Math.cos(time/2);
  //       this.house.threeDObj.position.y += dy;
  //       this.house.threeDObj.position.x = x;
  //       this.house.threeDObj.position.z = z;
  //     } else {
  //       if (this.gamePhysics.waterLevel>-0.05) {
  //         this.house.timefloating += dtime;
  //         var angle = 2*Math.PI*Math.random();
  //         var dx = this.house.floatingspeed*dtime*Math.max(Math.cos(angle), -.5);
  //         var dz = this.house.floatingspeed*dtime*Math.max(Math.sin(angle), -.5);
  //         var x = dx + this.house.threeDObj.position.x;
  //         var z = dz + this.house.threeDObj.position.z;
  //         x = Math.max(x, this.house.startPosition[0]+this.house.timefloating*this.house.floatingspeed*0.1);
  //         z = Math.max(z, this.house.startPosition[2]+this.house.timefloating*this.house.floatingspeed*0.1);
  //         this.house.threeDObj.rotation.x = 0.05*3.14*Math.cos(this.house.timefloating *3);
  //         this.house.threeDObj.rotation.y = 0.05*3.14*Math.cos(this.house.timefloating);
  //         this.house.threeDObj.rotation.z = 0.05*3.14*Math.cos(this.house.timefloating);
  //         this.house.threeDObj.position.y = this.house.startPosition[1]+0.2;
  //         this.house.threeDObj.position.x = x;
  //         this.house.threeDObj.position.z = z;
  //     };
  //   };
  // }
}; // end definition of var
