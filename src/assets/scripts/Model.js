import PublisherSubscriber from './PubSub';


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
				typesOfCars: [
					{
						name: 'vue',
						image: 'assets/image/vue.svg'
					},
					{
						name: 'aurelia',
						image: 'assets/image/aurelia.svg'
					},
					{
						name: 'angular',
						image: "assets/image/angular.svg"
					},
					{
						name: 'backbone',
						image: "assets/image/backbone.svg"
					},
					{
						name: 'ember',
						image: "assets/image/ember.svg"
					}
				]
			},
			{
				amountColumn: 8,
				amountRow: 4,
				amountPair: 2,
				cardToCompare: 3,
				scoreOpen: 5,
				scoreSuccess: 10,
				typesOfCars: [
					{
						name: 'witcher_1',
						image: 'assets/image/witcher_1.jpg'
					},
					{
						name: 'aurelia',
						image: 'assets/image/aurelia.svg'
					},
					{
						name: 'angular',
						image: "assets/image/angular.svg"
					},
					{
						name: 'backbone',
						image: "assets/image/backbone.svg"
					},
					{
						name: 'ember',
						image: "assets/image/ember.svg"
					}
				]
			},
			{
				amountColumn: 5,
				amountRow: 5,
				amountPair: 5,
				cardToCompare: 4,
				scoreOpen: 5,
				scoreSuccess: 10,
				typesOfCars: [
					{
						name: 'vue',
						image: 'assets/image/vue.svg'
					},
					{
						name: 'aurelia',
						image: 'assets/image/aurelia.svg'
					},
					{
						name: 'angular',
						image: "assets/image/angular.svg"
					},
					{
						name: 'backbone',
						image: "assets/image/backbone.svg"
					},
					{
						name: 'ember',
						image: "assets/image/ember.svg"
					}
				]
			}
		];
		this.currentLevel = 0;
		this.time = 0;
		this.score = 100;
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
	 * @return {void}
	 */
	setLevel(level) {
		this.currentLevel = level;
	}

	/**
	 * @return {void}
	 */
	checkFinish() {
		let level = this.getLevel()
		let status =  (level.amountPair * level.cardToCompare * level.typesOfCars.length) === this.openCards.length;
		if (status) {
			this.event.fireEvent('finish', level)
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