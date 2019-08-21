const TIME_TO_OPEN = 1200;

class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.view.createGrid(this.model.amountPair, this.model.typesOfCars);

      this.view.event.addListener('firstClick', () => {
          this.startTimer();
      });

        this.view.event.addListener('selectCard', (event) => {
            if (this.checkSelected(event.card)) {return}

            event.card.classList.add('flip');

            if (!this.model.currentCard) {
                this.model.setCurrentCard(event.card);
            }

            else {
                let status = this.compareCard(event.card);
                if (!status) {
                    this.view.isBlock = true;
                    setTimeout(() => {this.resetCards(event.card)}, TIME_TO_OPEN);
                }
                else {
                    this.successOpen(event.card);
                }
            }
        });

    }

    resetCards(card) {
        this.model.currentCard.classList.remove('flip');
        card.classList.remove('flip');
        this.model.currentCard = null;
        this.view.isBlock = false;
    }

    checkSelected(card) {
        return this.model.currentCard === card && this.model.openCards.includes(card);
    }

    compareCard(card) {
        let framework = card.getAttribute('data-framework');
        let lastFramework = this.model.currentCard.getAttribute('data-framework');
        return framework === lastFramework;
    }

    successOpen(card) {
      this.model.openCards.push(card);
      this.model.openCards.push(this.model.currentCard);
      this.model.currentCard = null;
      this.view.isBlock = false;
    }
    stopTimer() {
        clearInterval(this.timerID);
    }
    startTimer() {
      this.timerID = setInterval(() => {
        this.view.setTime(this.model.time++)
      }, 1000)
    }
}
  

export default Controller;