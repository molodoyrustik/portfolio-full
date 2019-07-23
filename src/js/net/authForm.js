import axios from 'axios';
import Popup from '../utils/Popup';

export default {
  init() {
    Popup.init();
    const signupForm = document.querySelector('#signin-form');
    if (signupForm) {
      signupForm.addEventListener('submit', handleSubmit);

      function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target;
  
        if(!email.value || !password.value) {
          Popup.open('Заполните все поля');
          return null;
        }
  
        const data = {
          email: email.value,
          password: password.value
        }
  
        axios.post('/signin', data)
        .then((res) => {
        let { flag, message } = res.data;
        if (!flag) {
          Popup.open(message);
        } else {
          Popup.open(message);
        }
        signupForm.reset();
        })
        .catch((err) => {
          console.log(err);
          Popup.open('Произошла ошибка');
        })
      }
    }
  }
}