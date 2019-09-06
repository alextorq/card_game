import Stage from './Stage';

export default class CardFSM {
    constructor(Stage) {
        /**
		 * @type {Array}
		 */
		this.openCards = [];
		/**
		 * @type {Array}
		*/
        this.currentCard = [];
        
        this.setStage(Stage);
    }

    setStage(Stage) {
        this.stage = new Stage(this);
    }

	/**
	 * @param {Object} card
	 * @return {Boolean} 
	 */
	checkSelected(card) {
		return this.model.openCards.includes(card) || this.model.currentCard.includes(card);
	}
 
}