import { load, save } from '../utils/helpers';
import Popup from '../utils/Popup';
import $ from 'jquery';
import axios from 'axios';

Popup.init();

const urlApi = 'http://localhost:3001/api/v1'

class Form {
  constructor(form, host) {
    this.form = form;
    this.host = host;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  init() {
    this.form.on('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.validateForm());
    if (this.validateForm()) {
      this.postFormData()
      .then((response) => {
        if (response.status === 200) {
          save(response.data[0].token);
          window.location.href = "admin.html"
        } 
      })
      .catch((err) => {
          Popup.open('Неверный логин или пароль');
      })
    } else {
      return null;
    }
  }

  postFormData() {
    var reqFields = this.form.find('[name]');
    var dataObject = {};
    reqFields.each(function () {
        var $this = $(this);
        var value = $this.val();
        var name = $this.attr('name');
        dataObject[name] = value;
    });
    return axios.post(this.host, dataObject);
  }

  validateForm() {
    var email = this.form.find("[name='email']")[0];
    var password = this.form.find("[name='password']")[0];
    let isValid = false;
    if (email.value && password.value) {
      isValid = true;
    } else {
      isValid = false;
      Popup.open('Заполните все данные!')
    }

    return isValid;
  }
}

const authForm = new Form($('#form'), `${urlApi}/auth/signin`);

export default authForm;