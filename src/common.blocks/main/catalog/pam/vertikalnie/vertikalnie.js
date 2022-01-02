const contentBoxItems = document.querySelector('.content-box__items');
const pagination = document.getElementById('#pag_1');
const html = document.querySelector('html');

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


async function getResponse() {
  let response = await fetch('./assets/JSON/vert.json');

  if(response.ok) {
    let vertCatalog = await response.json();
    vertCatalog.forEach((item, i) => {
      if(item === null) {

      } else {
        addElement(item.url, item.id);
      }
      // console.log(addElement(item.url, item.id));
    });
  }
}
getResponse();
