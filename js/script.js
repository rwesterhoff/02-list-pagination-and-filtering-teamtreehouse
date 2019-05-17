/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

let pageIndex = 1;
const listItems = document.querySelectorAll('li'),
	maxItems = 10,
	page = document.querySelector('.page');

/*
* Get all the items on the page,
* hide them and show only what should be on the page.
*/
function showPage(list, page) {
	const firstItem = (page * maxItems) - maxItems,
		lastItem = (page * maxItems) - 1;

	for (let i = 0; i < list.length; i += 1) {
		const li = list[i];
		if (i >= firstItem && i <= lastItem) {
			li.style.display = '';
		} else {
			li.style.display = 'none';
		}
	}
}

function appendPageLinks(list) {
	const totalPages = (list.length / maxItems),
		pagination = document.createElement('div'),
		ul = document.createElement('ul');

	for (let i = 0; i < totalPages; i += 1) {
		let pageNumber = i + 1;
		const li = document.createElement('li'),
			a = document.createElement('a');

		a.textContent = pageNumber;
		if (pageIndex === pageNumber) {
			a.classList.add('active');
		}
		a.setAttribute('href', '#');
		a.addEventListener('click', (e) => {
			const pageLinks = document.querySelectorAll('.pagination a'),
				clickedLink = e.target;

			e.preventDefault();
			for (let i = 0; i < pageLinks.length; i += 1) {
				const pageLink = pageLinks[i];
				pageLink.classList.remove('active');
			}
			clickedLink.classList.add('active');
			pageIndex = clickedLink.textContent;
			showPage(list, pageIndex);
		});
		li.appendChild(a);
		ul.appendChild(li);
	}

	pagination.className = 'pagination';
	pagination.appendChild(ul);
	page.appendChild(pagination);
};

showPage(listItems, pageIndex);
appendPageLinks(listItems);
