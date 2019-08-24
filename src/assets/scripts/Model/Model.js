import PublisherSubscriber from '../Utils/PubSub';


class Model {
	constructor() {
		/**
		 * @type {Array}
		 */
		this.openCards = [];
		/**
		 * @type {Array}
		*/
		this.currentCard = [];
		/**
		 * @type {PublisherSubscriber}
		 */
		this.event = new PublisherSubscriber();
		this.levels = [
			{
				amountColumn: 5,
				amountRow: 2,
				amountPair: 1,
				cardToCompare: 2,
				scoreOpen: 5,
				scoreSuccess: 10,
				optionalScore: 60,
				typesOfCars: [
					{
						name: 'vue',
						image: 'assets/image/witcher/witcher_1.jpg'
					},
					{
						name: 'aurelia',
						image: 'assets/image/witcher/witcher_2.jpg'
					},
					{
						name: 'angular',
						image: 'assets/image/witcher/witcher_3.jpg'
					},
					{
						name: 'backbone',
						image: 'assets/image/witcher/witcher_4.jpg'
					},
					{
						name: 'ember',
						image: 'assets/image/witcher/witcher_5.jpg'
					}
				]
			},
			{
				amountColumn: 6,
				amountRow: 3,
				amountPair: 1,
				cardToCompare: 3,
				scoreOpen: 5,
				scoreSuccess: 10,
				optionalScore: 60,
				typesOfCars: [
					{
						name: 'vue',
						image: 'assets/image/witcher/witcher_1.jpg'
					},
					{
						name: 'aurelia',
						image: 'assets/image/witcher/witcher_2.jpg'
					},
					{
						name: 'angular',
						image: 'assets/image/witcher/witcher_3.jpg'
					},
					{
						name: 'backbone',
						image: 'assets/image/witcher/witcher_4.jpg'
					},
					{
						name: 'ember',
						image: 'assets/image/witcher/witcher_5.jpg'
					},
					{
						name: 'sdd',
						image: 'assets/image/witcher/witcher_6.jpg'
					}
				]
			},
			{
				amountColumn: 7,
				amountRow: 4,
				amountPair: 1,
				cardToCompare: 4,
				scoreOpen: 5,
				scoreSuccess: 15,
				optionalScore: 150,
				typesOfCars: [
					{
						name: 'vue',
						image: 'assets/image/witcher/witcher_11.jpg'
					},
					{
						name: 'aurelia',
						image: 'assets/image/witcher/witcher_12.jpg'
					},
					{
						name: 'angular',
						image: 'assets/image/witcher/witcher_10.jpg'
					},
					{
						name: 'backbone',
						image: 'assets/image/witcher/witcher_9.jpg'
					},
					{
						name: 'ember',
						image: 'assets/image/witcher/witcher_8.jpg'
					},
					{
						name: 'sdd',
						image: 'assets/image/witcher/witcher_7.jpg'
					},
					{
						name: 'sdd',
						image: 'assets/image/witcher/witcher_6.jpg'
					}
				]
			}
		];
		this.currentLevel = 0;
		this.time = 0;
		this.score = 0;
	}

	/**
	 * get current level
	 * @return {Object}
	 */
	getLevel() {
		return this.levels[this.currentLevel];
	}

	/**
	 * @param {Number} level 
	 * @return {Boolean}
	 */
	setLevel(level) {
		if (level > this.levels.length - 1) {
			return true;
		}
		this.currentLevel = level;
		this.score = this.score + this.getLevel().optionalScore;
		return false;
	}

	/**
	 * @return {void}
	 */
	checkFinishOrGameOver() {
		if (!this.score) {
			this.event.fireEvent('game_over', level);
			return;
		}

		let level = this.getLevel();
		let status =  (level.amountPair * level.cardToCompare * level.typesOfCars.length) === this.openCards.length;
		if (status) {
			this.event.fireEvent('finish', level);
		}
	}

	/**
	 * @param {Array} cards
	 * @return {void} 
	 */
	setOpenCards(cards) {
		this.openCards.push(...cards);
	}

	/**
	 * @param {Object} card
	 * @return {void}
	 */
	setCurrentCard(card) {
		this.currentCard.push(card);
	}
}


export default Model;