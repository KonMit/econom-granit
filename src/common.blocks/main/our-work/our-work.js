const ourWorkItems = document.querySelector('.our-work__items');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const ourWorkLink = document.getElementById('our-work');

const close = () => {
  modal.classList.remove('open');
  modal.removeEventListener('click', close);

}

const resizesImage = (e) => {
  if(e.target.closest('.our-work__image')) {
    let src = e.target.getAttribute('src');
    modalImage.setAttribute('src', src);
    modal.classList.add('open');
    modal.addEventListener('click', close);
  }
}
if(ourWorkItems)
  ourWorkItems.addEventListener('click', resizesImage);



