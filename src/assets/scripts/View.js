import PublisherSubscriber from './PubSub';
import  rn  from 'random-number';

const TIME_TO_ANIMATE = 500;
 
class View {
		constructor() {
			this.cardWrapper = document.querySelector('.memory-game');
			this.event = new PublisherSubscriber();
			this.isFirst = true;
			this.isBlock = false;
		}

		setStyle(amountColumn, amountRow) {
			let root = document.documentElement;
			root.style.setProperty('--cars_width', (100 / amountColumn) + 'vw');
			root.style.setProperty('--card_height', (100 / amountRow) + 'vh');
			root.style.setProperty('--card_animate', TIME_TO_ANIMATE + 'ms');
		}
	
		addHandler() {
			this.cardWrapper.addEventListener( 'click', (event) =>{
				let card = event.target.closest('.memory-card');
				if (!card || this.isBlock) {return}


				this.event.fireEvent('selectCard', card);

				if (this.isFirst) {
						this.isFirst = false;
						this.event.fireEvent('firstClick', {});
				}
			})
		}
		showCard(card) {
			card.querySelector('.front-face').src = card.imageCard;
			card.classList.add('flip');
		}
		hideCards(cards) {
			cards.forEach((item) => {
				item.classList.remove('flip');
				setTimeout(() => {
					item.querySelector('.front-face').src = '';
				}, TIME_TO_ANIMATE) 
			});
		}
		createImage(typesOfCars) {
			for (let type of typesOfCars) {
				let image = new Image();
				image.src = type.image;
			}
		}

		reset() {
			this.cardWrapper.innerHTML = '';
		}

		createCard(framework, image) {
			let template = `
			<div class="memory-card">
				<img class="front-face" src="" alt="frame" />
				<img class="back-face" src="/assets/image/js-badge.svg" alt="JS Badge" />
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

		createGrid (amountPair, amountCard, typesOfCars) {
			let cardWrapper = document.querySelector('.memory-game');
			cardWrapper.innerHTML = '';
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
					card.classList.remove('transition-top')
				});
			}, 20)
			setTimeout(() => {
				cards.forEach(card => {
					card.classList.add('active')
				});
			}, 500)
		}
	
		randomCard() {
			let cards = document.querySelectorAll('.memory-card');
			var options = {
				min: 0, 
				max: cards.length, 
				integer: true
			}

			cards.forEach(card => {
				let randomPos = rn(options);
				card.style.order = randomPos;
				let cof = 50;
				card.classList.add('transition-top')
				card.style.transitionDelay = `${rn(options) * cof}ms`;
			});
		}
	
	}

	
	export default View;