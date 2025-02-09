//    (                      )               *   )    (                           
// ( )\    (     )       ( /(  (     )    ` )  /(  ( )\  (                   (   
// )((_)  ))\ ( /(  (    )\())))\   (      ( )(_))))((_)))\(   (  (  `  )   ))\  
//((_)_  /((_))(_)) )\ )(_))//((_)  )\  ' (_(_())/((__ /((_)\  )\ )\ /(/(  /((_) 
// / _ \(_))(((_)_ _(_/(| |_(_))( _((_))  |_   _(_))| (_))((_)((_((_((_)_\(_))   
//| (_) | || / _` | ' \)|  _| || | '  \()   | | / -_| / -_(_-/ _/ _ | '_ \/ -_)  
// \__\_\\_,_\__,_|_||_| \__|\_,_|_|_|_|    |_| \___|_\___/__\__\___| .__/\___|  
//                                                                  |_|          
 // Quantum Telescope
import 'jquery';
import $ from 'jquery';
import Q from 'jsqubits';
import { SpaceControls } from './m964977375348550846353648758606096.jsx';
const jsqubits = Q;
const jsqubitsmath = Q.QMath;
const qstate = jsqubits('|0>').hadamard(0).T(0);
var space = new SpaceControls();

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
var quantumTask = 'observe';
var qip = false;
var qis = false
// Terminal Functionality
export let terminal = {
    output: document.getElementById('terminalOutput'),
    input: document.getElementById('terminalInput'),
    
    commands: {
        help: () => 'Available commands: quantum, help, clear, status, start, save',
        clear: () => {
            terminal.output.innerHTML = '';
            return '';
        },
        save: () => {
            if(qis){
                qis = false
                return 'Save data task stoped';
            }else{
                qis = true;
                return 'Save data task started';
            }
        },
        start: () => {
            initSpace();
            return 'Space started successfully';
        },
        stop: () => {
            qip = false;
            initSpace(true);
            return 'Space stopped successfully';
        },
        status: () => 'All systems operational. Void resonance stable.',
        quantum: (task) => {
            quantumTask = task;
            return 'Initiating quantum task...';
        },
        echo: (args) => args.join(' '),
        glyph: () => {
            createGlyphRain();
            return 'Initiating glyph cascade...';
        }
    },

    processCommand(input) {
        const [cmd, ...args] = input.trim().toLowerCase().split(' ');
        const response = this.commands[cmd] ? 
            this.commands[cmd](args) : 
            `Command not found: ${cmd}`;
        
        this.printOutput(`> ${input}`);
        this.printOutput(response);
    },

    printOutput(text) {
        const line = document.createElement('div');
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }
};
var started = false;
function initSpace(e){
    if(!started){
        if(!e){
            space.start(true);
            started = true;
            space.renderView();
            // start quantum process
            qip = true;
        }else{
            space.stop(false);
            started = false;
        }
    }
    //console.log(space);
}
function initCalc(){
	//InFinalQubitDataLogicWithKeyspace
	let x = Math.floor((Math.random() * 100) + 1);
	let y = Math.floor((Math.random() * 100) + 1);
	let z = Math.floor((Math.random() * 100) + 1);
	// The state of the qubit to be transmitted consists of the amplitude of |0> and the amplitude of |1>
	// Any two complex values can be chosen here so long as the sum of their magnitudes adds up to 1.
	// For this example, we choose to transmit the state: 0.5+0.5i |0> + 0.7071i |1>
	var stateToBeTransmitted0 = jsqubits("|0>").multiply(jsqubits.complex(5.001, 10.001));
	var stateToBeTransmittedx = jsqubits("|1>").multiply(jsqubits.complex(0, Math.sqrt(x)));
    var stateToBeTransmittedy = jsqubits("|1>").multiply(jsqubits.complex(0, Math.sqrt(y)));
    var stateToBeTransmittedz = jsqubits("|1>").multiply(jsqubits.complex(0, Math.sqrt(z)));
	var stateToBeTransmitted = stateToBeTransmitted0.add(stateToBeTransmittedx).add(stateToBeTransmittedy).add(stateToBeTransmittedz);

	//log("State to be transmitted: " + stateToBeTransmitted);

	// The quantum computer is initialized as a three qubit system with bits 0 and 1 being the bell state qbits shared by Alice and Bob
	// and bit 2 being the qubit to be transmitted.

	var bellState = jsqubits('|00>').add(jsqubits('|11>')).normalize();
	var initialState = stateToBeTransmitted.tensorProduct(bellState);

	// Now apply the Teleportation algorithm
	var finalState = applyTeleportation(initialState);

	// By this stage, only bit zero has not been measured and it should have the same state the original state to be transmitted.
	// The other two bits will have random values but will be in definite states.
	// ie. finalState should be
	// stateToBeTransmitted0 |xx0> + stateToBeTransmitted1 |xx1>
	// where the bit values of bits 1 and 2 (xx) are identical in the two states.
	// If we had some way of projecting onto bit 0, we would have
	// stateToBeTransmitted0 |0> + stateToBeTransmitted1 |1>
		//document.getElementById("powerModResult").innerHTML = finalState;
		const protocol = document.getElementById("powerModResult").innerHTML
        quantumCTask(protocol,finalState);
		// Header Menu
		$("#appMenu").find('.nav__item').find('.nav__link').on("mouseover", function () {
    			var page = $(this).prop('href');
    			var pagear = page.split("#");
    			if(pagear[1] == 'play'){
    				$('.app-container').addClass('hidden');
    				$('#spaceRoot').removeClass('hidden');
                    // Start quantum space
                    initSpace();
    			}else{
    				$('#spaceRoot').addClass('hidden');
    				$('.app-container').removeClass('hidden'); 
    			}
    			//console.log(pagear[1].toString());
    			$("#appMenu").find('.nav__item').find('.nav__link').each(function(){
    					$(this).removeClass('nav__link--active'); 
            			if ($(this).prop('href') == page) {
                            $(this).addClass('nav__link--active'); 
                            $('.'+pagear[1].toString()).show();
                        }else{
                        	var hidePage = $(this).prop('href').split("#");
                        	$('.'+hidePage[1].toString()).hide();
                        }
                });
	});
	setTimeout(() => {
        initCalc();
    }, 10);
}
// Boot Sequence
const bootMessages = [
    'INITIALIZING QUANTUM CORE...',
    'LOADING MYSTICAL PROTOCOLS...',
    'CALIBRATING VOID RESONANCE...',
    'ESTABLISHING QUANTUM CONNECTION...',
    'ACCESSING DATA MODELS...',
    'SYNCHRONIZING WARP GATES...',
    'WELCOME TO Quantum_OS'
];

const glyphs = '⚕☤⚚♾⚛⚕☯☮☪☣☢⚜';
const bootLog = document.getElementById('bootLog');

// Type out boot messages
async function typeWriter(element, text) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await new Promise(r => setTimeout(r, 10));
    }
}

// Initialize boot sequence
async function initBoot() {
    for (let msg of bootMessages) {
        const logEntry = document.createElement('div');
        logEntry.className = 'boot-log';
        bootLog.appendChild(logEntry);
        
        // Add random glyph
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        //await typeWriter(logEntry, `${glyph} ${msg}`);
        
        logEntry.style.opacity = '1';
        logEntry.style.transform = 'translateY(0)';
        //await new Promise(r => setTimeout(r, 0,));
    }

    // Transition to main content
    //setTimeout(() => {
        document.querySelector('.boot-screen').style.animation = 'fade-out 0.01s forwards';
        document.querySelector('.main-container').style.display = 'block';
    //}, 10);
}

// Initialize runes
function createRunes() {
    const container = document.getElementById('runeContainer');
    const runeChars = '᚛᚜ᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚقضرطق٩١٣٥٠ر٩٣١وطف،٢ذ-و٥٣ط٠٩و١٣٠٩ط،ينتب٠=٢وذ١٥٨يسو٢ع٣تي،ذوي٢-٠٥٨٢٣٥،٣٩ط٠بين٩ذ٢';
    
    for (let i = 0; i < 50; i++) {
        const rune = document.createElement('div');
        rune.className = 'mystical-rune';
        rune.textContent = runeChars[Math.floor(Math.random() * runeChars.length)];
        rune.style.left = `${Math.random() * 100}vw`;
        rune.style.top = `${Math.random() * 100}vh`;
        rune.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(rune);
    }
}
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createRunes();
    initCalc();
    document.getElementById("jsqubitsResult").innerHTML = qstate.toString();
    document.getElementById('catBtn').addEventListener('onclick',initCalc,false);
    document.getElementById('catBtn').addEventListener('mouseover',initCalc,false);
    terminal.printOutput('Quantum OS System');
    terminal.printOutput('Type "help" for available commands.');
    terminal.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && terminal.input.value.trim()) {
            terminal.processCommand(terminal.input.value);
            terminal.input.value = '';
        }
    });
    initBoot();
});

// Tab Functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});
var completed = false;
var completedG = false;
function initNewTask(length){
    if(completedG){
       completed = true; 
    }else{
       completed = false;
    }
    let result = '';
    const characters = '0123456789qwertyuiopasdfghjklzxcvbnm';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
function sumDigitsFromString(str) {
  let nums = [];
  let sum = 0;

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(Number(str[i]))) {
      nums.push(Number(str[i]));
    }
  }
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}
function qwerty(length) {
    let result = '';
    const characters = '.،ورزدذطظشسيبلاتنمك؛جحخهعغفقثثصض';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
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
function makekey(length,char) {
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
function mmg(i,q){
    if(i == q){
        return true;
    }else{
        return false;
    }
}
function genS(n,l,m){
    var scale = 1.7;
    var parscec = 30856776.00*scale;
    var eq = 2345.4706481336;
    const galaxyProtocol = makeid(10,sumDigitsFromString(l));
    const bum = makekey(1,sumDigitsFromString(l));
    const bum2 = makekey(1,sumDigitsFromString(l));
    const randomBetween = (min, max, b) => min + Math.floor(Math.random() *  (max - min +  b));
    const r = randomBetween(0, 1, bum)*0.001;
    const g = randomBetween(0, 1, bum)*0.001;
    const b = randomBetween(0, 1, bum)*0.001;
    const x = randomBetween(1, 1000,bum2)*parscec;
    const y = randomBetween(1, 1000,bum2)*parscec;
    const z = randomBetween(1, 1000,bum2)*parscec;
    const N = randomBetween(0, 360,bum2);
    const st_size = randomBetween(10000, 1000000,bum2)*eq;
    const st_masse = randomBetween(1, 100,bum2);
    const st_teff = randomBetween(1000, 10000,bum2);
    const s = {
        "galaxy": galaxyProtocol,
        "m": m,
        "x": x,
        "y": y,
        "z": z,
        "N": N,
        "st_size": st_size,
        "st_mass": st_masse,
        "st_teff": st_teff,
        "K": {
            "r": r,
            "g": g,
            "b": b
        },
        "E":[]
    }
    return s;
}
var rjp = [];
var completedL = true;
async function quantumCTask(p,f) {
    terminal.output.innerHTML = '';
    const qc = 907;
    const length = parseFloat(f.toString().replaceAll("0", "").replaceAll(",", "").match(/\d+/g));// Number of quantum length
    const emmgId = makekey(length);
    var ok = true;
    if(ok){
        //qis = true;
        //completedL = false;
        if(p){
            terminal.printOutput("Protocol: "+p);
        }
        // Number of exoplanets
        var noe = parseInt(Math.sqrt(length));
        const qubits = parseInt(Math.sqrt(length));
        document.getElementById('qubitsQM').innerHTML = qubits;
        const qubitsProccess = parseInt(makekey(Math.sqrt(qc)));
        terminal.printOutput("Qubits: "+qubits);
        terminal.printOutput("Quantum:"+(qubitsProccess/qubits/qc));
    }
    if(completed && completedL){
        if(completedG){
            const Protocol = rjp.m; // star protocol
            const qProtocol = p; // exoplanets protocol
            // Find star=>exoplanets=>quantum inteligence protocols
            // Create quantum data
            completed = true;
            completedG = true;
            // Match life
            terminal.printOutput("Match life: "+Protocol);
            var wmmg = makekey(noe,sumDigitsFromString(length));
            var wmmgR = parseInt(Math.sqrt(wmmg));
            terminal.printOutput("Exoplanets: "+wmmgR);
            // Quantum Telescope
            // var hmmg = makeid(5)+makekey(5,sumDigitsFromString(length));
            terminal.printOutput("Match quantum telescope: "+qProtocol);
            // Quantum Super Stars
            // var smmg = makeid(10)+makekey(2,sumDigitsFromString(length));
            //S//Protocol=>qProtocol=>length emmgId  //mmg(Protocol,qProtocol)
            //q0197nqc5103571907xq9mnq05cm57359n02=73rs0c,2c572-c3as7tm252n59jf0hr2c05n9727cfmc2059n720dcrmt25301q701470175q251025
            //،ط١-ر١ ٥ط٠١٥٨ ض٠صذ-ذ١٧٥ ٧٠١٥رذ طذ٧ش٩٥ر١-٥رذ١ ٥١٠٢٧٥ذط-شو٥٧١ -٠٢رذضصو-٥١٠٥١ر-٥١ ذ٥ض٧-٥٧١-ر٧٥ط٠ضط٦٥٨١٦ورط٠٩١٢٦ذشرس-٥٦١ر٥ذطضرش٥و١٠ر٥٩١٢٥وو٠رش٥١٥١٠٢٥٦١٥٩٠١٦٥ذ-ض٠٦١٩٥١ر-ذ٦٠١
            if(qip){
                // Quantum Inteligence
                rjp.E = [];
                //var ea = []
                //await ea.forEach(exoplanet => {});
                while(wmmgR--){
                    var num = 0.00000001;
                    var exoplanetProtocol = makeid(10,sumDigitsFromString(length));
                    var bum2 = makekey(10,sumDigitsFromString(length));
                    const randomBetween = (min, max, b) => min + Math.floor(Math.random() *  (max - min + b));// todo: add quantum telescope calculation
                    const pl_rade = randomBetween(1, 1000,bum2)*num;
                    const pl_orbper = randomBetween(1, 1000,bum2)*num;
                    const pl_masse = randomBetween(1, 100,bum2)*num;
                    const pl_size = randomBetween(1, 100,bum2)*num;
                    const pl_speed = randomBetween(1, 10,bum2)*num;
                    const sy_dist = randomBetween(1, 10000,bum2)*num;
                    //rjp.E.push({"p":makekey(10,sumDigitsFromString(length)),"key":exoplanet}); // protocol , time life key
                    rjp.E.push({
                        "pl_name": exoplanetProtocol,
                        "pl_rade": pl_rade,
                        "pl_orbper": pl_orbper,
                        "pl_masse": pl_masse,
                        "pl_size": pl_size,
                        "pl_speed": pl_speed,
                        "hostname": Protocol,
                        "sy_dist": sy_dist,
                    });

                }
                //Variant 1: Render Scene And Send spacship to founded coordinates
                space.new(rjp);
                // ضق٩٠٢ر٩دف٧٢-صفر-ص٠ث٧ف-ص٠٨ثف٠ضصث٨ ف-ض٠٨
                completedG = true;
                completed = true;

                if(qis){
                    //Variant 2: Save new founded life coordinates 
                    $.post("/api/create",rjp, function (d, status) {
                        terminal.printOutput(JSON.stringify(d));
                        // when ready proceed to next
                        qis = true;
                        completedG = false;
                        completed = true;
                    });
                }
            }else{
                completedG = false;
                completed = false;
            }
        }else{
            terminal.printOutput('Quantum Task Completed '+quantumTask);
            //terminal.printOutput("Protocol: "+p);
            let length = f.toString().match(/\d+/g);
            let match = makeid(2)+makekey(10,sumDigitsFromString(length));
            terminal.printOutput("Match: "+match);
            completedG = true;
            const json = genS(p,length,match);
            //let output = JSON.stringify(json);
            //terminal.printOutput(output);
            rjp = json;
        }
        let quantumTaskQue = initNewTask(length);
        terminal.printOutput(quantumTaskQue);
    }else{
        if(completedL){
            terminal.printOutput("Init quantum task "+quantumTask);
            //terminal.printOutput("Protocol: "+p);
            completed = true;
            animateStatusBars();
        }
    }
}
// Glyph Rain Effect
function createGlyphRain() {
    const glyphs = '᚛᚜ᚐᚑᚒᚓᚔᚕᚖᚗᚘᚙᚚ⚕☤⚚♾⚛⚕☯☮☪ ِء]٬ُّْ]إ قضرطق٩١٣٥٠ر٩٣١وطف،٢ذ-و٥٣ط٠٩و١٣٠٩ط،ينتب٠=٢وذ١٥٨يسو٢ع٣تي،ذوي٢-٠٥٨٢٣٥،٣٩ط٠بين٩ذ٢';//👽❤️♾️
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const glyph = document.createElement('div');
            glyph.className = 'glyph-rain';
            glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
            glyph.style.left = `${Math.random() * 100}vw`;
            glyph.style.animationDuration = `${Math.random() * 2 + 1}s`;
            document.body.appendChild(glyph);

            glyph.addEventListener('animationend', () => glyph.remove());
        }, i * 1);
    }
}

// Status Bar Animation
function animateStatusBars() {
    document.querySelectorAll('.status-fill').forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 10);
    });
}

// Color Theme Customization
const colorThemes = [
    { primary: '#9b30ff', secondary: '#4a0080' },
    { primary: '#ff3080', secondary: '#800040' },
    { primary: '#30ff80', secondary: '#008040' },
    { primary: '#3080ff', secondary: '#004080' }
];

const colorPicker = document.querySelector('.color-picker');

colorThemes.forEach(theme => {
    const option = document.createElement('div');
    option.className = 'color-option';
    option.style.background = theme.primary;
    option.addEventListener('click', () => {
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
    });
    colorPicker.appendChild(option);
});