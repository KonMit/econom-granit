const ourWorkItems = document.querySelector('.our-work__items');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');


const close = () => {
  modal.classList.remove('open');
}

const resizesImage = (e) => {
  if(e.target.closest('.our-work__image')) {
    let src = e.target.getAttribute('src');
    modalImage.setAttribute('src', src);
    modal.classList.add('open');
    modal.addEventListener('click', close);
  }
}


ourWorkItems.addEventListener('click', resizesImage);