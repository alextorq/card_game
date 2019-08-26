import axios from 'axios';
import api from '../api';
import uuid from 'uuid';

class StatisticController {
    constructor(view, router, model) {
        this.list = [];
        this.view = view;
        this.router = router;
        this.model = model ? model : null;
        this.saveUser();
    }
    loadList(id) {
        axios.get(api.prefix + api.statistic.all)
        .then((response) => {
            this.list = response.data.sort(this.sort);
            this.view.showStatistic(this.list, id);
 
        })
        .catch(() => {});
    }
    sort(a, b) {
        let ratingA = a.score / a.time; 
        let ratingB = b.score / b.time;
        return ratingA - ratingB;
    }
    askName() {
       this.name = this.view.showFormForName() || 'undefined_cat';
    }
    setUuidToLocalStorage(id) {
        localStorage.setItem('uuid', id);
    }
    getUuidFromLocalStorage() {
        return localStorage.getItem('uuid') || null;
    }
    saveUser() {
        if (this.model) {
            this.askName();
            let id = uuid();
            this.setUuidToLocalStorage(id);
            axios.post(api.prefix + api.statistic.create, {
                time: this.model.time,
                name: this.name,
                score: this.model.score,
                uuid: id
            })
            .then(() => {this.loadList(id);})
            .catch(() => {alert('something went wrong');});
        }else {
            this.loadList(this.getUuidFromLocalStorage());
        }
    }
}

export default StatisticController;