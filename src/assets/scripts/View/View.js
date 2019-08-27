import PublisherSubscriber from '../Utils/PubSub';
import  rn  from 'random-number';

/**
 * Time flip card
 * @type {Number}
 */
const TIME_TO_ANIMATE = 500;
 
class View {
	constructor(root) {
		this.root = root;
		this.createWrapper();
		this.handler = this.handler.bind(this);
		this.event = new PublisherSubscriber();
		this.isFirst = true;
		this.isBlock = false;
	}

	createWrapper() {
		this.root.innerHTML = `
			<div id="images"></div>
			<section class="memory-game">
			</section>
	
			<div class="analytics">
				<div>
					TIME:
					<span id="time" class="time">0</span>
				</div>
				<div>
					SCORE
					<span id="score" class="score">0</span>
				</div>
			</div>`;
		this.cardWrapper = document.querySelector('.memory-game');
	}

	/**
	 * @param {Number} amountColumn 
	 * @param {number} amountRow
	 * @return {void} 
	 */
	setStyle(amountColumn, amountRow) {
		let root = document.documentElement;
		root.style.setProperty('--cars_width', (100 / amountColumn) + 'vw');
		root.style.setProperty('--card_height', (100 / amountRow) + 'vh');
		root.style.setProperty('--card_animate', TIME_TO_ANIMATE + 'ms');
	}

	addHandler() {
		this.cardWrapper.addEventListener( 'click', this.handler);
	}

	removeHandler() {
		this.cardWrapper.removeEventListener('click', this.handler);
	}

	handler(event) {
		let card = event.target.closest('.memory-card');
		if (!card || this.isBlock) {return;}

		this.event.fireEvent('selectCard', card);

		if (this.isFirst) {
			this.isFirst = false;
			this.event.fireEvent('firstClick', {});
		}
	}
	showCard(card) {
		card.querySelector('.front-face').src = card.imageCard;
		card.classList.add('flip');
	}
	showAllCards() {
		let cards = Array.from(document.querySelectorAll('.memory-card'));
		cards.forEach((item) => {
			item.querySelector('.front-face').src = item.imageCard;
			item.classList.add('open');
			item.classList.remove('active');
		});
	}
	hideCards(cards) {
		cards.forEach((item) => {
			item.classList.remove('flip');
			setTimeout(() => {
				item.querySelector('.front-face').src = '';
			}, TIME_TO_ANIMATE / 1.5);
		});
	}

	/**
	 * Load image previously
	 * @param {Array} typesOfCars 
	 */
	createImage(typesOfCars) {
		let imageWrap = document.getElementById('images');
		for (let type of typesOfCars) {
			let image = new Image();
			image.src = type.image;
			imageWrap.appendChild(image);
		}
	}

	reset(time) {
		if (!time) {
			this.isFirst = true;
		}
		this.isBlock = false;
		this.cardWrapper.innerHTML = '';
		this.removeHandler();
	}

	/**
	 * 
	 * @param {String} framework 
	 * @param {String} image 
	 * @return {Object} 
	 */
	createCard(framework, image) {
		let template = `
		<div class="memory-card">
			<img class="front-face" src="" alt="frame" />
			<img class="back-face" src="/assets/image/cover.jpg" alt="Morty" />
		</div>
		`;
		let cardWrapper = document.createElement('div');
		cardWrapper.innerHTML = template;
		let card = cardWrapper.firstElementChild;
		card.framework = framework;
		card.imageCard = image;
		return card;
	}

	/**
	 * @param {Number} time
	 * @return {void} 
	 */
	setTime(time) {
		let timeWrap = document.getElementById('time');
		timeWrap.innerHTML = time;
	}

	/**
	 * @param {Number} time
	 * @return {void} 
	 */
	setScore(score) {
		let scoreWrap = document.getElementById('score');
		scoreWrap.innerHTML = score;
	}

	/**
	 * @param {Number} amountPair 
	 * @param {Number} amountCard 
	 * @param {Array} typesOfCars 
	 * @return {void}
	 */
	createGrid (amountPair, amountCard, typesOfCars) {
		this.reset();
		let cardWrapper = document.querySelector('.memory-game');
		let index = amountPair * amountCard;

		while (index) {
			for (let type of typesOfCars) {
				cardWrapper.appendChild(this.createCard(type.name, type.image)); 
			}
			index--;
		}
		this.randomCard();
		this.createImage(typesOfCars);
		this.addHandler();
		this.animateCard();
		
	}
	animateCard() {
		let cards = document.querySelectorAll('.memory-card');
		setTimeout(() => {
			cards.forEach(card => {
				card.classList.remove('transition-top');
			});
		}, 20);
		setTimeout(() => {
			cards.forEach(card => {
				card.classList.add('active');
			});
		}, TIME_TO_ANIMATE);
	}

	randomCard() {
		let cards = document.querySelectorAll('.memory-card');
		var options = {
			min: 0, 
			max: cards.length, 
			integer: true
		};

		cards.forEach(card => {
			let randomPos = rn(options);
			card.style.order = randomPos;
			let cof = 50;
			card.classList.add('transition-top');
			card.style.transitionDelay = `${rn(options) * cof}ms`;
		});
	}
	
}

	
export default View;