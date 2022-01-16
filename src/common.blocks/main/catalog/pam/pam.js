import { apply } from "./apply";
const numberOfItems = 30;
const dropdownMenuContent = document.querySelector('.dropdown-menu__content');
const catalogBox = document.querySelector('.catalog__box');

let itemsOfCatalog; // Массив товаров

const createMainContent = (mainContainer, categoryTitle) => {
  let mainContent = document.createElement('div');
  mainContent.classList.add('main__content');
  mainContent.classList.add('content-box');

  mainContent.innerHTML = `
    <div class="content-box__wrapper"> 
      <div class="content-box__category">
        <div class="content-box__title-box title-box">
          <h3 class="content-box__title title title_h3">Памятники из гранита - ${categoryTitle}</h3>
          <div class="content-box__question question"><img class="question__b question__big" src="assets/img/common.blocks/main/question/question.svg" alt="tooltip">
            <div class="question__tooltip">
              <span class="question__tooltip-text">${categoryTitle}</span>
            </div>
          </div>
        </div>
        <div class="content-box__items">

        </div>
          <div class="modal">
            <div class="modal__content">
              <img class="modal__image" src="assets/img/common/img/pam/vert/7.jpg" alt="image">
            </div>
          </div>
      </div>
    </div>
    <div class="main__pagination pagination">
      <div class="pagination__wrapper"> 
          <div class="pagination__pages">
          </div>
        </div>
      </div>
    </div>
    `;

  return mainContent;
} // создает структуру контента товара
const addMainContent = (mainContainer, categoryTitle) => {
  mainContainer.innerHTML = '';
  mainContainer.insertAdjacentElement('beforeend', createMainContent(mainContainer, categoryTitle));
} // выводит структура контента товара на страницу

const paginationPagesFunc = () => {
  const paginationPages = document.querySelector('.pagination__pages'); // находим блок страниц пагинации
  const contentBoxItems = document.querySelector('.content-box__items'); // находим блок с элементами товаров
 
  paginationPages.addEventListener('click', (event) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // отслеживаем клик по блоку страниц пагинации
    if (event.target.closest('.pagination__button')) {
      // если ближайший родитель элемента на который мы кликнули является кнопкой пагинации, то:
      let numberOfPage; // номер страницы пагинации
      if (event.target.classList.contains('pagination__button')) {
        // если исходный элемент сама кнопка
        numberOfPage = event.target.querySelector('.pagination__number').textContent; // присваиваем переменной номер страницы пагинации
      } else if (event.target.classList.contains('pagination__number')) {
        // если исходный элемент блок блок с текстом внутри кнопки
        numberOfPage = parseInt(event.target.closest('.pagination__number').textContent); // присваиваем переменной номер страницы пагинации
      } 
      let start = (numberOfPage - 1) * numberOfItems; // находим стартовую позицию в массиве для вывода товаров на страницу
      let end = start + numberOfItems;  // находим конечную позицию в массиве для вывода товаров на страницу
      contentBoxItems.innerHTML = ``; // очищаем блок товаров
      for(let i = start; i < end; i++) {
        // пока находимся в диапозоне start - end выполняем:
        console.log("Start:", start);
        console.log('i:', i);

        let item = itemsOfCatalog[i]; // присваеиваем переменной элемент массива товаров
        if (item === undefined || item === null) {
          continue
        } else {
          addElement(item.url, item.id); // добавляем элемент на страницу (в content-box__items)
        }
      }
      let activeButton = paginationPages.querySelector('._active'); // присваиваем пременной активную страницу
      activeButton.classList.remove('_active'); // делаем его неактивным

      event.target.closest('.pagination__button').classList.add('_active'); // "активируем" кнопку на которую кликнули

      
    }
    
  });
}
const checkFileJson = (catalogItem) => {
  if (catalogItem.id === 'fig') {
    let jsonFile = './assets/JSON/fig.json';
    getResponse(jsonFile); // получаем json файл с сервера
  } else if (catalogItem.id === 'goriz') { 
    let jsonFile = './assets/JSON/goriz.json';
    getResponse(jsonFile); // получаем json файл с сервера
  } else if (catalogItem.id === 'stand') {
    let jsonFile = './assets/JSON/stand.json';
    getResponse(jsonFile); // получаем json файл с сервера
  } else if (catalogItem.id === 'vert') {
    let jsonFile = './assets/JSON/vert.json';
    getResponse(jsonFile); // получаем json файл с сервера  
  } else if (catalogItem.id === 'obrs') {
    let jsonFile = './assets/JSON/obrs.json';
    getResponse(jsonFile); // получаем json файл с сервера  
  } else if (catalogItem.id === 'svechi') {
    let jsonFile = './assets/JSON/svech.json';
    getResponse(jsonFile); // получаем json файл с сервера  
  } else if (catalogItem.id === 'zveti') {
    let jsonFile = './assets/JSON/zveti.json';
    getResponse(jsonFile); // получаем json файл с сервера  
  } else if (catalogItem.id === 'portret') {
    let jsonFile = './assets/JSON/portret.json';
    getResponse(jsonFile); // получаем json файл с сервера  
  }
}
if (catalogBox !== null) {
  catalogBox.addEventListener('click', (event) => {
    const mainContainer = document.querySelector('.main__container'); // находим основной контейнер
    if(event.target.closest('._type-A')) {
      event.preventDefault();
    }
    if ((event.target.closest('.catalog__item') || event.target.closest('.dropdown-menu__product')) && !event.target.closest('.catalog__question') && event.target.closest('._type-A')) { 
      // проверяем, если кликнули на подкатегорию, то выполняем условия:
      let catalogItem = event.target.closest('.catalog__item'); // присваиваем переменной элемент подкатегории
      let categoryTitle = catalogItem.querySelector('.catalog__subtitle').textContent; // присваиваем переменной название подкатегории

      addMainContent(mainContainer, categoryTitle); // создаем и выводим страницу подкатегории с товарами из этой подкатегории
      // проверяем идентификатор подкатегории
      
      checkFileJson(catalogItem);
      
      paginationPagesFunc();
    }
  });
}
dropdownMenuContent.addEventListener('click', (event) => {
  if(event.target.closest('._type-A'))
    event.preventDefault();
  const mainContainer = document.querySelector('.main__container'); // находим основной контейнер

  if (event.target.closest('.dropdown-menu__product') && event.target.closest('._type-A')) { 
    // проверяем, если кликнули на подкатегорию, то выполняем условия:
    let catalogItem = event.target.closest('.dropdown-menu__product'); // присваиваем переменной элемент подкатегории
    let categoryTitle = catalogItem.querySelector('.dropdown-menu__text').textContent; // присваиваем переменной название подкатегории

    addMainContent(mainContainer, categoryTitle); // создаем и выводим страницу подкатегории с товарами из этой подкатегории
    // проверяем идентификатор подкатегории
    checkFileJson(catalogItem);

    paginationPagesFunc();
  }
});

function createItem(url, id) {
  // функция получает: url - путь до изображения товара; id - идентификатор товара.
  let contentBoxItem = document.createElement('div');
  contentBoxItem.classList.add('content-box__item');
  contentBoxItem.innerHTML = `
      <button id="${id}" class="content-box__link" type="button">
        <img class="content-box__image" src="${url}" alt="catalog-image">
      </button>
      <button class="content-box__button button apply" type="button">оформить заявку</button>
  `;
  const elementApply = contentBoxItem.querySelector('.apply');
  apply(elementApply);
  return contentBoxItem;
} // Create a element for main (content-box__item)

function addElement(url, id) {
  // функция получает: url - путь до изображения товара; id - идентификатор товара.
  const contentBoxItems = document.querySelector('.content-box__items'); // присваеиваем константе блок с элементами товаров
  contentBoxItems.insertAdjacentElement('beforeend', createItem(url, id)); // добавляем элемент(товар) на страницу
} // add a element in main (content-box__items)

// === createPagination ===
function createPagination(i, state) {
  // state - string
  let paginationButton = document.createElement('button');
  paginationButton.type = 'button';
  paginationButton.classList.add('pagination__button');
  paginationButton.classList.add('pagination__button_page');
  paginationButton.classList.add('_page');
  if (state) {
    paginationButton.classList.add('_active');
  }

  paginationButton.id = `pag_${i}`;
  paginationButton.innerHTML = `
    <span class="pagination__number">${i}</span>
    `;
  return paginationButton;
} // create a pagination in content-box

// === addPagination ===
function addPagination(numberOfPages) {
  const paginationPages = document.querySelector('.pagination__pages'); // находим блок страниц пагинации
  for(let i = 1; i <= numberOfPages; i++){
    if (i === 1) {
      paginationPages.insertAdjacentElement('beforeend', createPagination(i, true)); // добавляем первый элемент пагинации и делаем активным
    } else {
      paginationPages.insertAdjacentElement('beforeend', createPagination(i, '')); // добавляем элемент пагинации
    }
  }
} // add a pagination
async function getResponse(jsonFile) {
  let response = await fetch(jsonFile); // отправляем запрос на сервер
  if(response.ok) {
    // если запрос удачный:
    itemsOfCatalog = await response.json(); // присваиваем переменной преобразованный json файл
    let numberOfPam = itemsOfCatalog.length; // присваиваем переменной длину массив
    let numberOfPages = Math.ceil(numberOfPam/numberOfItems); // вычислаем количество страниц пагинации

    let start = 0;
    let end = numberOfItems;
    for(let i = start; i < end; i++) {
      // пока находимся в диапозоне start - end выполняем:
      let item = itemsOfCatalog[i]; // присваеиваем переменной элемент массива товаров

      if (item === null) {
        continue
      } else {
        addElement(item.url, item.id); // добавляем элемент на страницу (в content-box__items)
      }
    }
    addPagination(numberOfPages); // добавляем на страницу пагинацию
  } 
} // отправляет запрос на сервер, получает json файл с товарами, выводит первые 20 на страницу и добавляет пагинацию



