const container = document.getElementById('container');

function blocksGenerator(type) {
	return type === 'green' ? new blockConstructer('green') : new blockConstructer('red');
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let types = [],
	numberOFSuccessBlocks = 0,
	blocks,
	winStats = 0,
	btn = document.getElementById('reload');


function toArray() {
	return getRandomIntInclusive(0, 1) ? 'green' : 'red';
}

function checkArray() {
	switch(numberOFSuccessBlocks) {
		case 0: 
			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
			types.push('green');
			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
			types.push('green');
			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
			types.push('green');
  			break;

  		case 1:
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('green');
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('red');
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('green');
  			break;

  		case 2:
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('red');
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('green');
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('red');
  			break;

  		case 3:
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('red');
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('red');
  			getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
  			types.push('red');
  			break;

  		default:
	}
}

function generateArray() {
	while (types.length < 6) {
		if (numberOFSuccessBlocks === 3) {
			types.push('red')
		} else {
			if (toArray() === 'green') {
				types.push('green')
				getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
				numberOFSuccessBlocks++;
			} else {
				types.push('red')
				getRandomIntInclusive(0, 1) ? types = types.reverse() : types;
			}
		}
	}
	checkArray();
}

let img = document.getElementById('tt');

function congratulations() {
	let audio1 = new Audio();
	audio1.src = 'wp2.mp3';
	audio1.autoplay = true;
	let audio2 = new Audio();
	audio2.src = 'wp1.mp3';
	audio2.autoplay = true;
	img.classList.remove('disp');
	img.classList.add('animate__backInDown');
}

function soundClick() {
  // let audio = new Audio();
  // audio.src = 'mmm.m4a';
  // audio.autoplay = true;
}

function sayGO() {
	soundClick();
	setTimeout(newGame, 200)
}
function sayWP() {
	congratulations();
	btn.classList.remove('disp');
}

function render() {
	container.innerHTML = '';
	types.forEach(type => {
		if (type === 'green') {
			container.innerHTML += `<div class="item successBlock need"></div>`
		} else {
			container.innerHTML += `<div class="item lostBlock need"></div>`
		}
	})
	blocks = document.querySelectorAll('.item');
	blocks.forEach(it => {
	it.addEventListener('click', () => {
		if (it.classList.contains('successBlock')) {
			it.classList.remove('need')
			winStats++;
			if (winStats === 3) {
				setTimeout(sayWP, 200)
			}
		} else {
			it.classList.remove('need')
			setTimeout(sayGO, 200)
		}
	})
})
}

btn.addEventListener('click', () => {newGame()})

function newGame() {
	numberOFSuccessBlocks = 0;
	winStats = 0;
	types = [];
	btn.classList.add('disp');
	img.classList.add('disp');
	img.classList.remove('animate__backInDown');
	generateArray();
	render();
}

newGame();