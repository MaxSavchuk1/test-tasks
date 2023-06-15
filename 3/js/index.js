'use strict';

const busyEmails = [
  'qwer@gmail.com',
  'test@gmail.com',
  'test@ukr.net',
  'qwer@qwer.qwer',
];

const formData = { name: '', email: '', password: '' };

const form = document.forms.main;

const {
  name: nameInput,
  email: emailInput,
  password: passwordInput,
  acceptAll: acceptAllInput,
  submitButton,
} = form;

const inputs = [nameInput, emailInput, passwordInput, acceptAllInput];

const validate = {
  isValidName: true,
  isValidEmail: true,
  isValidPassword: true,
  isValidAcceptAll: true,

  get isValidForm () {
    return (
      this.isValidName &&
      this.isValidEmail &&
      this.isValidPassword &&
      this.isValidAcceptAll
    );
  },

  touch () {
    this.email();
    this.acceptAll();
    this.password();
    this.name();
  },

  disableButton () {
    submitButton.classList.add('disabledButton');
    submitButton.disabled = true;
  },

  enableButton () {
    submitButton.classList.remove('disabledButton');
    submitButton.disabled = false;
  },

  createErrorElement () {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    return errorElement;
  },

  addErrorElement (element) {
    if (!element.nextElementSibling) {
      element.classList.add('invalid');
      const errorElement = this.createErrorElement();
      element.parentElement.append(errorElement);
    }
  },

  removeErrorElement (element) {
    if (element.nextElementSibling) {
      element.nextElementSibling.remove();
      element.classList.remove('invalid');
    }
  },

  email () {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;

    if (emailRegex.test(emailInput.value)) {
      this.isValidEmail = true;
      this.removeErrorElement(emailInput);
      return true;
    }

    this.isValidEmail = false;
    this.disableButton();
    this.addErrorElement(emailInput);
    emailInput.nextElementSibling.innerText = emailInput.value.trim()
      ? 'Это не похоже на валидный адрес почты'
      : 'Введите email';
    return false;
  },

  acceptAll () {
    if (!acceptAllInput.checked) {
      this.isValidAcceptAll = false;
      this.disableButton();
      this.addErrorElement(acceptAllInput);
      acceptAllInput.nextElementSibling.innerText = 'Надо согласиться!';
      return false;
    }
    this.isValidAcceptAll = true;
    this.removeErrorElement(acceptAllInput);
    return true;
  },

  password () {
    const setInvalidPassword = errorText => {
      this.isValidPassword = false;
      this.disableButton();
      this.addErrorElement(passwordInput);
      passwordInput.nextElementSibling.innerText = errorText;
    };

    if (passwordInput.value.length <= 5) {
      setInvalidPassword('Пароль должен быть больше 5 символов');
      return false;
    }
    if (/^(?:[a-zA-Z]+|\d+)$/.test(passwordInput.value)) {
      setInvalidPassword('Простой пароль');
      return false;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(passwordInput.value)) {
      setInvalidPassword(
        'Пароль должен содержать только латинские буквы, цифры, нижнее подчеркивание (_), тире (-)'
      );
      return false;
    }
    this.isValidPassword = true;
    this.removeErrorElement(passwordInput);
    return true;
  },

  name () {
    const nameRegex = /^[a-zA-Z]{2,}$/;
    if (nameInput.value) {
      if (nameRegex.test(nameInput.value)) {
        this.isValidName = true;
        this.removeErrorElement(nameInput);
        return true;
      }
      this.isValidName = false;
      this.disableButton();
      this.addErrorElement(nameInput);
      nameInput.nextElementSibling.innerText =
        'Имя должно содержать минимум 2 латинские буквы и только буквы';
      return false;
    }
    this.isValidName = true;
    this.removeErrorElement(nameInput);
  },
};

function inputHandler () {
  formData.name = nameInput.value;
  formData.email = emailInput.value;
  formData.password = passwordInput.value;

  !validate.isValidEmail && validate.email();
  !validate.isValidPassword && validate.password();
  !validate.isValidName && validate.name();
  !validate.isValidAcceptAll && validate.acceptAll();

  if (validate.isValidForm) {
    validate.enableButton();
  }
}

function blurHandler (e) {
  if (e.target.name in validate) {
    validate[e.target.name]();
  }
}

inputs.forEach(el => {
  el.addEventListener('input', inputHandler);
  el.addEventListener('blur', blurHandler);
});

const passwordVisibilityToggle = document.querySelector(
  '.passwordVisibilityToggle'
);
passwordVisibilityToggle.addEventListener('click', e => {
  e.currentTarget.classList.toggle('show');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
  passwordInput.focus();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  validate.touch();
  if (!validate.isValidForm) {
    return false;
  }

  console.log('Форма отправлена >>>', formData);

  if (busyEmails.some(email => email === formData.email)) {
    validate.isValidEmail = false;
    validate.disableButton();
    validate.addErrorElement(emailInput);
    emailInput.nextElementSibling.innerText = 'Email уже используется';
  }
});
