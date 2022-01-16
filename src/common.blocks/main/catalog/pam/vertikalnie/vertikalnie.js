const numberOfItems = 20;
const contentBox = document.querySelector('.content-box');
const contentBoxItems = document.querySelector('.content-box__items');
const paginationPages = document.querySelector('.pagination__pages');
const html = document.querySelector('html');

let itemsOfCatalog; // Массив товаров

function createItem(url, id) {
  let contentBoxItem = document.createElement('div');
  contentBoxItem.classList.add('content-box__item');
  contentBoxItem.innerHTML = `
      <button id="${id}" class="content-box__link" type="button">
        <img class="content-box__image" src="${url}" alt="catalog-image">
      </button>
      <button class="content-box__button button" type="button">оформить заявку</button>
  `;
  return contentBoxItem;
}
function addElement(url, id) {
  contentBoxItems.insertAdjacentElement('beforeend', createItem(url, id));
}

function paginationCreate(i, state) {
  // state - string
  let pagination = paginationPages;
  pagination.insertAdjacentHTML( 'beforeend', `
        <button class="pagination__button pagination__button_page _page ${state}" id="pag_${i}" type="button">
          <span class="pagination__number">${i}</span>
        </button>`);
  return pagination;
}
function addPagination(numberOfPages) {
  for(i = 2; i <= numberOfPages; i++){
    if (i === 1) {
      contentBox.insertAdjacentElement('beforeend', paginationCreate(i, '_active'));
    } else {
      contentBox.insertAdjacentElement('beforeend', paginationCreate(i, ''));
    }
  }
}
async function getResponse() {
  let response = await fetch('./assets/JSON/vert.json');
  if(response.ok) {
    itemsOfCatalog = await response.json();
    let numberOfPam = itemsOfCatalog.length;
    let numberOfPages = numberOfPam/numberOfItems;
    for(i = 0 ; i < itemsOfCatalog.length; i++) {
      let item = itemsOfCatalog[i];

      if(item === null) {
        continue
      } else if (i < numberOfItems) {
        addElement(item.url, item.id);
      }
      // console.log(addElement(item.url, item.id));
    };
    addPagination(numberOfPages); 
  } 
}
paginationPages.addEventListener('click', (event) => {
  if (event.target.closest('.pagination__button')) {
    let paginationNumber;
    if (event.target.closest('.pagination__number')) {
      paginationNumber = event.target;
    } else {
      paginationNumber = event.target.querySelector('.pagination__number');
    }
    let numberOfPage = parseInt(paginationNumber.textContent); // Номер страницы

    let start = (numberOfPage - 1) * numberOfItems;
    let end = start + numberOfItems;

    contentBoxItems.innerHTML = ``;

    for(i = start; i < end; i++) {
      let item = itemsOfCatalog[i];

      if (item === null) {
        continue
      } else {
        addElement(item.url, item.id);
      }
    }
  }

});


getResponse();
