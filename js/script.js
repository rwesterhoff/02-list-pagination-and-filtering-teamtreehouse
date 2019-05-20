/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

let pageIndex = 1;
const listItems = document.querySelectorAll('.student-item'),
	maxItems = 10,
	page = document.querySelector('.page'),
	studentList = document.querySelector('.student-list');

/*
* Get all the items on the page,
* hide them and show only what should be on the page.
*/
function showPage(list, page) {
	const firstItem = (page * maxItems) - maxItems,
		lastItem = (page * maxItems) - 1;

	for (let i = 0; i < list.length; i += 1) {
		const li = list[i];
		i >= firstItem && i <= lastItem ? li.style.display = '' : li.style.display = 'none';
	}
}

/*
* Add a page number per maxItems,
* if there is more than 1 page
* */
function appendPageLinks(list) {
	if (list.length <= maxItems) return;

	const totalPages = Math.ceil(list.length / maxItems),
		pagination = document.createElement('div'),
		ul = document.createElement('ul');

	for (let i = 1; i <= totalPages; i += 1) {
		const pageNumber = i,
			li = document.createElement('li'),
			a = document.createElement('a');

		a.textContent = pageNumber;
		if (pageIndex === pageNumber) a.classList.add('active');
		a.setAttribute('href', '#');
		a.addEventListener('click', (e) => {
			const pageLinks = document.querySelectorAll('.pagination a'),
				clickedLink = e.target;

			e.preventDefault();
			for (let i = 0; i < pageLinks.length; i += 1) {
				pageLinks[i].classList.remove('active');
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
}

/*
* Clear pagination if available
* */
function resetPageLinks(list) {
	const pagination = document.querySelector('.pagination');

	if (pagination) page.removeChild(pagination);
	appendPageLinks(list);
}

/*
* Add a search component that listens to a click event
* */
function addSearchComponent() {
	const header = document.querySelector('.page-header'),
		divSearch = document.createElement('div'),
		input = document.createElement('input'),
		button = document.createElement('button');

	divSearch.className = 'student-search';
	input.setAttribute('placeholder', 'Search for students...');
	input.addEventListener('keyup', (e) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			doSearch(listItems);
		}
	});

	button.textContent = 'Search';
	button.addEventListener('click', (e) => {
		e.preventDefault();
		doSearch(listItems);
	});

	divSearch.appendChild(input);
	divSearch.appendChild(button);
	header.appendChild(divSearch);
}

/*
* Create a list item and add to student list
* */
function createListItem(item) {
	const li = document.createElement('li'),
		divStudentDetails = document.createElement('div'),
		img = document.createElement('img'),
		name = document.createElement('h3'),
		email = document.createElement('span'),
		divJoinedDetails = document.createElement('div'),
		date = document.createElement('span'),
		setContentItem = (parent, elm, child01, child02, attr = null) => {
			const child = item.children[child01].children[child02];
			attr === null ? elm.textContent = child.textContent
				: elm.setAttribute(child.attributes[attr].nodeName,
				child.attributes[attr].textContent);
			parent.appendChild(elm);
		};

	li.className = 'student-item cf';
	divStudentDetails.className = 'student-details';
	img.className = 'avatar';
	email.className = 'email';
	divJoinedDetails.className = 'joined-details';
	date.className = 'date';

	setContentItem(divStudentDetails, img, 0, 0, 1);
	setContentItem(divStudentDetails, name, 0, 1);
	setContentItem(divStudentDetails, email, 0, 2);
	setContentItem(divJoinedDetails, date, 1, 0);

	li.appendChild(divStudentDetails);
	li.appendChild(divJoinedDetails);

	studentList.appendChild(li);
}

/*
* Create a new student list
* */
function createList(list) {
	for (let i = 0; i < list.length; i += 1) {
		const li = list[i];
		createListItem(li);
	}
}

/*
* Reset the student list
* */
function resetStudentList(list) {
	let newListItems;

	list.length > 0 ? studentList.innerHTML = '' : studentList.innerHTML = `<h3>No results to display</h3>`;

	createList(list);
	newListItems = document.querySelectorAll('.student-item');
	pageIndex = 1;
	resetPageLinks(newListItems);
	showPage(newListItems, pageIndex);
}

/*
* Search student within a list and update
* */
function doSearch(list) {
	const searchResult = [],
		input = document.querySelector('.student-search input');

	list.forEach(function (item) {
		const student = item.querySelector('h3').textContent;
		if (student.includes(input.value)) searchResult.push(item);
	});

	input.value !== '' ? resetStudentList(searchResult) : resetStudentList(listItems);
}

/*
* Initialise view
* */
showPage(listItems, pageIndex);
appendPageLinks(listItems);
addSearchComponent();
