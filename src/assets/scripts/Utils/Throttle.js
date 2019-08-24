class Throttle {
    constructor(timeDelay) {
        this.timeDelay =  timeDelay || 200;
    }
    delay(func, newDelay) {
        clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
            func();
        }, newDelay || this.timeDelay);
    }
}

export default Throttle;