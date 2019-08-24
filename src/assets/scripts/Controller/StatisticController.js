import axios from 'axios';
import api from '../api';

class StatisticController {
    constructor(view, router, model) {
        this.list = [];
        this.view = view;
        this.router = router;
        this.model = model ? model : null;
        this.loadList();
        this.saveUser();
    }
    loadList() {
        axios.get(api.prefix + api.statistic.all)
        .then((response) => {
            this.list = response.data;
            this.view.showStatistic(this.list);
        })
        .catch(() => {});
    }
    askName() {
        this.name = '';

    }
    saveUser() {
        if (this.model) {
            axios.post(api.prefix + api.statistic.create, {
                time: this.model.time,
                name: this.name,
                score: this.model.score 
            })
            .then(() => {
                
            })
            .catch(() => {});
        }
    }
}

export default StatisticController;