const TIME_TO_OPEN = 1200;

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.changeLevel(0);

		this.model.event.addListener('finish', () => {
			this.changeLevel(this.model.currentLevel + 1);
		});

		this.view.event.addListener('firstClick', () => {
			this.startTimer();
		});

		this.view.event.addListener('selectCard', (card) => {
			// Если карта уже открыта то выходим 
			if (this.checkSelected(card)) {return}

			this.view.showCard(card);
			this.setScore();

			// Если это первая карта в паре то выходим
			if (!this.model.currentCard.length) {
				this.model.setCurrentCard(card);
			} else {
				let status = this.compareCard(card);
				if (!status) {
					this.view.isBlock = true;
					setTimeout(() => {
						this.resetCards(card)
					}, TIME_TO_OPEN);
				} else {
					// проверяем если количество карт недостаточно для полного открытия карт 
					// добавляем их в пару и выходим
					if (this.model.currentCard.length < this.model.getLevel().cardToCompare - 1) {
						this.model.setCurrentCard(card);
						return
					}
					this.successOpen(card);
				}
			}
		});
	}

	/**
	 * @param {Number} level
	 * @return {void} 
	 */
	changeLevel(level) {
		this.stopTimer();
		this.model.openCards = [];
		this.model.setLevel(level);

		this.view.isFirst = true;
		this.view.isBlock = false;
		this.view.createGrid(
			this.model.getLevel().amountPair, 
			this.model.getLevel().cardToCompare, 
			this.model.getLevel().typesOfCars
		  );
	
		this.view.setStyle(
			this.model.getLevel().amountColumn,
			this.model.getLevel().amountRow
		)
	}


	setScore() {
		this.view.setScore(this.model.score)
	}

	/**
	 * @param {Object} card
	 * @return {void} 
	 */
	resetCards(card) {
		this.view.hideCards([card, ...this.model.currentCard])
		this.model.currentCard = [];
		this.view.isBlock = false;
	}

	/**
	 * @param {Object} card
	 * @return {Boolean} 
	 */
	checkSelected(card) {
		return this.model.openCards.includes(card) || this.model.currentCard.includes(card);
	}

	/**
	 * @param {Object} card
	 * @return {Boolean} 
	 */
	compareCard(card) {
		let framework = card.framework;
		let lastFramework = this.model.currentCard[this.model.currentCard.length -1].framework;
		return framework === lastFramework;
	}

	/**
	 * @param {Object} card
	 * @return {void} 
	 */
	successOpen(card) {
		this.model.setOpenCards([card, ...this.model.currentCard]);
		this.model.currentCard = [];
		this.view.isBlock = false;
		this.model.checkFinish()
	}

	/**
	 * @return {void}
	 */
	stopTimer() {
		clearInterval(this.timerID);
	}

	/**
	 * @return {void}
	*/
	startTimer() {
		this.timerID = setInterval(() => {
			this.view.setTime(this.model.time++)
		}, 1000)
	}
}
  

export default Controller;