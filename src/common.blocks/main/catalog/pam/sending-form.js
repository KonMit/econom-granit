import { applyDelete } from "./apply";
export function sendingForm(form) {
  const sendingForm = form;
  const thanksPopup = document.querySelector('.thanks-popup');

  const validateRegNumber = /^(\+7|7|8) ?\(?[0-9]{3}\)?[-| ]?[0-9]{3}[-| ]?[0-9]{2}[-| ]?[0-9]{2}$/;
  // event.addEventListener('submit', formSend);

  async function formSend() {
    let error = formValidate(sendingForm);  
    let formData = new FormData(sendingForm);

    if(error === 0) {
      sendingForm.classList.add('_sending');
      
      let response = await fetch('sendtelegram.php', {
        method: 'POST',
        body: formData,
      });
      if(response.ok) {
        let result = await response.json();
        sendingForm.reset();
        // thanksPopup.classList.add('active');
        // const thanksPopupClose = document.querySelector('.thanks-popup__close');
        // thanksPopupClose.addEventListener('click', () => {
        //   thanksPopup.classList.remove('active');
        // });
        sendingForm.classList.remove('_sending');
        applyDelete(sendingForm);
      } else {
        // const thanksPopupClose = document.querySelector('.thanks-popup__close');
        // thanksPopupClose.addEventListener('click', () => {
        //   thanksPopup.classList.remove('active');
        // });
        sendingForm.classList.remove('_sending');
        
      }

    } else {
      // alert('Заполните обязательные поля');
    }
  }

  const formValidate = (form) => {
    let error = 0;
    const sendingFormReq = form.querySelectorAll('._req');

    sendingFormReq.forEach((item, i) => {
      const input = item;

      formRemoveError(input);

      if(input.closest('._number')) {
        const numberCheck = validateRegNumber.test(input.value);
        if (!numberCheck) {
          formAddError(input);
          error++;
        }
      } else if(input.value === '') {
        formAddError(input);
        error++;
      }
    });
    return error;
  }


  const formAddError = (input) => {
    input.classList.add('_error');
  }

  const formRemoveError = (input) => {
    input.classList.remove('_error');
  }
  formSend();
}