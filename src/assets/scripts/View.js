import PublisherSubscriber from './PubSub';



class View {
    constructor() {
      this.cardWrapper = document.querySelector('.memory-game');
      this.event = new PublisherSubscriber();
      this.isFirst = false;
      this.isBlock = false;
    }

    setStyle(amountColumn, amountRow) {
      let root = document.documentElement;
      root.style.setProperty('--cars_width', (100 / amountColumn) + 'vw');
      root.style.setProperty('--card_height', (100 / amountRow) + 'vh');
    }
  
    addHandler() {
      this.cardWrapper.addEventListener( 'click', (event) =>{
          let card = event.target.closest('.memory-card');
          if (!card || this.isBlock) {return}

          this.event.fireEvent('selectCard', {
              card,
              framework: card.getAttribute('data-framework')
          });

          if (!this.isFirst) {
              this.isFirst = true;
              this.event.fireEvent('firstClick', {});
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

    createGrid (k, typesOfCars) {
      let cardWrapper = document.querySelector('.memory-game');
      while (k) {
        for (let type of typesOfCars) {
          cardWrapper.appendChild(this.createCard(type.name)) 
        }
        k--;
      }
      this.addHandler();
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