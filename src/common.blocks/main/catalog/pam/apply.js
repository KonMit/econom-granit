import { sendingForm } from "./sending-form";

const body = document.querySelector('body');

function createModalApply() {
  let modalApply = document.createElement('form');
  modalApply.classList.add('modal-apply');
  modalApply.innerHTML = `
    <div class="modal-apply__wrapper">
      <div class="modal-apply__top">
        <h3 class="title title_h4">оформить заявку</h3>
        <button type="button" class="modal-apply__close"></button>
      </div>
      <div class="modal-apply__inputs">
        <input name="fullname" type="text" class="modal-apply__input  _req" placeholder="ФИО">
        <input name="number" type="text" pattern="^(\+7|7|8) ?\(?[0-9]{3}\)?[-| ]?[0-9]{3}[-| ]?[0-9]{2}[-| ]?[0-9]{2}$" class="modal-apply__input _number _req" placeholder="Номер телефона">
      </div>
      <button class="modal-apply__button button modal-apply__submit" type="submit">отправить</button>
    </div>
  `;
  return modalApply;
}

function applyRemove(elDelete) {
  elDelete.remove(elDelete);
}
export function applyDelete(elDelete) {
  body.style.overflow = 'visible';
  elDelete.style.opacity = '0';
  setTimeout(applyRemove, 500, elDelete);
}
function addModalApply() {
  body.insertAdjacentElement('beforeend', createModalApply());

  // applySubmit();

}
export function apply(element) {
  // console.log(element);
  element.addEventListener('click', (event) => {
    body.style.overflow = 'hidden';
    addModalApply();

    const modalApply = document.querySelector('.modal-apply');
    modalApply.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
    if (target.classList.contains('modal-apply__close') || target.classList.contains('modal-apply')) {
      applyDelete(modalApply);
    } else if (target.classList.contains('modal-apply__submit')) {
      sendingForm(event.currentTarget);
    }
  });
  });
}