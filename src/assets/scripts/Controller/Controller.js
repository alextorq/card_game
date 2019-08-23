const TIME_TO_OPEN = 1300;

class Controller {
	constructor(model, view, router) {
		this.model = model;
		this.view = view;
		this.router = router;
		this.status = false;
		this.changeLevel(0);

		this.model.event.addListener('finish', () => {
			this.changeLevel(this.model.currentLevel + 1);
		});

		this.model.event.addListener('game_over', () => {
			this.status = true;
			this.view.showAllCards();
			setTimeout(() => {
				this.view.reset(true);
				this.stopTimer();
				this.router.push({name: 'GAME_OVER'});
			}, 5000);
		});
		

		this.view.event.addListener('firstClick', () => {
			this.startTimer();
		});

		this.view.event.addListener('selectCard', (card) => {
			// Если карта уже открыта то выходим 
			if (this.checkSelected(card)) {return;}

			this.view.showCard(card);
			this.setScore(false);

			// Если это первая карта в паре то выходим
			if (!this.model.currentCard.length) {
				this.model.setCurrentCard(card);
			} else {
				let status = this.compareCard(card);
				if (!status) {
					this.view.isBlock = true;
					setTimeout(() => {
						this.resetCards(card);
					}, TIME_TO_OPEN);
				} else {
					// проверяем если количество карт недостаточно для полного открытия карт 
					// добавляем их в пару и выходим
					if (this.model.currentCard.length < this.model.getLevel().cardToCompare - 1) {
						this.model.setCurrentCard(card);
						return;
					}
					this.successOpen(card);
					this.setScore(true);
				}
			}
			this.model.checkFinishOrGameOver();
		});
	}

	/**
	 * @param {Number} level
	 * @return {void} 
	 */
	changeLevel(level) {
		this.stopTimer();
		this.model.openCards = [];


		let status = this.model.setLevel(level);
		if (status) {
			this.router.push();
			return;
		}

		this.view.createGrid(
			this.model.getLevel().amountPair, 
			this.model.getLevel().cardToCompare, 
			this.model.getLevel().typesOfCars
			);

		this.view.setStyle(
			this.model.getLevel().amountColumn,
			this.model.getLevel().amountRow
		);
	}


	/**
	 * 
	 * @param {Boolean} success 
	 * @return {void}
	 */
	setScore(success) {
		let increment = success ? this.model.getLevel().scoreSuccess : - this.model.getLevel().scoreOpen;
		this.model.score = this.model.score + increment;	
		this.view.setScore(this.model.score);
	}

	/**
	 * @param {Object} card
	 * @return {void} 
	 */
	resetCards(card) {
		if (this.status) {return;}
		this.view.hideCards([card, ...this.model.currentCard]);
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
			this.view.setTime(this.model.time++);
		}, 1000);
	}
}
  

export default Controller;