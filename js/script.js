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
			const pageLinks = document.querySelectorAll('.pagination a');

			e.preventDefault();
			for (let i = 0; i < pageLinks.length; i += 1) {
				const pageLink = pageLinks[i];
				pageLink.classList.remove('active');
			}
			e.target.classList.add('active');
			pageIndex = e.target.textContent;
			showPage(list, pageIndex);
		});
		li.appendChild(a);
		ul.appendChild(li);
	}

	pagination.className = 'pagination';
	pagination.appendChild(ul);
	page.appendChild(pagination);
};

function resetPageLinks(list) {
	const pagination = document.querySelector('.pagination');

	page.removeChild(pagination);
	appendPageLinks(list);
}

function addSearchComponent() {
	const header = document.querySelector('.page-header'),
		search = document.createElement('div'),
		input = document.createElement('input'),
		button = document.createElement('button'),
		doSearch = (list) => {
			// find name in listitems
			const searchIndices = [];

			// create new list
			for (let i = 0; i < list.length; i += 1) {
				const li = list[i];
				if (li.querySelector('h3').textContent.includes(input.value)) {
					searchIndices.push(i);
				}
			}

			console.log(searchIndices);
			pageIndex = 1;
			resetPageLinks(searchIndices);
		};

	search.className = 'student-search';
	input.setAttribute('placeholder', 'Search for students...');
	button.textContent = 'Search';
	button.addEventListener('click', (e) => {
		e.preventDefault();
		doSearch(listItems);
	});

	search.appendChild(input);
	search.appendChild(button);
	header.appendChild(search);
};

showPage(listItems, pageIndex);
appendPageLinks(listItems);
addSearchComponent();
