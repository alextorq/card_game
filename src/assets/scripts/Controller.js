class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.view.createGrid(this.model.amountPair, this.model.typesOfCars);
      this.view.addHandler();




      this.view.event.addListener('', function() {


      })
    }
  
    successOpen() {
      this.model.openCards.push(parent)
      this.model.openCards.push(stage.currentCard)
      this.model.currentCard = null;
    }
  
    timer() {
      setInterval(() => {
        this.view.setTime(this.model.time++)
      }, 1000)
    }
}
  

export default Controller;