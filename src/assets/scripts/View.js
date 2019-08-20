import PublisherSubscriber from './PubSub';

const TIME_TO_OPEN = 1200;




class View {
    constructor() {
      this.cardWrapper = document.querySelector('.memory-game');
      this.event = new PublisherSubscriber();
    }
  
    compareCard(card, stage) {
      let framework = card.getAttribute('data-framework');
      let lastFramework = stage.currentCard.getAttribute('data-framework');
      return framework === lastFramework;
    }
  
    setStyle(amountColumn, amountRow) {
      let root = document.documentElement;
      root.style.setProperty('--cars_width', (100 / amountColumn) + 'vw');
      root.style.setProperty('--card_height', (100 / amountRow) + 'vh');
    }
  
    addHandler() {
      this.cardWrapper.addEventListener( 'click', function(event) {
      let card = event.target.closest('.memory-card');
      if (!parent) {return}

      this.event.f
    
      card.classList.add('flip');
    
      if (!this.stage.currentCard) {
        this.stage.currentCard = card;
      }
    
      else {
        let status = this.compareCard(card, stage);
        if (!status) {
          this.stage.isBlock = true;
          setTimeout(() => {this.resetCards(card, stage)}, TIME_TO_OPEN);
        }
        else {
          this.successOpen(stage);
        }
      }
    
      if (!isFirst) {
        isFirst = true;
        this.timer();
      }
    })
    }
    createCard(framework) {
        let template = `
        <div class="memory-card" data-framework="name">
          <img class="front-face" src="/image/name.svg" alt="frame" />
          <img class="back-face" src="/image/js-badge.svg" alt="JS Badge" />
        </div>
        `;
        let fragment = document.createElement('template');
        fragment.innerHTML = template.replace(new RegExp('name', 'g'), framework)
        return fragment.content;
    }
  
    setTime(time) {
      let timeWrap = document.querySelector('#time span');
      timeWrap.innerHTML = time;
    }
  
    resetCards(card, stage) {
      stage.currentCard.classList.remove('flip')
      card.classList.remove('flip');
      stage.currentCard = null;
      stage.isBlock = false;
    }
  
  
    createGrid (k, typesOfCars) {
      let cardWrapper = document.querySelector('.memory-game');
      while (k) {
        for (let type of typesOfCars) {
          cardWrapper.appendChild(this.createCard(type.name)) 
        }
        k--;
      }
      this.randomCard();
    }
  
    randomCard() {
      let cards = document.querySelectorAll('.memory-card');
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
      });
    }
  
  }

  
  export default View;