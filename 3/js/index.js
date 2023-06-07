'use strict';

const busyEmails = [
  'qwer@gmail.com',
  'test@gmail.com',
  'test@ukr.net',
  'qwer@qwer.qwer',
];

const form = document.getElementById('signUpForm');

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const acceptAllInput = document.getElementById('acceptAll');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const acceptError = document.getElementById('acceptError');
const submitButton = document.getElementById('submitButton');

const inputs = document.querySelectorAll('input');

inputs.forEach(el => el.addEventListener('input', inputHandler));

let isTouchedForm = false;
let isErrorState = false;

function inputHandler (e) {
  if (isTouchedForm) {
    if (e.target.id === 'acceptAll') {
      isValidAcceptTerms();
    }
    if (e.target.id === 'nameInput') {
      isValidName();
    }
    if (e.target.id === 'emailInput') {
      isValidEmail();
    }
    if (e.target.id === 'passwordInput') {
      isValidPassword();
    }
  }
  if (!isErrorState) {
    submitButton.disabled = false;
    submitButton.classList.remove('disabledButton');
  } else {
    submitButton.disabled = true;
    submitButton.classList.add('disabledButton');
  }
}

function isValidName () {
  const nameRegex = /^[a-zA-Z]{2,}$/;
  const trimmedValue = nameInput.value.trim();
  if (trimmedValue === '' || (trimmedValue && nameRegex.test(trimmedValue))) {
    nameError.innerText = '';
    nameInput.classList.remove('invalid');
    isErrorState = false;
    return true;
  }
  isErrorState = true;
  nameError.innerText =
    'Имя должно состоять минимум из 2-х букв и содержать только латинские буквы';
  nameInput.classList.add('invalid');
}

function isValidEmail () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedValue = emailInput.value.trim();
  if (
    trimmedValue === '' ||
    (trimmedValue && emailRegex.test(emailInput.value))
  ) {
    emailError.innerText = '';
    emailInput.classList.remove('invalid');
    isErrorState = false;
    return true;
  }
  isErrorState = true;
  emailError.innerText = 'Это не похоже на валидный адрес почты';
  emailInput.classList.add('invalid');
}

function isEmailNotBusy () {
  if (busyEmails.includes(emailInput.value)) {
    emailError.innerText = 'Эта почта уже используется';
    emailInput.classList.add('invalid');
    isErrorState = true;
    return false;
  }
  isErrorState = false;
  emailError.innerText = '';
  emailInput.classList.remove('invalid');
}

function isValidPassword () {
  if (passwordInput.value.length <= 5) {
    isErrorState = true;
    passwordError.innerText = 'Пароль должен быть больше 5 символов';
    passwordInput.classList.add('invalid');
    return false;
  }
  if (/^(?:[a-zA-Z]+|\d+)$/.test(passwordInput.value)) {
    isErrorState = true;
    passwordError.innerText = 'Простой пароль';
    !passwordInput.classList.contains('invalid') &&
      passwordInput.classList.add('invalid');
    return false;
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(passwordInput.value)) {
    isErrorState = true;
    passwordError.innerText =
      'Пароль должен содержать только латинские буквы, цифры, нижнее подчеркивание (_), тире (-)';
    !passwordInput.classList.contains('invalid') &&
      passwordInput.classList.add('invalid');
    return false;
  }
  isErrorState = false;
  passwordError.innerText = '';
  passwordInput.classList.remove('invalid');
}

function isValidAcceptTerms () {
  if (!acceptAllInput.checked) {
    acceptError.innerText = 'Надо согласиться!';
    isErrorState = true;
    return false;
  }
  acceptError.innerText = '';
  isErrorState = false;
}

function touchForm () {
  if (!isTouchedForm) {
    isTouchedForm = true;
    isValidName();
    isValidEmail();
    isEmailNotBusy();
    isValidPassword();
    isValidAcceptTerms();
  }
}

form.addEventListener('submit', submitHandler);

function submitHandler (e) {
  e.preventDefault();
  touchForm();
  sendForm();
}

function sendForm () {
  if (!isErrorState) {
    submitButton.disabled = true;
    submitButton.classList.add('disabledButton');
  } else {
    //send form
  }
}
