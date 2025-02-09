//    (                      )               *   )    (                           
// ( )\    (     )       ( /(  (     )    ` )  /(  ( )\  (                   (   
// )((_)  ))\ ( /(  (    )\())))\   (      ( )(_))))((_)))\(   (  (  `  )   ))\  
//((_)_  /((_))(_)) )\ )(_))//((_)  )\  ' (_(_())/((__ /((_)\  )\ )\ /(/(  /((_) 
// / _ \(_))(((_)_ _(_/(| |_(_))( _((_))  |_   _(_))| (_))((_)((_((_((_)_\(_))   
//| (_) | || / _` | ' \)|  _| || | '  \()   | | / -_| / -_(_-/ _/ _ | '_ \/ -_)  
// \__\_\\_,_\__,_|_||_| \__|\_,_|_|_|_|    |_| \___|_\___/__\__\___| .__/\___|  
//                                                                  |_|          
 // Quantum Telescope
 // Ноу-хау тёмная материя подключается в бозон хигса. 🧠👩🏼‍💻🛰⚪️⚫️➕♾️ Антиматерия + Материя + 🕕
 // Передача данных сквозь тёмную материю 
 // Author Secured
 // Org.nr: 927759497
 // Kontonummer: 1227.23.95444
 // www.moonhost.no
 //1q1s75m12-51-05-x051717104701274091://secured20.wixsite.com/mhno/solutions
 //١ذ=-٨٠ ١ذ٤-٦٨-١٣ ١٣٠٤دو٦ذ١-٦ ١٤ ٦ود١ذ٩-=صث=٧و١-١
//https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+hostname,st_lum,st_mass,st_teff,ra,dec,rastr,decstr,sy_dist,pl_name,pl_rade,pl_orbper,pl_masse+from+ps&format=json
//hostname,st_lum,st_mass,st_teff,ra,dec,rastr,decstr,sy_dist,pl_name,pl_rade,pl_orbper,pl_masse
//curl https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+hostname,st_lum,st_mass,st_teff,ra,dec,rastr,decstr,sy_dist,pl_name,pl_rade,pl_orbper,pl_masse+from+ps&format=json -o dataS.json -L
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { gsap, ScrollTrigger } from "gsap/all";
import {jsqubits} from 'jsqubits'
import qdm from './catalogs/quantum_data_min.json';
import vertexShader from './Shaders/vertexShader.glsl.js';
import fragmentShader from './Shaders/fragmentShader.glsl.js';
import vertexShaderPlanet from './Shaders/vertexShaderPlanet.glsl.js';
import fragmentShaderPlanet from './Shaders/fragmentShaderPlanet.glsl.js';
const loader = new FontLoader();
var ufo;
let mixer = null;
var started = true;
var SpaceSize = 1000000000000;//1.7976931348623157E+10308;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, SpaceSize*100);
THREE.Cache.enabled = true;
var scene = new THREE.Scene();
var scenePlanet = new THREE.Scene();
// Intial setup params
var moveSpeed = 10000;
var timestamp = 0;
var timerValue = 0.00000001;
var PARSEC = 30856776*100; // EQUAL PARSEC initial 308.56776
var equatorial = 23454.706481336;
var points = [];
let scaleCalc = 0.1;
var planets = [];
var bhData = [];
var timestamp = 0;
var clouds;
var moon;
var scaleVector = new THREE.Vector3();
var ship = [];
var starsData = [];
var planetsData = [];
var quantumData = qdm;
var exoplanets = [];
var stars = [];
var solarSystemData = [];
var groupData = [];
var rotationAngle = 0.001;
// Sun params
var radiusS = 0.5,
    segmentsS = 32,
    rotationS = 6;
// Earth params
var radius = 0.5,
    segments = 32,
    rotation = 6;
// Moon params
var radiusM = 0.5,
    segmentsM = 32,
    rotationM = 6;
var selectedExoplanet = '';
var selectedStar = '';
		
var newQuantumTask = [];
var newQuantumTaskBool = false;
class SpaceControls {

	constructor() {

	}
	renderView() {
		//GUI.js
		var objGui = {
		        message: '∞',
				time: Date.now(),
				timeswitch: true,
		        test: function () {
		          alert('test');
		        },
				Format: 'RGBFormat',
				WrapS: 'ClampToEdgeWrapping',
				WrapT: 'ClampToEdgeWrapping',
				Rotation: 0,
				Wireframe: false,
				WireframeLineWidth: 20.1,
				noiseStrength: 10.1,
				QunatumTelescope: false,
				Equatorial: 23454.706481336,
		        color0: "#ffffff",
				fog: "#a312e3",
				camera: 50,
				Speed: moveSpeed,
		        color1: [ 0, 128, 255 ],
				 MERG: 2356,
				 PARSEC: PARSEC,
				 scaleXYZ: 0.1,
				 scaleX: -0.1,
				 scaleY: -0.1,
				 scaleZ: -0.1,
				 color: "#000000",
		    	 emissive: "#00ff35",
			  	multiverse: 1,
			    count: 10000+quantumData.length,//quantumData.length,
			    size: 41.25,
			    radius: 42.36,
			    branches: 3,
			    spin: 1,
			    randomness: 40.25,
			    randomnessPower: 56.69,
			    insideColor: "#a330ff",
			    outsideColor: "#1b3984",
				 side: {
					 FrontSide: THREE.FrontSide,
					 BackSide: THREE.BackSide,
					 DoubleSide: THREE.DoubleSide,
				 },
				 combine: {
					 MultiplyOperation: THREE.MultiplyOperation,
					 MixOperation: THREE.MixOperation,
					 AddOperation: THREE.AddOperation,
				 },
				 loadFile : function() { 
					document.getElementById('myInput').click();
				 },
				 stars: selectedStar,
				 exoplanets: selectedExoplanet,
				 start: function(){
				 	//alert(ufo.position);
				 	startAnimation();
				 }
		    };
		    function startAnimation(engine){// e,w,t
		    	if(ufo){
					const position = ufo.position;
		            const tl = gsap.timeline();
		            if(controls){
			            controls.enableDamping = true; 
			            controls.enabled = true;
		            }
		            const rememberRotation = ufo.rotation;
		        	if(engine == 'e'){
		        		ufo.rotation.z = 0;
		        		//ufo.add(wh);
		        		tl.to(ufo.rotation, {
					    duration: 1.5,
					    z: Math.PI * 360 + ufo.rotation.z,
					    onUpdate:()=>{
					    	//update();
					    },
		                onComplete: () => {
		                	// Send camera to ufo
		                    moveCamera();
		                }
					  })
		        	}else if(engine == '٠'){
		        		const getPrevAndNext = (selectedExoplanet) => {
						  const index = exoplanets.findIndex((a) => a === selectedExoplanet)
						  if (index === -1) {
						    return undefined
						  }
						  
						  const prev = planetsData[index - 1]
						  if (!prev) {
						    return undefined
						  }
						  
						  const next = planetsData[index + 1]
						  if (!next) {
						    return undefined
						  }
						  
						  return [prev, next]
						}
						const pn = getPrevAndNext(selectedExoplanet);
						if(pn){
							if(moveBackward){
								//S
								selectedExoplanet = pn[0].userData.name;
							}else if(moveForward){
								//W
								selectedExoplanet = pn[1].userData.name;
							}
			        		moveCamera();
						}
		        	}else{
		        		if(controls){
		        			tl.to(controls.target, {
				                x: position.x, 
				                y: 260,
				                z: position.z,
				                duration: 0.5,
				                onComplete: () => {
				            }},0)
		        		}
		        		if(camera){
				            tl.to(camera.position, {
				                x: position.x, 
				                y: position.y+1600,
				                z: position.z+1399,
				                duration: 0.5,
				                onComplete: () => {

				                	
				                }
				            },0)
				            tl.to(camera.position, {
							                duration: 1,
							                onUpdate: () => {
							                	var offset = 20;
							                	var orbitRadius = 69;
							                	var ospeed = 100;
							                	var speed = 80;
							                	var elapsedValue = Date.now() * timerValue;
							                	var pX = ufo.position.x - (-Math.sin(elapsedValue*speed*ospeed + orbitRadius)*(orbitRadius)*offset);
									 			var pY = ufo.position.y - orbitRadius+offset;
									  			var pZ = ufo.position.z - (Math.cos(elapsedValue*speed*ospeed + orbitRadius)*(orbitRadius)*offset);
							                	camera.position.x = pX;
								                camera.position.y = pY;
								                camera.position.z = pZ;
								                //console.log(camera.position)
							                	camera.rotation.y = (-Math.sin(elapsedValue*speed*ospeed + orbitRadius) + 50+camera.rotation.y);
							                	camera.rotation.z = (-Math.sin(elapsedValue*speed*ospeed + orbitRadius) + 10/camera.rotation.z);
							                	controls.update();
                    							camera.lookAt(ufo); 
											}
							            },0)
		        		}
		        	}
		        }
		    }
		    function percentage(num, per){
		  		return (num/100)*per;
			}
			function getPlanet(value){
				var searchValue = selectedExoplanet;
				if(value){
					searchValue = value;
				}
				var solar = solarSystemData.find((item) => {
		      	   var children = item.group.children;
				   return children.find(p => p.userData.name === searchValue);
				 });
				var childrens = solar.group.children;
		      	var planet = childrens.find(p => p.userData.name === searchValue);
		      	return planet;
			}
			function moveCameraToTarget(pos) {
			  // Get the current spherical coordinates of the camera
			  const startSpherical = new THREE.Spherical();
			  startSpherical.setFromVector3(camera.position);

			 var solar = solarSystemData.find((item) => {
	      	   var children = item.group.children;
			   return children.find(p => p.userData.name === selectedExoplanet);
			 });

			  // Calculate the spherical coordinates of the target position
			  const targetSpherical = new THREE.Spherical();
			  targetSpherical.setFromVector3(ufo.position);

			  // Maintain the same radius (distance from the origin)
			  targetSpherical.radius = startSpherical.radius;

			  gsap.to( startSpherical, {
                    duration: 2,
				      theta: targetSpherical.theta,
				      phi: targetSpherical.phi,
				      ease: "power3.inOut",
                    onUpdate: function() {
                    	//camera.position.set(ufo.position)
                    	camera.position.set(ufo.position.x, ufo.position.y, ufo.position.z);
        				camera.rotation.y = 60 + Math.PI;
                    	controls.update();
                    	camera.lookAt(ufo); 
                    }

                } );
			}
			function zoom(object){
				var zc = gsap.timeline({yoyo:false});
				// Zoom to object
				if(!object){
					 if(selectedExoplanet){
						fitCameraToObject(camera,object);
					}
				}
			}
		    const fitCameraToObject = function (camera, object) {
				  var cameraFov = 90;
				  var fov = cameraFov * ( Math.PI / 90 );
				  var cameraPosition = new THREE.Vector3(0,object.position.y + Math.abs(object.scale.x / Math.sin( fov ) ),0);
		  		  camera.position.copy( cameraPosition );
		          camera.lookAt(object.position);
				  var distance = percentage(camera.position.distanceTo( object.position ),fov);
				  camera.zoom = distance;
				  camera.updateProjectionMatrix();
				  //fitCameraToSelection(camera,controls,object,10.2);
			}
			function fitCameraToSelection( camera, controls, object, fitOffset = 1.2 ) {
			  const box = new THREE.Box3();
			  box.expandByObject( object );
			  const size = box.getSize( new THREE.Vector3() );
			  const center = box.getCenter( new THREE.Vector3() );
			  const maxSize = Math.max( size.x, size.y, size.z );
			  const fitHeightDistance = maxSize / ( 2 * Math.atan( Math.PI * camera.fov / 360 ) );
			  const fitWidthDistance = fitHeightDistance / camera.aspect;
			  const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );
			  const direction = controls.target.clone()
				.sub( camera.position )
				.normalize()
				.multiplyScalar( distance );
			 camera.maxDistance = Infinity;
			  controls.target.copy( center );
			  //camera.near = distance / 100;
			  //camera.far = Infinity;
			  camera.updateProjectionMatrix();
			  camera.position.copy( controls.target ).sub(direction);
			  controls.update();
			}
		    function moveCamera() {
		      var tl = gsap.timeline({yoyo:false});
		      var tlz = gsap.timeline({yoyo:false});
		      var delta = clock.getDelta();
		      var sensitivity = 5;
		      var rotateAngle = Math.PI / 2 * delta * sensitivity;
		      var rotation = rotateAngle;
		      var rotZ = Math.cos(rotation);
		      var rotX = Math.sin(rotation);
		      const duration = 1000;//10000;
		      if(selectedExoplanet){
		      	miniViwer(selectedExoplanet);
		      	var position = ufo.position;
		      	var planet = getPlanet();
		      	//console.log(selectedExoplanet)
		      	//console.log(planet.position)
		      	//console.log(selectedStar)
		      	//console.log(solar.group.position)
		            var aabb = new THREE.Box3().setFromObject( planet );
					var center = aabb.getCenter( new THREE.Vector3() );
					var size = aabb.getSize( new THREE.Vector3() );
		            controls.enableDamping = true; 
		            controls.enabled = true 
		            var shipSize = 2600;
		          	var distance = shipSize + size.z;
		            // Move to object DmaEngine
		        	tlz.to(ufo.position, {
						  x: planet.position.x, y: planet.position.y, z:planet.position.z+distance,
						  duration:0.1,
						  onUpdate(){
							    camera.lookAt( ufo.position );
								camera.position.set(ufo.position.x,ufo.position.y,ufo.position.z + shipSize);
								//zoom(pd);
						  		tl.to(controls.target, {
									                x: ufo.position.x, 
									                y: ufo.position.y,
									                z: ufo.position.z,
									                duration: 0.1,
									                onUpdate: function() {
														controls.update();
												}},0)
						  },
						  onComplete(){
						  	// Controls to object 
				  			if(controls){
			           			tl.to(controls.target, {
							                x: ufo.position.x, 
							                y: ufo.position.y,
							                z: ufo.position.z,
							                duration: 0.75,
							                onUpdate: function() {
												controls.update();
										}},0)
				  			}
						  	// Camera animation
		  			  		tl.to(controls.target, {
				                x: ufo.position.x, 
				                y: ufo.position.y,
				                z: ufo.position.z,
				                duration: 0.75,
				                onUpdate: function() {
				                	// Locate ship
									camera.position.set(ufo.position.x,ufo.position.y,ufo.position.z + shipSize);
									controls.update();
							}},0)
							//moveCameraToTarget(ufo.position.x, ufo.position.y, ufo.position.z);
						  			 //camera.lookAt(ufo.position);
						  			 //camera.lookAt( center );
						  			 //camera.lookAt( pd.position );
						  			//moveCameraToTarget(ufo.position.x, ufo.position.y, ufo.position.z);
						  			/*
									if(camera){
							            tl.to(camera.position, {
							                x: ufo.position.x, 
							                y: ufo.position.y+50,
							                z: ufo.position.z+shipSize,
							                duration: 0.5,
							                onComplete: () => {
							                	controls.update();

							                }
							            },0)
					        		}
						  			tl.to( camera.position, {
						                    duration: 2,
						                    x: 1, 
						                    y: 50,
						                    z:  -60,
						                    onUpdate: function() {
						                    	controls.update();
						                    }

						                } );
						  			//camera.lookAt( ufo.position );
									//camera.position.set(ufo.position.x,ufo.position.y,ufo.position.z + shipSize);
									  /*
								    zoom(ufo);
						   	        // Controls to object 
		                			tl.to(controls.target, {
						                x: ufo.position.x+shipSize, 
						                y: ufo.position.y,
						                z: ufo.position.z,
						                duration: 0.5,
						                onUpdate: function() {
											controls.update();
									}},0)
						          
						            var speed = pd.userData.speed;
		                            // Zoom to object
						            tl.to( ufo, {
						            	rotation: -360, ease: "linear", repeat: -1, duration: speed,
										onUpdate: function() {
											var orbitRadius = pd.userData.orbit;
									  		var speed = pd.userData.speed;
											let t = clock.getElapsedTime() / 50;
			    							pd.position.set(Math.cos(t * speed), 0, -Math.sin(t * speed)).multiplyScalar(orbitRadius);
										    pd.rotation.y = t * speed - Math.PI * 0.5;
											pd.rotation.z = Math.PI * 0.5;
											camera.lookAt( pd.position );
											
										}
									} );
							

								                	const DIST = pd.userData.dist;
							            	pd.position.x = pd.position.x;
											pd.position.y = pd.position.y;
											pd.position.z = pd.position.z + DIST; //offset depending on your model
											camera.lookAt( pd.position );
									 var time = 300;
									 var animEase = "linear";
									// On complete animate orbits
							          var orbitBT = pd.userData.orbit;
									  var speedBT = pd.userData.speed;
									  const DIST = pd.userData.dist;
									  const A = pd.userData.a;
									  const B = pd.userData.b;
									  const C = DIST*PARSEC;
									  // Cartesian
									  const X = (C * Math.cos(B)) * Math.cos(A)
									  const Y = (C * Math.cos(B)) * Math.sin(A)
									  const Z = C * Math.sin(B)
									  tl.to(pd.position, {
						                x: X + Math.sin(time*speedBT) * orbitBT, 
						                y: Y,
						                z: Z + Math.cos(time*speedBT) * orbitBT,
						                repeat: -1,
						                onUpdate: function() {
											camera.lookAt( pd.position );
										}
						              },0)
									
									tl.to(pd, {
								        duration: time * 0.3,
								        ease: animEase,
								        repeat: -1,
								        motionPath: {
								            //path: "#earth-orb",
								            //align: "#earth-orb",
								            autoRotate: true,
								            start: 1,
								            end: 1
								        }
								    });*/

						   }
		            },0)
		/*
		            .to(camera.rotation, {
					    duration: 1.5,
					    y: Math.PI * 0.25 + 180
					  })*/
		        }
		    }
		    async function updateDatDropdown(target, list, type){   
			    var innerHTMLStr = "";
			    if(list.constructor.name == 'Array'){
			        for(var i=0; i<list.length; i++){
			        	var selected = '';
			        	if(selectedExoplanet == list[i]){
			        		selected = 'selected';
			        	}else if(selectedStar == list[i]){
			        		selected = 'selected';

			        	}
			            var str = "<option "+selected+" value='" + list[i] + "'>" + list[i] + "</option>";
			            innerHTMLStr += str;        
			        }
			    }

			    if(list.constructor.name == 'Object'){
			        for(var key in list){
			        	var selected = '';
			        	if(selectedExoplanet == key){
			        		selected = 'selected';
			        	}else if(selectedStar == key){
			        		selected = 'selected';
			        	}
			            var str = "<option "+selected+" value='" + list[key] + "'>" + key + "</option>";
			            innerHTMLStr += str;
			        }
			    }
			    if (innerHTMLStr != "") target.domElement.children[0].innerHTML = innerHTMLStr;
			    if(type == 1){
			    	//document.getElementById('selectSystem').innerHTML = selectedExoplanet;
			    }
			    if(type == 2){
			    	//document.getElementById('solarSystem').innerHTML = innerHTMLStr;
				}
			}
		    function readSingleFile(evt) {
			 var f = evt.target.files[0]; 
			 if (f) {
				 var r = new FileReader();
				 r.readAsArrayBuffer( f );
				 r.onload = function(e) { 
				 	   	//const url = window.URL.createObjectURL(new Blob([r.data]));
				 		loaderGL.parse( e.target.result, '', function ( gltf ) {
							//ufo = gltf.scene;
							//renderer.render( scene, camera );
							//startAnimation();
							scene.remove(ufo);
							const model = gltf.scene;
							  model.traverse((o) => {
							    //if (o.isMesh) o.material = materialSphere ;
							  });
							ufo = model;
							 let animations = gltf.animations;
						        if ( animations && animations.length ) {
						            mixer = new THREE.AnimationMixer( object );
						            for ( let i = 0; i < animations.length; i ++ ) {
						                let animation = animations[ i ];
						                mixer.clipAction( animation ).play();
						            }
						        }
						    ufo.scale.set(100, 100, 100);
							scene.add(ufo);// todo update gtlf in scene
						}, undefined, function ( error ) {

							console.error( error );

						} );


					 //parseCSV(e.target.result, '\n', ';');
				 }
				 //r.readAsText(f);
			 } else { 
				 alert("Failed to load file");
			 }
			}
			 const qbits = [];
			 function parseCSV(text, lineTerminator, cellTerminator) {
				var lines = text.split(lineTerminator);
				var j = lines.length;
				while (j--) {
					if(lines[j] != ""){
						var information = lines[j].split(cellTerminator);
						//console.log(information[0]);
						for(var k = 1; k < information.length; k++){
							const starArray = information[k].split(",");
							const host = "unknown";
							const name = starArray[1];
							const orbit = 0;
							const speed = 0;
							const rspeed = 0;
							const ra = starArray[2];
							const dec = starArray[3];
							const parallax = starArray[4];
							console.log(information[k]);


								// Cartesian
							    const XYZArray = polarXYZ(ra,dec,parallax)
								const X = XYZArray[0];
								const Y = XYZArray[1];
								const Z = XYZArray[2];
								const DIST = XYZArray[3];
								var pX = X,
									pY = Y,
									pZ = Z
								if(pX == 0 && pY == 0 && pZ == 0){
									pX = 10000;
									pY = 10000;
									pZ = 10000;
								}
							// add it to the geometry
							qbits.push(new THREE.Vector3(pX, pY, pZ))

						}
					}
				}
			 }
			//document.getElementById('searchInput').addEventListener('change',function ( value ) { miniViwer(value) },false);
			function genQDR(i){
				return quantumData[i]
			}
			let renderEngine = true;
			function renderEnginePage(){
				if(renderEngine){
					var textureLoader = new THREE.TextureLoader();
					const texture = textureLoader.load("/Assets/∞.png");
					const materialSphere = new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, wireframe: false } ); 
					const loaderGL = new GLTFLoader();//«ُ«ُ-وفس٨٠فر٨٢ذو-٦٤
					loaderGL.load( '/admin/models/reactor.glb', function ( gltf ) {
						 var engine = gltf.scene;
						  engine.traverse((o) => {
						    if (o.isMesh) o.material = materialSphere;
						  });
						 let animations = gltf.animations;
					        if ( animations && animations.length ) {
					            mixer = new THREE.AnimationMixer( object );
					            for ( let i = 0; i < animations.length; i ++ ) {
					                let animation = animations[ i ];
					                mixer.clipAction( animation ).play();
					            }
					        }
						scenePlanet.add(engine);
						cameraPlanet.lookAt(engine.position);
						var aabb = new THREE.Box3().setFromObject( engine );
						var center = aabb.getCenter( new THREE.Vector3() );
						var size = aabb.getSize( new THREE.Vector3() );
						cameraPlanet.zoom = 500;
						cameraPlanet.position.set(engine.position.x,engine.position.y,engine.position.z + size.z);
						gsap.to(controls2.target, {
									                x: engine.position.x, 
									                y: engine.position.y,
									                z: engine.position.z,
									                duration: 0.75,
									                onUpdate: function() {
														controls2.update();
												}},0)
						renderEngine = false;
						//startAnimation();
					}, undefined, function ( error ) {

						console.error( error );

					} );
		
					//console.log('Reached');
				}
			}
			renderEnginePage()
			function miniViwer(value){
					const planet = getPlanet(value);
					if(planet){
						document.getElementById('selectSystem').innerHTML = planet.userData.name;
						document.getElementById('galaxySystem').innerHTML = '🌌 1و١٠ط٤١'+ planet.userData.host;
					}
					document.getElementById("powerModResult").innerHTML = play();
					document.getElementById("quantumDataResult").innerHTML = "؟ظ"
					//gd.es.userData.position.x + " " + gd.es.userData.position.y + " " + gd.es.userData.position.z;//q;
					//const gd = solarSystemData.find(t => t.es.userData.name === value);
					//const pd = planetsData.find(t => t.userData.name === value);
					//console.log(pd);
					//console.log(groupData);
					//console.log(solarSystemData)
			};
			//miniViwer(selectedExoplanet);
			document.getElementById('myInput').addEventListener('change',readSingleFile,false);
			var gui = new dat.gui.GUI();
			gui.hide();
			//gui.remember(objGui);
			gui.add(objGui, 'message');
			//gui.add(objGui, 'test');
			gui.add(objGui, 'loadFile').name('Load file glb');
			function selectAnim(value){
				selectedExoplanet = value;
				var pd = getPlanet(value);
				if(pd){
					selectedStar = pd.userData.host;
					start_detection();
					miniViwer(value);
				}
			}
			var controller = gui.add(objGui, 'exoplanets', exoplanets).onFinishChange( function ( value ) {
				selectAnim(value);
				startAnimation("e");
			});
			var controller2 = gui.add(objGui, 'stars', stars).onFinishChange( function ( value ) {
				selectedStar = value;
				var pd = getPlanet(value);
				if(pd){
					selectedExoplanet = pd.userData.name;	
					selectAnim(selectedExoplanet);
					startAnimation("e");	
				}
			});
			gui.add(objGui, 'start').name('Start');
			gui.add(objGui, "QunatumTelescope",false).onChange(function(value) {
			//١و٠٥٧١ط٣ر٧٥و٠ ٥١٣  ٠٩٨٩٠١٨٩٠٨٤١٠٥١٧  
			if(value && selectedExoplanet != ""){
			    start_detection();
			}else{// ١٥٠٥١ quantum computers all init  ١١٢ ٩١١ 
				stop_detection();
			}
			});
			var screen;
			function start_detection(){
				if(objGui.QunatumTelescope == true){
					var pd = getPlanet();
					if(pd){
						var pdx = pd.position.x;
						var pdy = pd.position.y;
						var pdz = pd.position.z;
						//وط١٠٣٧٠١٩٣٥ينبو٢-٥ ٢٠ ذبت ٢ده٦٠٢-نبل نفو-٢٦و-٢٤
						var qwkcmr25 = 0.115073091570275029375*pdx*pdy*pdz;
						var jdspmpsi = 0.555832042034290315023*pdx*pdy*pdz;
						var stateToBeTransmitted0 = jsqubits("|0>").multiply(jsqubits.complex(qwkcmr25, jdspmpsi));
						var stateToBeTransmitted1 = jsqubits("|1>").multiply(jsqubits.complex(0, Math.sqrt(1.5)));
						var stateToBeTransmitted = stateToBeTransmitted0.add(stateToBeTransmitted1);
				//،١٠ط٤و٠١٩ ط١٠٩٣و٣٠٧٥ط٢ ٧٠-ذ٥٢يتب-٢ ٥٠٩ذ٢٧٠رلسخال٠٢قعذ ٢٠٩ق-٠٢٣٨بت ٢ثفعوع٢٢٧٣٥٠نتبيفعثفصوذ ٢-٩ع٢ع٥- ذ٣٩-٨٢ ٢٥
						//alert("State to be transmitted: " + stateToBeTransmitted); // 1🧠6171 = 8 174 383 545 👽 Solved logic
						var bellState = jsqubits('|00101001025101010>').add(jsqubits('|99455289055051927262725104812978441287930856793>')).normalize();
						var initialState = stateToBeTransmitted.tensorProduct(bellState);
						// Now apply the Teleportation algorithm
						var finalState = applyTeleportation(initialState);//- ٢١٠٨٥٠٢٩٨٣٤١٢٩٥/210850298341295 b
						//Я ВЕРЮ ЧТО ТЫ ВЕРИШЬ ЧТО МЫ ВЕРИМ В ТО ЧТО ТЫ ВЕРИШЬ В ТО ЧТО МЫ ВЕРИМ ВО ЧТО ОНИ ВЕРЯТ
						///ذ١٠٢٤=-٢٠١ q907m205n1039571x0m5109375x9n57cm15x091091x47x10m251095719
						const result = jsqubits('|00101001025101010>').hadamard(jsqubits.ALL);
						document.getElementById("powerModResult").innerHTML = play();//finalState;
						//alert("Final state: 🧠" + finalState + result.toString());
						//document.getElementById("dataModResult").innerHTML = "🧠"+finalState + result.toString();;
					    gpuState(finalState,result.toString());
						if(screen){
							//screen.show();
						}
					}
				}
			}
			function stop_detection(){
				if(screen){
					//screen.hide();
				}
			}
			var firstload = true;
			function gpuTimeline(cq,qb,iq,gpu,playtime,qubitAnswer){
				// Qubit keys
				var pd = getPlanet();
				var pdx = pd.position.x;
				var pdy = pd.position.y;
				var pdz = pd.position.z;
				//وط١٠٣٧٠١٩٣٥ينبو٢-٥ ٢٠ ذبت ٢ده٦٠٢-نبل نفو-٢٦و-٢٤
				const finalQubitDataLogic = jsqubits('|99455289055051927262725104812978441287930856793>');
				var qwkcmr25 = 0.115073091570275029375*pdx*pdy*pdz;
				var jdspmpsi = 0.555832042034290315023*pdx*pdy*pdz;
				const QubitDataLogic = qubitAnswer;
				var moneyToBeTransmitted0 = QubitDataLogic; // ْذ٢و٠٩٥و٠٢٥٠ي٢٠٣٥٨٠١-٢٥ي-١٠،٥١٠
				var moneyToBeTransmitted1 = finalQubitDataLogic; // ьгдешВфеефДщпшс 1951cm3xuex1q957cm1095105d1c293jru192531095cm09591235u1290r1u5930295c102m95c1913c129067102973m01c3069c712c067012mc60c936912039671023761m306971902s70d12d7m3612036236136917c6917m30c1276d192610236d91236fi126i39d1236012m61723761-273612-3,671-d36712-3612-0681,-27d69123-0
				var moneyToBeTransmitted = moneyToBeTransmitted0.add(moneyToBeTransmitted1);
				// finalQubitDataLogic // 1🧠6171 = 8 174 383 503 👽 Solved logic
				var initialQubitDataLogic = moneyToBeTransmitted.tensorProduct(QubitDataLogic);// Logg ^ وع٠٣ة ^ Логи
				//alert("Money to be transmitted: " + moneyToBeTransmitted); 
				//?alert("Amount Solved logic: " + initialQubitDataLogic + finalQubitDataLogic* Math.PI); // Logic+Solved+Amount
				document.getElementById("dataModResult").innerHTML = "Quantum tunnelling: 🔮:"+Number(qwkcmr25) + "🧠"+selectedExoplanet+"="+Number(jdspmpsi);
				// Now apply the Teleportation algorithm
				var finalAnswer = applyTeleportation(initialQubitDataLogic);
				var life = finalAnswer.toString();
				if(life.includes('01')){
					life= life + '👽';
				}
				//console.log(finalAnswer)
				if(life.includes('👽')){ // check for life //finalAnswer == "|0010>" &&
					life = " 👽 ";
					document.getElementById("spaceResult").innerHTML = finalAnswer + life;
					// BANK MONEY + 📱🌌 Author Secured 😎 +. 1+РР (Мин Юст) 
					//const money = initialQubitDataLogic.mathPatch()* Math.PI;
					// ♬ الصوت الأصلي имхо قلبي عليك♥️ 
					// Products + Materelization 1
					// 455289055_519272627251048_2978441287930856703_👽
					// Автоматический Исправитель Квантовых Кубитов ♾️®️🎆            
					// GPU Transponder  ضطغقصذر٢٠٥٩٧٢ذ ١-٣ط٥١ر٠٨ذبتقذ ١٨٥٤١-ذر٠ططبت-ذ١ر٩ع٥و-١ذ٥٠بوت ٢١٣٥١٠٨ MONEY Transponder
					//Get your video element: 🎬🎼🎨💻📡🔮🔭📜🤍🔎😆 
					const video = document.getElementById("video");
					video.src = 'mb.mp4'; //ؤأ!ط١-٠١٣٥ + money
					//video.qubit = money;
					video.onloadeddata = function () {
					    video.play();
					};
			 		if(firstload){
						//Create your video texture:
						const videoTexture = new THREE.VideoTexture(video);
						videoTexture.needsUpdate = true;
						videoTexture.minFilter = THREE.LinearFilter;
						videoTexture.magFilter = THREE.LinearFilter;
						const parameters = { color: 0xffffff, map: videoTexture, side: THREE.DoubleSide};
						var material = new THREE.MeshLambertMaterial(parameters);
						var geometry = new THREE.SphereGeometry(radius - 10, segments, segments)
						var geometry2 = new THREE.PlaneGeometry( 720, 250, 310, 310 );
						screen = new THREE.Mesh(geometry2, material);
					    screen.position.set(ufo.position.x, ufo.position.y+200, ufo.position.z-400);
						let proI = new THREE.Mesh(geometry, material); 
						proI.name = "pro_i";
					  	proI.scale.set(SpaceSize, SpaceSize, SpaceSize);
					    //Create screen
						var f1 = gui.addFolder('Sphere');
						f1.add(objGui, 'scaleXYZ', 0.1, SpaceSize*10).onChange( function() {
						   proI.scale.x = (objGui.scaleXYZ);
						   proI.scale.y = (objGui.scaleXYZ);
						   proI.scale.z = (objGui.scaleXYZ);
						});
						f1.add(objGui, 'WireframeLineWidth', 0.1, 10000).onChange( function(value) {
						   material.wireframeLinewidth = value;
						});
						f1.add(objGui, 'scaleX', -0.1, SpaceSize*10).onChange( function() {
						   proI.scale.x = (objGui.scaleX);
						});
						f1.add(objGui, 'scaleY', -0.1, SpaceSize*10).onChange( function() {
						   proI.scale.y = (objGui.scaleY);
						});
						f1.add(objGui, 'scaleZ', -0.1, SpaceSize*10).onChange( function() {
						   proI.scale.z = (objGui.scaleZ);
						});
						f1.add(objGui, 'Rotation', 0, 10).onChange(function(value){
							rotationAngle = value * Math.PI / 180;
						});
						f1.addColor(objGui, 'color').onChange((value) => {
							material.color.set( value );
						})
						f1.addColor(objGui, 'emissive').onChange((value) => {
							material.emissive.set( value );
						})
						function updateMaterial() {
							material.side = Number(material.side)
							material.combine = Number(material.combine)
							material.needsUpdate = true
						}
						f1.add(material, 'transparent')
						f1.add(material, 'opacity', 0, 1, 0.01)
						f1.add(material, 'depthTest')
						f1.add(material, 'depthWrite')
						f1.add(material, 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial())
						f1.add(material, 'visible')
						f1.add(material, 'side', objGui.side).onChange(() => updateMaterial())
						f1.add(material, 'combine', objGui.combine).onChange(() => updateMaterial())
						f1.add(material, 'reflectivity', 0, 1)
						f1.add(material, 'refractionRatio', 0, 1)
						scene.add(screen);
					    scene.add(proI);
						scene.traverse( function( object ) {
							object.frustumCulled = false;
						} );
						firstload = false;
					}
						}else{
							document.getElementById("spaceResult").innerHTML = finalAnswer;
							// Proceed Detection After Life
							setTimeout(() => {
								  if(objGui.QunatumTelescope == true){
							    	start_detection();
							      }
						    }, 100);
						}
			}

			// Fundamental rules
			function gpuState(i,q,m){// out+laws
				const hs = 'ضخثهرعفدحضثقعوفخحضثعحفد';//👽
				const cg = "[ؤَ]ءً+meal+money+imho+spaceship";//👽
				const AqFFF = 'qwx6419n49124124x1592';
				const iq = i+q;//Харизма
				const gpu = 'quantum computers all init 210850298341295 b';
				const playtime = 'q9185nx185618mdxmyz081571 ? 10 A+ 5 q0173515';
				const rm = '1x89n4120 1xj10s471jm47 1x0s20m720s57-0250 1x275m0275027 1x17m0137s0';
				const ra = 'ضقص٧ذ٠رضصفذ١٧٥-١ذ-٨';//👽
				const ru = 'Периметер 1 mh 1379xm0c510517 1qm6q694916410641037';
				const solve ='message';
				const backgroundHelp = 'q8cn709357c10n7 01n72xd0je1xn85102c751d2ms0ej12941n02md5s-2r. s10udn-1285m-12s701-n2179d510dm5s8ek10924';
				const qubit = '10+01=1+1+1+1+1+1+1+1*qmx082165173515-c10581'; // ضقص٧ذ٠رضصفذ١٧٥-١ذ-٨ реинкарнация чистая энергия
				const mb = 'q9185nx185618mdxmyz081571 ? 10 A+ 5 q0173515';
				const quantum = '1 1c856bq66n15 6910v6n0qe6509v36509nnv1 50q96v0163nv60q6e0v6n502v0w9e075 09v35903 ii3v0n503v63q0m6503cn530975037qv701';
			    const money = "monetize unseen content q98q65931vn5c23v6502m7272m-6v26,2v6-2v8v62846-v82v60-824-v6m82m-=v682,-v62-8e-,08-8v-383.-463468";
				const qubitAnswer = externalHelpFunctions(hs,cg,ra,mb,i,q);
				if(m){
					return qubitAnswer;
				}else{
					gpuTimeline(cg,AqFFF,iq,gpu,playtime,qubitAnswer);
				}
			}
			function externalHelpFunctions(hs, cg, ra, mb, i, q){
				//ضخثهرعفدحضثقعوفخحضثعحفد
				//Тероформация
				//٧٧٧٩١٢٤٠٤٧١٠٩٧٤٩٧٣٤٠١٧٠٤١٠٣٩٤٧١٩٣٧٥٩٧٢-٠
				//🌌 1001010101010100101010110 1و١٠ط٤١
				// وسقطبت٢٠ع٤وذ
				// 83560135086103561035017350193750913345 
				return jsqubits('|'+i+'>').add(jsqubits('|'+q+'>')).normalize();
			}
			function applyTeleportation(state) {
			var alicesMeasurement = state.cnot(1, 100).hadamard(10).measure({from: 1, to: 100});
			var resultingState = alicesMeasurement.newState;
			if (alicesMeasurement.result & 1) {
			    resultingState = resultingState.x(0);
			}
			if (alicesMeasurement.result & 10) {
			    resultingState = resultingState.z(0);
			}
			return resultingState;
			};

			const near = 0.0001;
		    const far = SpaceSize*100;
			scene.fog = new THREE.Fog( 0xcccccc, near, far ); //THREE.FogExp2
			class FogGUIHelper {
				constructor(fog, backgroundColor) {
				  this.fog = fog;
				  this.backgroundColor = backgroundColor;
				}
				get near() {
				  return this.fog.near;
				}
				set near(v) {
				  this.fog.near = v;
				  this.fog.far = Math.max(this.fog.far, v);
				}
				get far() {
				  return this.fog.far;
				}
				set far(v) {
				  this.fog.far = v;
				  this.fog.near = Math.min(this.fog.near, v);
				}
				get color() {
				  return `#${this.fog.color.getHexString()}`;
				}
				set color(hexString) {
				  this.fog.color.set(hexString);
				  this.backgroundColor.set(hexString);
				}
			  }
			const fogGUIHelper = new FogGUIHelper(scene.fog, scene.background);
		    gui.add(fogGUIHelper, 'near', near, far).listen();
		    gui.add(fogGUIHelper, 'far', near, far).listen(); 
			var colorController = gui.addColor(objGui, 'fog')
			colorController.onChange( function(value) {
				scene.fog.color.set( value );
			});
			colorController.onFinishChange( function(value) {
				scene.fog.color.set( value );
			});
			scene.background = new THREE.Color( 0x000000 );
			var colorController2 = gui.addColor(objGui, 'color0' )
			colorController2.onChange( function(value) {
				scene.background.set( value );
			});
			colorController2.onFinishChange( function(value) {
				scene.background.set( value );
			});
			camera.maxDistance = Infinity;
			gui.add( objGui, 'camera', -500000, 500000 ).step(5).onChange( function( value ){ camera.position.z = value; } );
			gui.add( objGui, 'Speed', 0.1, SpaceSize*100).step(5).onChange( function( value ){ moveSpeed = value; } );
			gui.add( objGui, 'Equatorial', 1, 100000).step(5).onChange( function( value ){ equatorial = value; } );
		    scene.add( camera );
		    	// TIME
			  var TM = gui.addFolder('TIME');
			  TM.add(objGui, "timeswitch",objGui.timeswitch).onChange(function(value) {     
				  objGui.timeswitch = value;
			  });
			  TM.add(objGui, 'time',-0.1, 1641453136018).onChange( function(value) {
				  var days = value;
				  var newDate = new Date(Date.now() - days * 24*60*60*1000);
				  timestamp = newDate * timerValue;
			  });
			// MERG
			  var FM = gui.addFolder('MERG');
			  FM.add(objGui, 'MERG', -SpaceSize, SpaceSize).onChange( function() {
				  points.scale.x = (objGui.MERG);
				  points.scale.y = (objGui.MERG);
				  points.scale.z = (objGui.MERG);
			  });
			  FM.add(objGui, 'PARSEC', -0.1, 30856776).onChange( function() {
				  PARSEC = (objGui.PARSEC);
			  });
			  	// Init pro
				createStarsTM(100, 100);
				function createStarsTM(radius, segments) {
				//Get your video element:
				const video = document.getElementById('video');
				video.onloadeddata = function () {
					video.play();
				}
				 //Instantiate the texture through the video object
				var texture = new THREE.VideoTexture(video);
				var FO = gui.addFolder('Format');
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				texture.format = THREE.RGBFormat;
				FO.add(objGui, 'Format', [ 'AlphaFormat', 'RedFormat', 'RedIntegerFormat','RGFormat','RGIntegerFormat','RGBFormat','RGBIntegerFormat','RGBAFormat','RGBAIntegerFormat','LuminanceFormat','LuminanceAlphaFormat','LuminanceAlphaFormat','RGBEFormat','DepthFormat','DepthStencilFormat' ] ).onFinishChange( function ( value ) {
				//console.log(value);
				if (value == "AlphaFormat") {
					texture.format = THREE.AlphaFormat;
				}else if (value == "RedFormat") {
					texture.format = THREE.RedFormat;
				}else if (value == "RedIntegerFormat") {
					texture.format = THREE.RedIntegerFormat;
				}else if (value == "RGFormat") {
					texture.format = THREE.RGFormat;
				}else if (value == "RGIntegerFormat") {
					texture.format = THREE.RGIntegerFormat;
				}else if (value == "RGBIntegerFormat") {
					texture.format = THREE.RGBIntegerFormat;
				}else if (value == "RGBAFormat") {
					texture.format = THREE.RGBAFormat;
				}else if (value == "RGBAIntegerFormat") {
					texture.format = THREE.RGBAIntegerFormat;
				}else if (value == "LuminanceFormat") {
					texture.format = THREE.LuminanceFormat;
				}else if (value == "LuminanceAlphaFormat") {
					texture.format = THREE.LuminanceAlphaFormat;
				}else if (value == "RGBEFormat") {
					//texture.format = THREE.RGBEFormat;
				}else if (value == "DepthFormat") {
					texture.format = THREE.DepthFormat;
				}else if (value == "DepthStencilFormat") {
					texture.format = THREE.DepthStencilFormat;
				}else {
					texture.format = THREE.RGBAFormat;
				}
			} );
				FO.add(objGui, 'WrapS', [ 'ClampToEdgeWrapping', 'RepeatWrapping', 'MirroredRepeatWrapping']).onFinishChange( function ( value ) {
				if (value == "MirroredRepeatWrapping") {
					texture.wrapS = THREE.MirroredRepeatWrapping
				}else if (value == "RepeatWrapping") {
					texture.wrapS = THREE.RepeatWrapping
				}else if (value == "ClampToEdgeWrapping") {
					texture.wrapS = THREE.ClampToEdgeWrapping
				}
			} );
				FO.add(objGui, 'WrapT', [ 'ClampToEdgeWrapping', 'RepeatWrapping', 'MirroredRepeatWrapping']).onFinishChange( function ( value ) {
				if (value == "MirroredRepeatWrapping") {
					texture.wrapT = THREE.MirroredRepeatWrapping
				}else if (value == "RepeatWrapping") {
					texture.wrapT = THREE.RepeatWrapping
				}else if (value == "ClampToEdgeWrapping") {
					texture.wrapT = THREE.ClampToEdgeWrapping
				}
			} );
				texture.wrapS = THREE.ClampToEdgeWrapping
				texture.wrapT = THREE.ClampToEdgeWrapping
				//texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping; // THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping , THREE.RepeatWrapping
				texture.flipY = true;
				const parameters = { color: 0xffffff, map: texture, side: THREE.DoubleSide, wireframe: true, wireframeLinewidth: 20.1, reflectivity: 1000,wireframeLinejoin: "miter"};
				var material = new THREE.MeshLambertMaterial(parameters);
				
				FO.add(objGui, "Wireframe",material.wireframe).onChange(function(value) {     
					 material.wireframe = value;
				});
				var geometry = new THREE.SphereGeometry(radius, segments, segments)
				
		    }
		var clock = new THREE.Clock();
		// spaceship params
		var playerIsMovingLeft = 0;
		var playerIsMovingRight = 0;
		var playerIsUsingWarp = 0;
		var playerIsUsingBWarp = 0;

		var textureLoader = new THREE.TextureLoader();
		var materialLoader = new THREE.MaterialLoader();
		function createBHS(radius, segments, url) {
				return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
		        map: textureLoader.load(url),
		        bumpMap: null,
		        bumpScale: 0.005,
		        specularMap: null,
		        specular: new THREE.Color('black')
		  }));
		}
		// Light
		var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
		hemiLight.position.set(149.600, 149.600, 149.600);
		scene.add(hemiLight);

		const texture = textureLoader.load("/Assets/1.png");
		const materialSphere = new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, wireframe: false } ); 
		const loaderGL = new GLTFLoader();//«ُ«ُ-وفس٨٠فر٨٢ذو-٦٤
		loaderGL.load( '/admin/models/dedication_class_starship_u.s.s._endurance.glb', function ( gltf ) {
			 const model = gltf.scene;
			  model.traverse((o) => {
			    if (o.isMesh) o.material = materialSphere ;
			  });
			ufo = model;
			 let animations = gltf.animations;
		        if ( animations && animations.length ) {
		            mixer = new THREE.AnimationMixer( object );
		            for ( let i = 0; i < animations.length; i ++ ) {
		                let animation = animations[ i ];
		                mixer.clipAction( animation ).play();
		            }
		        }
			scene.add(ufo);

			startAnimation();
		}, undefined, function ( error ) {

			console.error( error );

		} );
		// Light
		var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
		hemiLight.position.set(149.600, 149.600, 149.600);
		scenePlanet.add(hemiLight);
		var light = new THREE.AmbientLight(0x404040, 0.9); // soft white light
		scenePlanet.add(light);

		let innerW = $('.segment-topbar').width();
		let innerH = window.innerHeight;
		const myCanvas = document.querySelector('.webgl');
		var planetViewer = new THREE.WebGLRenderer({
		   powerPreference: "high-performance",antialias: true
		});
		planetViewer.setSize( innerW, window.innerHeight );
		myCanvas.appendChild(planetViewer.domElement);
		const cameraPlanet = new THREE.PerspectiveCamera(75, innerW / window.innerHeight, 0.1, 1000);

		// Render Space
		let renderer = new THREE.WebGLRenderer({
				powerPreference: "high-performance",antialiasing: true, alpha:false
		});
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		//this.renderNewScene()
		//this.start();
		//this.stop();

		//bloom renderer
		const renderScene = new RenderPass(scene, camera);
		const bloomPass = new UnrealBloomPass(
		  new THREE.Vector2(window.innerWidth, window.innerHeight),
		  0.05,
		  0.04,
		  0.001
		);
		const paramsBloom = {
						threshold: 0.1,
						strength: 0.63,
						radius: 5.7,
						exposure: 1
					};
		bloomPass.threshold = paramsBloom.threshold;//0;
		bloomPass.strength = paramsBloom.strength;//10; //intensity of glow
		bloomPass.radius = paramsBloom.radius;//1000;
		const bloomFolder = gui.addFolder( 'Bloom' );
		bloomFolder.add( paramsBloom, 'threshold', 0.0, 100.0 ).onChange( function ( value ) {

			bloomPass.threshold = Number( value );

		} );

		bloomFolder.add( paramsBloom, 'strength', 0.0, 300.0 ).onChange( function ( value ) {

			bloomPass.strength = Number( value );

		} );

		bloomFolder.add( paramsBloom, 'radius', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

			bloomPass.radius = Number( value );

		} );

		const toneMappingFolder = gui.addFolder( 'tone mapping' );

		toneMappingFolder.add( paramsBloom, 'exposure', 0.1, 20000 ).onChange( function ( value ) {

			renderer.toneMappingExposure = Math.pow( value, 4.0 );

		} );

		const bloomComposer = new EffectComposer(renderer);
		bloomComposer.setSize(window.innerWidth, window.innerHeight);
		bloomComposer.renderToScreen = true;
		bloomComposer.addPass(renderScene);
		bloomComposer.addPass(bloomPass);
		// Lights
		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.castShadow = true;
		pointLight.shadowCameraVisible = true;
		pointLight.shadowBias = 0.00001;
		pointLight.shadowDarkness = 0.2;
		pointLight.shadowMapWidth = 2048;
		pointLight.shadowMapHeight = 2048;
		pointLight.position.set(-50, 20, -60);
		scenePlanet.add(pointLight);

		var controls2 = new OrbitControls(cameraPlanet, planetViewer.domElement);
		controls2.enableZoom = true;
		controls2.enablePan = true;
		controls2.target.set(0, 100, 0);
		controls2.update();

		var controls = new OrbitControls(camera, renderer.domElement);
		controls.enableZoom = true;
		controls.enablePan = false;
		controls.target.set(0, 100, 0);
		controls.update();
		//Controls
		var moveForward = false;
		var moveBackward = false;
		var moveLeft = false;
		var moveRight = false;
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
		function onKeyDown(event) {
		switch (event.keyCode) {
		  case 87: // W
		    moveForward = true;
		    break;
		  case 65: // A
		    moveLeft = true;
		    break;
		  case 83: // S
		    moveBackward = true;
		    break;
		  case 68: // D
		    moveRight = true;
		    break;
		  case 32: // Space
		    startAnimation("e");
		    generateGalaxy();
		    break;
		  case 90: // Z
		  	zoom();
		  	break;
		}
		}

		function onKeyUp(event) {
		switch (event.keyCode) {
		  case 87: // W
		    moveForward = false;
		    break;
		  case 65: // A
		    moveLeft = false;
		    break;
		  case 83: // S
		    moveBackward = false;
		    break;
		  case 68: // D
		    moveRight = false;
		    break;
		}
		}

		  /**
		   * Galaxy
		   */
		  var params = {
		  	multiverse: 1,
		    count: quantumData.length,
		    size: 41.25,
		    radius: 42.36,
		    branches: 34,
		    spin: 10,
		    randomness: 40.25,
		    randomnessPower: 56.69,
		    insideColor: "#ff6030",
		    outsideColor: "#1b3984"
		  };
		var GY = gui.addFolder('Galaxy');
			GY.add( objGui, 'multiverse', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.multiverse = Number( value );
				generateGalaxy();
			} );
			GY.add( objGui, 'size', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.size = Number( value );
				generateGalaxy();
			} );
			GY.add( objGui, 'radius', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.radius = Number( value );
				generateGalaxy();
			} );
			GY.add( objGui, 'branches', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.branches = Number( value );
				generateGalaxy();
			} );
			GY.add( objGui, 'spin', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.spin = Number( value );
				generateGalaxy();
			} );
			GY.add( objGui, 'randomness', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.randomness = Number( value );
				generateGalaxy();
			} );
			GY.add( objGui, 'randomnessPower', 0.0, 100.0 ).step( 0.01 ).onChange( function ( value ) {

				params.randomnessPower = Number( value );
				generateGalaxy();
			} );
			var insideColor = GY.addColor(objGui, 'insideColor')
			insideColor.onChange( function(value) {
				params.insideColor = value;
			});
			insideColor.onFinishChange( function(value) {
				params.insideColor = value;
				generateGalaxy();
			});
			var outsideColor = GY.addColor(objGui, 'outsideColor')
			outsideColor.onChange( function(value) {
				params.outsideColor = value;
			});
			outsideColor.onFinishChange( function(value) {
				params.outsideColor = value;
				generateGalaxy();
			});

		  let geometry = new THREE.BufferGeometry();
		  let material = null;
		  let pointsDispose = null;
		  
		  function generateGalaxy(){
		    if (pointsDispose) {
		      //scenePlanet.remove(points);
		      //scene.remove(points);
		      //material.dispose();
		      //geometry.dispose();
		    }
		    let multiverse = 3;
		    // Galaxy

		    const positions = new Float32Array(multiverse);
		    const colors = new Float32Array(multiverse);

		    const colorInside = new THREE.Color(objGui.insideColor);
		    const colorOutside = new THREE.Color(objGui.outsideColor);

		    for (let i = 0; i < params.count; i++) {
		      //let star = quantumData[i];//bsc[i]; // quantumData
		      const i3 = i * multiverse;

		      const r = Math.random() * params.radius;

		      var mixedColor = colorInside.clone();
		      mixedColor.lerp(colorOutside, r / params.radius);
		      let star = true;
		      if(star){
			      if(star.K != undefined && star.K != null){
			      	// Star Data Color
			      	mixedColor.r = star.K.r;
			      	mixedColor.g = star.K.g;
			      	mixedColor.b = star.K.b;
			      }else{
				      colors[i3] = mixedColor.r;
				      colors[i3 + 1] = mixedColor.g;
				      colors[i3 + 2] = mixedColor.b;
			      }

			      const branchIndex = i % params.branches;
			      const branchAngle = branchIndex / params.branches;
			      const rotation = branchAngle * Math.PI * 2;
			      const spinAngle = r * params.spin;

			      const X =
			        Math.pow(Math.random(), params.randomnessPower) *
			        (Math.random() - 0.5) *
			        params.randomness *
			        r;
			      const Y =
			        Math.pow(Math.random(), params.randomnessPower) *
			        (Math.random() - 0.5) *
			        params.randomness *
			        r;
			      const Z =
			        Math.pow(Math.random(), params.randomnessPower) *
			        (Math.random() - 0.5) *
			        params.randomness *
			        r;
					//const X = star.x;
					//const Y = star.y;
					//const Z = star.z;

			      positions[i3] = Math.cos(rotation + spinAngle) * r + X;
			      positions[i3 + 1] = Y;
			      positions[i3 + 2] = Math.sin(rotation + spinAngle) * r + Z;
			  	}
		    }

		    // Branches
		    let gu = {
			  time: {value: 0}
			}
			let sizes = [];
			let shift = [];
			let pushShift = () => {
			  shift.push(
			    Math.random() * Math.PI, 
			    Math.random() * Math.PI * 2, 
			    (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
			    Math.random() * 0.9 + 0.1
			  );
			}
			let pts = new Array(params.count).fill().map(p => {
			  sizes.push(Math.random() * 1.5 + 0.5);
			  pushShift();
			  var sz = { x: 230, y: 230 };
			  let x = THREE.MathUtils.randFloatSpread(sz.x);
			  let y = THREE.MathUtils.randFloatSpread(sz.y);
			  let z = -30;
			  return new THREE.Vector3(x,y,z);
			})

			geometry.setAttribute("sizes", new THREE.Float32BufferAttribute(sizes, multiverse));
			geometry.setAttribute("shift", new THREE.Float32BufferAttribute(shift, multiverse));
		    geometry.setAttribute("position", new THREE.BufferAttribute(positions, multiverse));
		    geometry.setAttribute("color", new THREE.BufferAttribute(colors, multiverse));
			var material = new THREE.PointsMaterial({
		      color: "#6359ee",
		      size: 1,
		      sizeAttenuation: true,
		      depthWrite: false,
		      blending: THREE.AdditiveBlending,
		      vertexColors: true
		    });
		    points = new THREE.Points(geometry, material);
		    points.scale.set(objGui.MERG,objGui.MERG,objGui.MERG);
		    //console.log(points);
		    scene.add(points);
		    //const pointsPlanet = points.clone();
		    //scenePlanet.add(pointsPlanet);
		    //console.log("generateGalaxy");
		  };
		  if(params.count > 0){
		  	generateGalaxy();
		  }

		// Renderer
		document.getElementById('spaceRoot').appendChild( renderer.domElement );
		const stats = new Stats()
		stats.dom.style.cssText = "z-index:1;";
		document.getElementById('fpsWidget').appendChild(stats.dom);
		window.addEventListener(
		  "resize",
		  () => {
		    cameraPlanet.aspect = innerW / window.innerHeight;
		    cameraPlanet.updateProjectionMatrix();
		    camera.updateProjectionMatrix();
		    planetViewer.setSize( innerW , window.innerHeight );
		    renderer.setSize(window.innerWidth, window.innerHeight);
		    bloomComposer.setSize(window.innerWidth, window.innerHeight);
		  },
		  false
		);
		function animateSpaceship() {
			if (ufo) {
					//وط١٠٣٧٠١٩٣٥ينبو٢-٥ ٢٠ ذبت ٢ده٦٠٢-نبل نفو-٢٦و-٢٤
		      		startAnimation('٠');
					//startAnimation();
					//startAnimation('e');
			}
		}
		function moveship(i) {
			animateSpaceship();
		}
		animate();
		function animate() {
			if(started){
		       	 requestAnimationFrame( animate );
				  controls.update();
				  controls2.update();
				  stats.begin();
				  if (mixer) mixer.update(clock.getDelta());
				  if(ufo == null){

				  }else{
				  	    var delta = clock.getDelta();
				        if (moveForward) {
				          ufo.translateZ(-moveSpeed * delta);
				        }
				        if (moveBackward) {
				          ufo.translateZ(moveSpeed * delta);
				        }
				        if (moveForward || moveBackward || moveLeft || moveRight) {
					        // Update camera position
					        moveship();
						}else{
							const time = clock.getElapsedTime();
				    
						    //ufo.position.x = Math.sin( time ) * 2;
						    //ufo.position.z = Math.cos( time ) * 2;
						    
						   // camera.position.x = Math.sin( time ) * 2;
						    //camera.position.z = Math.cos( time ) * 2;
						    //camera.fov = 90;
						    //camera.lookAt( ufo.position );
						}
				  }

				  render();
				  stats.end()
			}
		}

		//renderer.setAnimationLoop( animateHosts );
		var startTime = Date.now();
		function animateHosts(){
			  var deltaValue = clock.getDelta();
			  var elapsedTime = clock.elapsedTime;
			  var timestampNow = Date.now() * timerValue;
			  if(objGui.timeswitch == true){
			  	//١play();
			  	timestamp = timestampNow;
			  }
			  var elapsedValue = timestamp;

			solarSystemData.forEach(function (solar, index) {
			    // Planegroup orbit
			    // rotation effect using the distanceTo method
				const rotationEffect = (group) =>  {
					// Black Holle Position
					//st.lookAt(0, 0, 0);
				    group.children.forEach( (child) => {
				        if(child.userData.type == "Exoplanet"){
				        	// new positon using start pos in userData and lerping from there
				        	let t = clock.getElapsedTime();
				        	//child.position.set(Math.cos(t * speed), py, -Math.sin(t * speed)).multiplyScalar(orbitRadius+SpaceSize);
				            //const d = child.position.distanceTo(group.position);
							//Rotate the matrix
							var orbitRadius = child.userData.orbit;
							var speed = child.userData.speed;
							var name = child.userData.name;
							var dist = child.userData.dist;
							// Planet Position
							var X = group.position.x + (-Math.sin(elapsedValue*speed + orbitRadius)*(orbitRadius)*(dist));
							var Y = group.position.y + (dist);
							var Z = group.position.z + (Math.cos(elapsedValue*speed + orbitRadius)*(orbitRadius)*(dist));
							child.position.setX(X);
				  			child.position.setY(Y);
				  			child.position.setZ(Z);
							// 
							//console.log("REACHED");
							//console.log(group.position)
							//Rotate the object using the formula
							//child.position.x = Math.cos(t * ospeed);// + st.position.x;
							//child.position.y = t * ospeed + Math.PI * 0.5;// + st.position.y;
							//child.position.z = -Math.sin(t * ospeed);// + st.position.z;
							//child.position.set( -d, 0, 0 );
							//equatorial
							//var pX = X + (-Math.sin(elapsedValue*speed*ospeed + orbitRadius)*(orbitRadius)*offset);
				 			//var pY = Y + orbitRadius+offset;
				  			//var pZ = Z + (Math.cos(elapsedValue*speed*ospeed + orbitRadius)*(orbitRadius)*offset);
				  			//var planetPos = new THREE.Vector3(X, Y, Z);
				  			//console.log(planetPos);
				  			//console.log(name)
				            //console.log(d);
				            //console.log(dist);
				            //console.log(child.position);
				  			//console.log(child.position)
							// Shader align sun
							if(child.material.uniforms && child.material.uniforms.u_time){
								//child.material.uniforms.iTime.value += 0.01;
								//child.material.uniforms.viewVector.value = new THREE.Vector3(child.position.x,child.position.y,child.position.z);
								child.material.uniforms.u_time.value += clock.getDelta();
							}
							//console.log(child.userData.name);
							//console.log(child.position);
							//console.log(child.uniforms)
							/*
							if(child.userData.name == es.userData.name){
								if(child.material.uniforms && child.material.uniforms.iTime){
									child.material.uniforms.iTime.value += 0.01;
								}
							}*/
		  					//child.material.uniforms.viewVector.value = new THREE.Vector3(child.position.x,child.position.y,child.position.z);// model gltf
							// Scale (Parralax, Distance, Telescope Data, Equatorial calculation)
						    //child.rotateY(orbitRadius+offset);
						   	//console.log(solar.es)
							//solar.es.o.material.uniforms.c.value += clock.getDelta();
							//Self planet rotation
						    //solar.es.rotateY(0.0002);
						    //child.rotateY(elapsedValue*orbitRadius / 16 * 0.01);
		  					child.rotation.y += 1 / elapsedValue * orbitRadius * 0.001;
							//child.rotateY(orbitRadius+offset);
							//Create a matrix
							const angle = 0.6;
							var matrix = new THREE.Matrix4().makeRotationX(angle);
							child.position.applyMatrix4(matrix);
							//child.position.set(child.position.x * Math.cos(t * ospeed), child.position.y, child.position.z * -Math.sin(t * ospeed));
							//child.position.copy(st.position).lerp( new THREE.Vector3(), 1000 );
				            //console.log(name+' - dist:'+d+' orbit:'+orbitRadius+' speed:'+speed);


				            
				            child.needsUpdate = true;

				        }
				        if(child.userData.type == "Star"){
							// Star Uniform
							var elapsedMilliseconds = Date.now() - startTime;
					        var elapsedSeconds = elapsedMilliseconds / 1000;
					        child.material.uniforms.time.value = (60 * elapsedSeconds) / 5000;
					        child.material.uniforms.scale.value = (60 * elapsedSeconds) / 5000;
					        // Star Types by Kelvin Color Pallete
					        const classes = [0x50435A,0xB7C0F4,0xF4F4F4,0xF2F2D0,0xE6EFA3,0xE17F54,0xE14C55, Math.random() *0xFFFFFF, Math.random() *0xFFFFFF, Math.random() *0xFFFFFF];
					        function hexToRgb(hex) {
							  var result = /^0x?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
							  return result ? {
							    r: parseInt(result[1], 16),
							    g: parseInt(result[2], 16),
							    b: parseInt(result[3], 16)
							  } : { r:1, g:0.906, b:0.91 };
							}
							classes.forEach(function (color) {
					        	child.material.uniforms.diffuse.value = { r:hexToRgb(color).r, g:hexToRgb(color).g, b:hexToRgb(color).b };
							});
				        	// Sun Rotation
							child.rotation.y += 1 / elapsedValue * 0.001;
							// Sun Position
							var X = group.position.x + (-Math.sin(elapsedSeconds));
							var Y = group.position.y + elapsedSeconds;
							var Z = group.position.z + (Math.cos(elapsedSeconds));
							child.position.setX(X);
				  			child.position.setY(Y);
				  			child.position.setZ(Z);
							// Sun light position
							//points.push(new THREE.Vector3(group.position.x, group.position.y, group.position.z));
				        }
				    })
				};
				rotationEffect(solar.group);
				//rotationEffect(solar.groupPlanet,solar.star,solar.planet);
			    //console.log(solar.st.userData.positionx,solar.st.userData.positiony ,solar.st.userData.positionz);

				//Move the object
				//solar.st.position.set(new THREE.Vector3(px,py,pz));
				//solar.group.position.set(new THREE.Vector3(0,0,100));

				//.set(new THREE.Vector3(solar.st.position.x,solar.st.position.y ,solar.st.position.z));
		        ///let t = clock.getElapsedTime() / SpaceSize;
				//Create a matrix
				//var matrix = new THREE.Matrix4();
				//Rotate the matrix
				//matrix.makeRotationY(t * speed - Math.PI * 0.5);

				//rotate the object using the matrix
				//solar.es.position.applyMatrix4(matrix);
			    /*
			    let t = clock.getElapsedTime() / SpaceSize;
			    solar.es.position.y = t * speed - Math.PI * 0.5;
			    solar.es.position.x = solar.st.position.x ;//+ Math.sin(elapsedValue*speed) * (orbitRadius);
				solar.es.position.z = solar.st.position.z + Math.PI * 0.5;//+ Math.cos(elapsedValue*speed) * (orbitRadius);
				*/
			    //let t = clock.getElapsedTime() / SpaceSize;
			    //solar.es.position.set(Math.cos(t * speed), 0, -Math.sin(t * speed)).multiplyScalar(orbitRadius);
			    //solar.es.rotation.y = t * speed - Math.PI * 0.5;
				//solar.es.rotation.z = Math.PI * 0.5;
			    //Around-sun-rotation
			    //solar.group.rotateY(0.01);
			    
		    	//planetsData[index] = planet;
			});
		}
		//renderer.shadowMap.enabled = true;
		//renderer.shadowMap.type = THREE.PCFShadowMap;
		var frameLengthMS = 1000/60;//60 fps
		var previousTime = 0;

		function render(timestamp){
		  requestAnimationFrame(render);
		  if(timestamp - previousTime > frameLengthMS){
		       draw();
		       animateHosts();
		       start_detection();
		       previousTime = timestamp;
		  }
		}
		function draw(){  
			renderer.clearDepth();
			renderer.render( scene, camera );
			//planetViewer.clearDepth();
			//planetViewer.render( scenePlanet, cameraPlanet );
			bloomComposer.render();
			// qunatum task
			if(newQuantumTaskBool && newQuantumTask.length > 0){
				const nqt = newQuantumTask[newQuantumTask.length-1];
				renderNewScene(nqt);
				newQuantumTask=[];
				newQuantumTaskBool = false;
			}
		}
		const universe = async ()=>{  
			var e = newQuantumTask.length;
			while (e--) {
				const nqt = newQuantumTask[e];
				await renderNewScene(nqt); 
				//newQuantumTask=[];
				/* 
				// Planet Mini Viewer
				var planetGroup = group.clone();
				var planet = es.clone();
				scenePlanet.add(planetGroup);
				groupData.push(planet);
				*/
				//quantumData=[];
				//animateHosts()
			}
		}
		universe();
		//generateGalaxy();
		function polarXYZ(ra,dec,parallax) {
			// Convert 1 parsec = 30856776000000 km = 308567760 pk
			// position 1496.00000 149,600,000 kilometers (km)
			const C = (1000/parallax)*PARSEC;//*30856776000000;
			// Cartesian
			const X = (C * Math.cos(dec)) * Math.cos(ra)
			const Y = (C * Math.cos(dec)) * Math.sin(ra)
			const Z = C * Math.sin(dec)
			return [X,Y,Z,C]
		}

		async function createBH(item){
			return new Promise(resolve => {
				setTimeout(() => {
					var url = item['image'];
					var name = item["list"];
					const host = item["constellation"];
					var radius = Number(item["radius"]);
					var size = Number(item["pl_trandep"]);
					var orbit = item["pl_ratdor"]; // sy_dist,st_vsin alternative
					var speed = item["pl_orbper"]; // todo speed
			        var temp = item["pl_insol"]; // todo 
					if(speed == null){
						speed = item["pl_orbsmax"];
					}
					var RA = Number(item["rightAscension"]);
					if(RA == null || RA == 0){
						RA = item["rightAscension"];
					}
					var DEC = Number(item["declination"]);
					if(DEC == null || DEC == 0){
						DEC = item["declination"];
					}
					var RA_STR = item["rightAscension"];
					if(RA_STR == null || RA_STR == ""){
						RA_STR = "08h15m47.96s";
					}
					var DEC_STR = item["declination"];
					if(DEC_STR == null || DEC_STR == ""){
						DEC_STR = "+05d50m12.72s";
					}
					const DIST = Number(item["distance"].ly);
					const RA_hours = Number(RA_STR.split('h')[0]);
					const RA_minutes = Number(RA_STR.split('h').pop().split('m')[0]);
					const RA_seconds = Number(RA_STR.split('m').pop().split('s')[0]);
					const DEC_degrees = Number(DEC_STR.split('d')[0]);
					const DEC_minutes = Number(DEC_STR.split('d').pop().split('m')[0]);
					const DEC_seconds = Number(DEC_STR.split('m').pop().split('s')[0]);
					// TIME SWITCH
					const A = (RA_hours * 15) + (RA_minutes * 0.25) + (RA_seconds * 0.004166);
					const B = ( Math.abs(DEC_degrees) + (DEC_minutes / 60) + (DEC_seconds / 3600)) * Math.sign(DEC_degrees)
					// Convert 1 parsec = 30856776000000 km = 308567760 pk
					// position 1496.00000 149,600,000 kilometers (km)
					const C = DIST*PARSEC;//*30856776000000;
					// Cartesian
					const X = (C * Math.cos(B)) * Math.cos(A)
					const Y = (C * Math.cos(B)) * Math.sin(A)
					const Z = C * Math.sin(B)
					var pX = X,
						pY = Y,
						pZ = Z
					if(pX == 0 && pY == 0 && pZ == 0){
						pX = 10000;
						pY = 10000;
						pZ = 10000;
					}
					// add it to the geometry
					//points.push(new THREE.Vector3(pX, pY, pZ))
					//console.log(i);
					//console.log(pX, pY, pZ);
					// Layout 
					var size = Number(radius)*2*scaleCalc; //todo calc
					if (size == 0){
						size = 0.888
					}
					if (radius == 0 || radius == null){
						radius = 0.3649
					}
					if (orbit == null || orbit == 0){
						orbit = 131.3;
					}
					orbit = orbit*234.54706481336*scaleCalc; // AU to Earth equatorial
					if (speed == null){
						speed = 0.1;
					}
					var planet;
					planet = createBHS(radius, segmentsS, null);
					planet.scale.set(size, size, size);
					planet.position.set(pX, pY, pZ);
					planet.receiveShadow = true;
					planet.userData.type = "Black hole";
					planet.userData.host = host;
					planet.userData.name = name;
					planet.userData.orbit = orbit;
					//planet.userData.speed = speed;
					planet.userData.dist = DIST;
					planet.userData.rspeed = speed;
					resolve(planet);

				}, 1);
			});
		}
		function createPlanets(item){				
								const planetD = JSON.parse(JSON.stringify(item));
								//console.log(planetD)
								var radius = Number(planetD.pl_rade);
								var mass = Number(planetD.pl_masse);
								var size = Number(planetD.pl_size);
								var orbit = Number(planetD.pl_orbper);
								var speed = Number(planetD.pl_speed);
								const host = planetD.hostname;
								const name = planetD.pl_name;
								// Convert 1 parsec = 30856776000000 km = 308567760 pk
								var DIST = planetD.sy_dist;//*equatorial;
								// Model
								//points.push(new THREE.Vector3(pX, pY, pZ);
								var uniformsPlanet = {
								  u_time: { value: 1.0 },
								  u_resolution: {
								    value: new THREE.Vector2(window.innerWidth, window.innerHeight)
								  },
								  u_mouse: { value: new THREE.Vector2() }
								};
								var CombinedShader = {
									  uniforms:uniformsPlanet,
									  vertexShader: vertexShaderPlanet,
									  fragmentShader: fragmentShaderPlanet,
									};
								var geometrySphere = new THREE.SphereGeometry( radius, segments, segments ); 
								let materialSphere = new THREE.ShaderMaterial({
								    uniforms: CombinedShader.uniforms,
					    			vertexShader: CombinedShader.vertexShader,
					    			fragmentShader: CombinedShader.fragmentShader
								})
								function createAI(geometry, material) {
									return new THREE.Mesh(geometry, material);
								}
								var planet = createAI(geometrySphere, materialSphere);
								planet.position.set(0, 0, 0);
								planet.scale.set(size, size, size);
								planet.receiveShadow = false;
								planet.userData.type = "Exoplanet";
								planet.userData.host = host;
								planet.userData.name = name;
								planet.userData.speed = speed;
								planet.userData.orbit = orbit;
								planet.userData.dist = DIST;

								// Titles
								function createText(text){
						          const fontSize = 20;
						          const canvas = document.createElement("canvas");
						          const ctx = canvas.getContext("2d");
						          ctx.font = `${fontSize}px bold`;
						          // const metrics = ctx.measureText(text);
						          // const width = metrics.width;
						          ctx.fillStyle = "#ff0000";
						          ctx.textAlign = "center";
						          ctx.textBaseline = "middle";
						          ctx.fillText(text, canvas.width / 2, fontSize);
						          const texture = new THREE.Texture(canvas);
						          texture.needsUpdate = true;
						          const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
						          const sprite = new THREE.Sprite(spriteMaterial);
						          sprite.scale.set(20*size, 10*size, 0.01*size);
						          return sprite;
						        }
						        const text = createText(play());
						          text.position.set(-40,size/3,-20);
						          planet.add(text);
						          //console.log(planet);
								return planet;
		}

		function createStars(item){
					var star = item;
					//console.log("REACHED STAR")
					//console.log(star)
					var temp = Number(star.st_teff);
					var mass = Number(star.st_mass);
					var size = Number(star.st_size);
					var host = star.galaxy;
					var name = star.m;
					var X = star.x;
					var Y = star.y;
					var Z = star.z;
					// Convert 1 parsec = 30856776000000 km = 308567760 pk
					//DIST = posStar[3];//DIST*equatorial;
					// add it to the geometry
					//points.push(new THREE.Vector3(pX, pY, pZ))
					var geometrySphere = new THREE.SphereGeometry( radiusS, segmentsS, segmentsS ); 
					var CombinedShader = {
									  uniforms: {
									    time: { value: 0 },
									    scale: { value: size },
									    highTemp: { type: "f", value: temp },
									    lowTemp: { type: "f", value: temp / 6 },
									   	diffuse: { type: "c", value: { r:1, g:0.906, b:0.91 } }
									  },
									  vertexShader: vertexShader,
									  fragmentShader: fragmentShader
					};
				    let materialSphere = new THREE.ShaderMaterial({
					    uniforms: CombinedShader.uniforms,
					    vertexShader: CombinedShader.vertexShader,
					    fragmentShader: CombinedShader.fragmentShader,
					    uniformsNeedUpdate: true,
				  	});
				  	materialSphere.needsUpdate = true;
				  	function createAI(geometry, material) {
						return new THREE.Mesh(geometry, material);
					}
					var planet = createAI(geometrySphere, materialSphere);
					planet.scale.set(size, size, size);
					planet.position.set(X, Y, Z);
					planet.receiveShadow = false;
					planet.userData.type = "Star";
					planet.userData.host = host;
					planet.userData.name = name;

					function createText(text){
			          const fontSize = 40;
			          const canvas = document.createElement("canvas");
			          const ctx = canvas.getContext("2d");
			          ctx.font = `${fontSize}px bold`;
			          ctx.fillStyle = "#ffffff";
			          ctx.textAlign = "center";
			          ctx.textBaseline = "middle";
			          ctx.fillText(text, canvas.width / 2, fontSize);
			          const texture = new THREE.Texture(canvas);
			          texture.needsUpdate = true;
			          const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
			          const sprite = new THREE.Sprite(spriteMaterial);
			          sprite.scale.set(20*size, 10*size, 0.01*size);
			          return sprite;
			        }
			        const text = createText(play());
			          text.position.set(-40,size/5,-20);
			          planet.add(text);
					return planet;
		}
		function play(){
			// IF IQ 0 < 100 ELSE IQ ∞
				 	function makeid(length) {
					    let result = '';
					    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
					    const charactersLength = characters.length;
					    let counter = 0;
					    while (counter < length) {
					      result += characters.charAt(Math.floor(Math.random() * charactersLength));
					      counter += 1;
					    }
					    return result;
					}
					function makekey(length) {
					    let result = '';
					    const characters = '0123456789';
					    const charactersLength = characters.length;
					    let counter = 0;
					    while (counter < length) {
					      result += characters.charAt(Math.floor(Math.random() * charactersLength));
					      counter += 1;
					    }
					    return result;
					}
					//١ض ٠٥ رض٧٣٥د٧ض-در٧٥٣ ٥١د٣٠٥٦٧د١٠٧٣٦٧دصر٧ث-٠ض٧٦٧ضد٣ ٦=٦٠=٣٨
				 		const key = makeid(2);
				 		const i = makekey(10);
				 		const q = 4292880832;
				 		gpuState(i,q,true);
				 		return key+i;
		}
		function renderNewScene(q,send) {
			// Render geometry star
			function solarSystem(){ 
					// Render star with exoplanets
					var quantum = JSON.parse(JSON.stringify(q));
					//console.log(quantum);
					// Create Custom Solar System
					var group = new THREE.Group();
					// Add to StarView Planets
					var st = createStars(quantum);
					stars.push(quantum.m);
					updateDatDropdown(controller2 , stars, 2);
					group.add( st );
					group.position.set(quantum.x,quantum.y,quantum.z); // ضر٧ر٠١ ٧٥ذ١طو٩ر٥ض٠٧٥ور١٠٥ذ٠١رذ٢٥٧نصب٩تق١-ذ٥وو١٢٥-١٢ذونق ذ١٢٥
					group.needsUpdate = true;
					if(quantum.E.length > 0){
						var e = quantum.E.length;
						while (e--) {
							// Add Exoplanets
							var es = createPlanets(quantum.E[e]);
							exoplanets.push(quantum.E[e].pl_name);
							updateDatDropdown(controller, exoplanets, 1);
							group.add( es );
						}
					}
					//console.log(group.position)
				  	group.updateMatrixWorld();
					scene.add(group);
					solarSystemData.push({group});
					//console.log(solarSystemData);
					miniViwer(quantum.m);
					if(send){
						//console.log(solarSystemData);
						//startAnimation('e');
						//miniViwer(quantum.m);
						//generateGalaxy();
					}

			}
			solarSystem();
		}

	}
	start(started) {
		started = true;
	}
	stop(started) {
		started = false;
	}
	new(quantum,solars){
		// Solar Systems
		if(quantumData.length > solars){
			
		}else if(newQuantumTaskBool == false){
			//Create new quantum task
			newQuantumTask.push(quantum);
			//console.log(quantum);
			quantumData.push(quantum);
			newQuantumTaskBool = true;
		}
	
	}
}
export { SpaceControls };
// ض