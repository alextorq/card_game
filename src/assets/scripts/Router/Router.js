class Router {
    constructor(routes = []) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            let callback = this.getComponent();
            if (callback) {
                callback(this);
            }
        });

        window.onpopstate = this.fire.bind(this);
    }


    fire(params) {
        let callback = this.getComponent();
        if (callback) {
            callback(this, params);
        }
    }

    /**
     * 
     * @param {String|Object} route 
     * @param {any} params 
     * @return {void}
     */
    push(route, params) {
        if (typeof route === 'string') {
            history.pushState({}, 'title', route);
        }
       if (typeof route === 'object' && route.name) {
            let component = this.routes.find((item) => {
                return item.name === route.name;
            });
            history.pushState({}, component.name || 'title', component.path);
       }
       this.fire(params);
    }

    getComponent() {
        let currentPath = window.location.pathname;
        let route = this.routes.find((item) => {
            return item.path === currentPath;
        });
        return route.component;
    }
}


export default Router;