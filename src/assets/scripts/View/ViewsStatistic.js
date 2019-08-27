class ViewsStatistic {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <h1 class="statistic__title">Statistic</h1>
            <a class="github_link" href="https://github.com/alextorq/card_game">github</a>
            <table class="statistic__list">
            <tbody class="statistic__list_body"> 
                <tr class="statistic__item">
                    <td class="name">Name</td>
                    <td class="time">Time</td>
                    <td class="score">Score</td>
                </tr>
            </tbody> 
            </table>
        `;
    }
	/**
	 * 
	 * @param {Object} user 
	 * @param {String|undefined} uuid 
	 * @return {Object} 
	 */
	createItem(user, uuid) {
		let template = `
        <tr class="statistic__item transition-up"> 
            <td class="name">name_</td>
            <td class="time">time_</td>
            <td class="score">score_</td>
        </tr>
		`;
        let itemWrapperTable = document.createElement('table');
        let itemWrapper = document.createElement('tbody');
        itemWrapperTable.appendChild(itemWrapper);
        let str = template.replace('name_', user.name);
        str = str.replace('time_', user.time);
        str = str.replace('score_', user.score);
		itemWrapper.innerHTML = str;
        let item = itemWrapper.firstElementChild;
        if (uuid && uuid === user.uuid) {
            item.classList.add('self');
        }
		return item;
    }

    showFormForName() {
        let name = prompt('enter your name');
        return name;
    }

    showStatistic(users, uuid) {
        let wrapper = document.querySelector('.statistic__list_body');
        for (const user of users) {
            wrapper.appendChild(this.createItem(user, uuid));
        }
        let allTR = document.querySelectorAll('.statistic__item');
        setTimeout(() => {
            for (const tr of allTR) {
                tr.classList.remove('transition-up');
            }
        }, 200);
   
    }
}

export default ViewsStatistic;