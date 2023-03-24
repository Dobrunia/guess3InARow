const DATA = ['red', 'red', 'red', 'red', 'red', 'red', 'green', 'green', 'green'];
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const container = document.getElementById('container');
const img = document.getElementById('tt');
const btn = document.getElementById('reload');
let DATA_SHUFFLED = [];
let successBlockCounts = 0;

function congratulations() {
	btn.classList.remove('disp');
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
  let audio = new Audio();
  audio.src = 'mmm.m4a';
  audio.autoplay = true;
}

container.addEventListener('click', (event) => {
	if(event.target.classList.contains('item')) {

		if(DATA_SHUFFLED[event.target.dataset.index] === 'green'){
			event.target.classList.add('successBlock');
			successBlockCounts++;
			if (successBlockCounts === 3) {
				congratulations();
			}
		} else {
			event.target.classList.add('lostBlock');
			container.classList.add('locked');
			//soundClick();
			setTimeout(reset, 500);
		}

		event.target.classList.remove('need');
	}
})

btn.addEventListener('click', () => {reset()})

const reset = () => {
	container.classList.remove('locked');
	btn.classList.add('disp');
	img.classList.add('disp');
	img.classList.remove('animate__backInDown');
	successBlockCounts = 0;
	container.innerHTML = '';
	newGame();
}

const newGame = () => {
	
	DATA_SHUFFLED = shuffle([...DATA]);
	DATA_SHUFFLED.forEach((color, index) => {
		container.innerHTML += `<div class="item need" data-index=${index}></div>`
	})
}

newGame();