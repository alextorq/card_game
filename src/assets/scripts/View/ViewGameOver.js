function createInnerStructure(arrayCharts, cofDelay) {
	let fragment = document.createDocumentFragment();
	
	for (let index in arrayCharts) {
		let chart = arrayCharts[index];
		let innerNode = document.createElement('span');
		innerNode.style.animationDelay = index * cofDelay + 'ms';
		innerNode.innerHTML = chart;
		if (chart === ' ') {
			innerNode.innerHTML = '&nbsp;';
		}
		fragment.appendChild(innerNode);
	}
	return fragment;
}


class ViewGameOver {
    constructor(root, router) {
        this.router = router;
        root.innerHTML = `
            <div class="game_over">
                <h1></h1>
                <a href="/" class="refresh">try again</a>
            </div>
        `;
        this.animateView();
    }


    animateView() {
        let wrapper = document.querySelector('.game_over h1');
        wrapper.appendChild(createInnerStructure('GAME OVER', 200));
        let link = document.querySelector('a');
        link.addEventListener('click', (event) => {
            event.preventDefault();
            this.router.push('/');
        });
    }
}

export default ViewGameOver;