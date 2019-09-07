

function activateButtonIfAllInputsContainValue(inputs, button) {
  for (const input of inputs) {
    input.addEventListener('input', function () {
      input.style.borderColor = '';
      if ([].every.call(inputs, (inp) => inp.value !== '')) {
        button.classList.remove('locked-button');
        button.classList.add('active-button');
      } else {
        button.classList.remove('active-button');
        button.classList.add('locked-button');
      }
    });
  }
}
const errColor = 'red';

function basicTextValidation(value) {
  return /^[A-Za-zА-Яа-яЁё`'(),.-]+$/.test(value);
}

function emailValidation(value) {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value);
}

function passwordValidation(value) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
}

function phoneNumberValidation(value) {
  return /^\+[0-9]{1,4}\([0-9]{1,3}\)[0-9]{3,4}-[0-9]{2}-[0-9]{2}$/.test(value);
}

function onlyDigitValidation(value, length) {
  return new RegExp(`^[0-9]{${length}}$`).test(value);
}

function cardDateValidation(value) {
  return /^[01][0-9]\/[0-9]{2}$/.test(value);
}

function validationStep1() {
  const surname = document.getElementsByName('firstname')[0];
  let allOk = true;
  if (!basicTextValidation(surname.value)) {
    allOk = false;
    surname.style.borderColor = errColor;
  }
  const lastname = document.getElementsByName('lastname')[0];
  if (!basicTextValidation(lastname.value)) {
    allOk = false;
    lastname.style.borderColor = errColor;
  }
  const email = document.getElementsByName('email')[0];
  if (!emailValidation(email.value)) {
    allOk = false;
    email.style.borderColor = errColor;
  }
  const country = document.getElementsByName('country')[0];
  if (!basicTextValidation(country.value)) {
    allOk = false;
    country.style.borderColor = errColor;
  }
  const address = document.getElementsByName('address')[0];
  if (!basicTextValidation(address.value)) {
    allOk = false;
    address.style.borderColor = errColor;
  }
  const password1 = document.getElementsByName('password')[0];
  const password2 = document.getElementsByName('repassword')[0];
  if (!passwordValidation(password1.value)) {
    allOk = false;
    password1.style.borderColor = errColor;
  }
  if (password1.value !== password2.value) {
    allOk = false;
    password2.style.borderColor = errColor;
  }
  return allOk;
}

const sendMessageButton = document.querySelector('.phone-entry > button');
const phoneInput = document.getElementsByName('phone')[0];
phoneInput.addEventListener('input', function () {
  phoneInput.style.borderColor = '';
  if (phoneInput.value === '') {
    sendMessageButton.classList.remove('active-button');
    sendMessageButton.classList.add('locked-button');
  } else {
    sendMessageButton.classList.remove('locked-button');
    sendMessageButton.classList.add('active-button');
  }
});
const phoneCodeArea = document.querySelector('.ver-code');
sendMessageButton.addEventListener('click', function () {
  if (!phoneNumberValidation(phoneInput.value)) {
    phoneInput.style.borderColor = errColor;
    phoneCodeArea.classList.add('invisible');
  } else {
    phoneCodeArea.classList.remove('invisible');
  }
});
const verifyCodeButton = document.getElementsByName('fr2_verify_btn')[0];
const codeInput = document.getElementsByName('verify')[0];
codeInput.addEventListener('input', function () {
  if (onlyDigitValidation(codeInput.value, 4)) {
    verifyCodeButton.classList.remove('locked-button');
    verifyCodeButton.classList.add('active-button');
  } else {
    verifyCodeButton.classList.remove('active-button');
    verifyCodeButton.classList.add('locked-button');
  }
});
verifyCodeButton.addEventListener('click', function() {
  if (onlyDigitValidation(codeInput.value, 4)) {
    nextButton2.classList.remove('locked-button');
    nextButton2.classList.add('active-button');
  }
});

const cardInputs = document.querySelectorAll('#frame_4 .credit-card > div:nth-of-type(1) input');
for (let i = 0; i < cardInputs.length - 1; ++i) {
  cardInputs[i].addEventListener('keyup', function (e) {
    if (e.target.value.length == 4) {
      cardInputs[i + 1].focus();
    }
  });
}


function validationStep3() {
  let allOk = true;
  for (const cardInput of cardInputs) {
    if (!onlyDigitValidation(cardInput.value, 4)) {
      allOk = false;
      cardInput.style.borderColor = errColor;
    }
  }
  const expirationDate = document.getElementsByName('credit-date')[0];
  if (!cardDateValidation(expirationDate.value)) {
    allOk = false;
    expirationDate.style.borderColor = errColor;
  }
  const cvv = document.getElementsByName('credit-cvv')[0];
  if (!onlyDigitValidation(cvv.value, 3)) {
    allOk = false;
    cvv.style.borderColor = errColor;
  }
  const acceptPolicyCheckbox = document.getElementsByName('terms')[0];
  if (!acceptPolicyCheckbox.checked) {
    allOk = false;
    acceptPolicyCheckbox.style.borderColor = errColor;
  }
  return allOk;
}

const sections = document.querySelectorAll("main section");
const indicator = document.querySelector(".indicator");
const steps = document.querySelectorAll(".indicator .step");
const wire = document.querySelector(".indicator .wire");
const microWire1 = document.querySelector('.indicator .micro-wire-1');
const microWire2 = document.querySelector('.indicator .micro-wire-2');

const regButton = document.getElementsByName("reg")[0];
regButton.addEventListener("click", function () {
  sections[0].classList.add("invisible");
  sections[1].classList.remove("invisible");
  indicator.classList.remove("invisible");
});

const cancelButton = document.getElementsByName("fr1_cancel_btn")[0];
cancelButton.addEventListener("click", function () {
  sections[1].classList.add("invisible");
  sections[0].classList.remove("invisible");
  indicator.classList.add("invisible");
});
const nextButton1 = document.getElementsByName("fr1_next_btn")[0];
nextButton1.addEventListener("click", function () {
  if (validationStep1()) {
    sections[1].classList.add("invisible");
    sections[2].classList.remove("invisible");
    steps[0].classList.add("completed");
    wire.style.backgroundImage = "linear-gradient(to right, #7161EF 50%, #fff 50%)";
    microWire1.style.zIndex = 1;
  }
});

const backButton1 = document.getElementsByName("fr2_back_btn")[0];
backButton1.addEventListener("click", function () {
  sections[2].classList.add("invisible");
  sections[1].classList.remove("invisible");
  steps[0].classList.remove("completed");
  wire.style.backgroundImage = "linear-gradient(to right, #fff, #fff)";
  microWire1.style.zIndex = '';
});
const nextButton2 = document.getElementsByName("fr2_next_btn")[0];
nextButton2.addEventListener("click", function () {
  if (nextButton2.classList.contains('active-button')) {
    sections[2].classList.add("invisible");
    sections[3].classList.remove("invisible");
    steps[1].classList.add("completed");
    wire.style.backgroundImage = "linear-gradient(to right, #7161EF, #7161EF)";
    microWire2.style.zIndex = 1;
  }
});

const backButton2 = document.getElementsByName("fr3_back_btn")[0];
backButton2.addEventListener("click", function () {
  sections[3].classList.add("invisible");
  sections[2].classList.remove("invisible");
  steps[1].classList.remove("completed");
  wire.style.backgroundImage = "linear-gradient(to right, #7161EF 50%, #fff 50%)";
  microWire2.style.zIndex = '';
});
const endButton = document.getElementsByName("fr3_end_btn")[0];
endButton.addEventListener("click", function () {
  if (validationStep3()) {
    sections[3].classList.add("invisible");
    sections[4].classList.remove("invisible");
    indicator.classList.add("invisible");
    steps[2].classList.add("completed");
  }
});

const allInputs1 = document.querySelectorAll('#frame_2 input');
activateButtonIfAllInputsContainValue(allInputs1, nextButton1);

const allInputs3 = document.querySelectorAll('#frame_4 input');
activateButtonIfAllInputsContainValue(allInputs3, endButton);