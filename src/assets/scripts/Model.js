class Model {
    constructor() {
        this.openCards = [];
        this.currentCard = null;
        this.isBlock = false;
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
}


export default Model;