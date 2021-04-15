let Validator = {
  handleSubmit:(event)=>{
    event.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll('input');

    Validator.clearErrors();

    for(let i=0;i<inputs.length;i++) {
      let input = inputs[i];
      let check = Validator.checkInput(input);
      if(check !== true) {
        send = false;
        Validator.showError(input, check);
      }
    }

    if(send) {
      form.submit();
    }
  },
  checkInput:(input) => {
    let rules = input.getAttribute('data-rules');

    if(rules !== null) {
      rules = rules.split('|');
      for(let k in rules) {
        let rDetails = rules[k].split('=');
        switch(rDetails[0]) {
          case 'required':
            if(input.value == '') {
              return 'Campo não pode ser vazio.';
            }
          break;
          case 'min':
            if(input.value.length < rDetails[1]) {
              return 'Campo tem que ter pelo menos '+rDetails[1]+' caractes';
            }
          break;
        }
      }
    }

    return true;
  },
  showError:(input, error) => {
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.innerHTML = error;

      input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearErrors:() => {
      let inputs = form.querySelectorAll('input');
      for(let i=0;i<inputs.length;i++) {
          inputs[i].style = '';
      }

      let errorElements = document.querySelectorAll('.error');
      for(let i=0;i<errorElements.length;i++) {
          errorElements[i].remove();
      }
  }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);

let validator = {
  handleSubmit:(event)=>{
    event.preventDefault();
    let send = true;

    let inputs = Form.querySelectorAll('input');

    validator.clearErrors();

    for(let i=0;i<inputs.length;i++) {
      let input = inputs[i];
      let check = validator.checkInput(input);
      if(check !== true) {
        send = false;
        validator.showError(input, check);
      }
    }

    if(send) {
      Form.submit();
    }
  },
  checkInput:(input) => {
    let rules = input.getAttribute('data-rules');

    if(rules !== null) {
      rules = rules.split('|');
      for(let k in rules) {
        let rDetails = rules[k].split('=');
        switch(rDetails[0]) {
          case 'required':
            if(input.value == '') {
              return 'Campo não pode ser vazio.';
            }
          break;
          case 'min':
            if(input.value.length < rDetails[1]) {
              return 'Campo tem que ter pelo menos '+rDetails[1]+' caractes';
            }
          break;
        }
      }
    }

    return true;
  },
  showError:(input, error) => {
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.innerHTML = error;

      input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearErrors:() => {
      let inputs = form.querySelectorAll('input');
      for(let i=0;i<inputs.length;i++) {
          inputs[i].style = '';
      }

      let errorElements = document.querySelectorAll('.error');
      for(let i=0;i<errorElements.length;i++) {
          errorElements[i].remove();
      }
  }
};

let Form = document.querySelector('.verify');
Form.addEventListener('submit', validator.handleSubmit);