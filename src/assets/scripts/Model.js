class Model {
    constructor() {
        this.openCards = [];
        this.currentCard = null;

        this.levels = [
            {
                amountColumn: 5,
                amountRow: 5,
                amountPair: 5,
                cardToCompare: 2
            },
            {
                amountColumn: 5,
                amountRow: 5,
                amountPair: 5,
                cardToCompare: 2
            },
            {
                amountColumn: 5,
                amountRow: 5,
                amountPair: 5,
                cardToCompare: 2
            },
        ];
        this.typesOfCars = [
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
      this.amountColumn = 5;
      this.amountRow = 5;
      this.amountPair = 5;
      this.time = 0;
    }

    /**
     * Set current level
     * @param {Object} level
     */
    setLevel(level) {
        this.amountColumn = level.amountColumn;
        this.amountRow = level.amountRow;
        this.amountPair = level.amountPair;

    }

    /**
     * @param {Object} card
     * @return {void}
     */
    setCurrentCard(card) {
        this.currentCard = card;
    }
}


export default Model;