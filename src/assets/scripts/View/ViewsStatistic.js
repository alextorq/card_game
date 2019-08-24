class ViewsStatistic {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <ul class="statistic__list">
            </ul>
        `;
    }
	/**
	 * 
	 * @param {Object} user 
	 * @return {Object} 
	 */
	createItem(user) {
		let template = `
        <li class="statistic__list">
            <div class="name">name_</div>
            <div class="time">time_</div>
            <div class="score">score_</div>
        </li>
		`;
        let itemWrapper = document.createElement('div');
        let str = template.replace('name_', user.name);
        str = str.replace('time_', user.time);
        str = str.replace('score_', user.score);
		itemWrapper.innerHTML = str;
		let item = itemWrapper.firstElementChild;
		return item;
    }

    showStatistic(users) {
        let wrapper = document.querySelector('.statistic__list');
        for (const user of users) {
            wrapper.appendChild(this.createItem(user));
        }
    }
}

export default ViewsStatistic;