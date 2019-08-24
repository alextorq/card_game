import View from './View/View';
import Model from './Model/Model';
import Controller from './Controller/Controller';
import Router from './Router/Router';
import GAME_OVER from './View/ViewGameOver';
import STATISTIC from './Controller/StatisticController';
import ViewsStatistic from './View/ViewsStatistic';

let routesEnum = [
        {
            name: 'START',
            path: '/',
            component: function(router) {
                let root = document.getElementById('app');
                new Controller(new Model(), new View(root), router);
            }
        },
        {
            name: 'GAME_OVER',
            path: '/game_over',
            component: function(router) {
                let root = document.getElementById('app');
                new GAME_OVER(root, router);
            }
        },
        {
            name: 'STATISTIC',
            path: '/statistic',
            component: function(router, params) {
                let root = document.getElementById('app');
                new STATISTIC(new ViewsStatistic(root), router, params);
            }
        }
    ];


new Router(routesEnum);
