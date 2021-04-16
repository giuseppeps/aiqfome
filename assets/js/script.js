let modalLogin = document.getElementById('modalLogin');
let modalRegister = document.getElementById('modalRegister');

function toogleModalLogin() {
  if(modalLogin.style.display == '' || modalLogin.style.display == 'none') {
   modalLogin.style.display = 'flex';
  } else { //se modal está aberto
   //esconde
   modalLogin.style.display = 'none';
  }
}

function openModalRegister() {
  if(modalLogin.style.display =='flex') {
    modalLogin.style.display = 'none';
  }
  modalRegister.style.display = 'flex';
}

function closeModalRegister() {
  modalRegister.style.display = 'none';
}

function openModalLogin() {
  document.getElementById('modalRegister').style.display = 'none';
  modalLogin.style.display = 'flex';
}

function logout() {
  localStorage.removeItem('UsersLogin');
  document.location.reload(true);
}

function request({method, endPoint, data, onSentCallback}) {
  var xhr = new XMLHttpRequest()

  method = (method==undefined) ? 'GET' : method

  xhr.open(method, endPoint);

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.addEventListener("readystatechange", function () {

    if (this.readyState === 4) {
      onSentCallback(this.responseText);
    }

  });
  
  xhr.send(data);
}

function login() {
  let registerEmailInput = document.getElementById('email');
  let registerPasswordInput = document.getElementById('senha');

  let objData = {
    email: document.getElementById('email').value,
    password: document.getElementById('senha').value
  }

  let storedUsers = localStorage.UsersLogin ? JSON.parse(localStorage.UsersLogin) : [];
  if(registerEmailInput.value.length > 2 && registerPasswordInput.value.length > 2) {
    request({
      method: 'POST',
      endPoint: 'https://reqres.in/api/login',
      data: JSON.stringify(objData),
      onSentCallback: function( responseText ) {
          let response = JSON.parse(responseText);  

          if(response.error == undefined){
            storedUsers.push(objData);
            localStorage.setItem('UsersLogin', JSON.stringify(storedUsers));

            document.getElementById('modalLogin').style.display = 'none';
            document.getElementById('main').style.display = 'none';
            
            document.getElementById("timer").innerHTML="Login efetuado com sucesso, aguarde 2 segundos!";
            setTimeout(function(){
            document.getElementById("timer").innerHTML="";
            },2000);

            document.getElementById('container-area2').style.display = 'flex';
            document.querySelector('.container-login').style.display = 'none';
            document.querySelector('.container-logout').style.display = 'flex';
          }

          if(response.error == "user not found"){
            modalLogin.style.display = 'none';
            if(response.error != undefined && registerEmailInput.value.length > 2 && registerPasswordInput.value.length > 2) {
              document.getElementById("login-notfound").innerHTML="** Email ou Senha incorreta, efetue o login novamente **";
              setTimeout(function(){
              document.getElementById("login-notfound").innerHTML="";
              },5000);
            }
            
            modalLogin.style.display = 'flex';       
          }    
      }
    }) 
  }
}

function register() {
  let registerEmailInput = document.getElementById('emailRegister');
  let registerPasswordInput = document.getElementById('senhaRegister');

  let storedUsers = localStorage.UsersLogin ? JSON.parse(localStorage.UsersLogin) : [];

  let objData = {
    email: document.getElementById('emailRegister').value,
    password: document.getElementById('senhaRegister').value
  }

  if(registerEmailInput.value.length > 2 && registerPasswordInput.value.length > 2) {
    request({
      method: 'POST',
      endPoint: 'https://reqres.in/api/register',
      data: JSON.stringify(objData),
      onSentCallback: function( responseText ) {
          let response = JSON.parse(responseText); 
          if(response.error == undefined){
            storedUsers.push(objData);
            localStorage.setItem('UsersLogin', JSON.stringify(storedUsers));
            modalRegister.style.display = 'none'; 
            document.getElementById('main').style.display = 'none';
            document.getElementById("timer").innerHTML="Registro efetuado com sucesso, aguarde 2 segundos!";
            setTimeout(function(){
            document.getElementById("timer").innerHTML="";
            },2000);

            document.getElementById('container-area2').style.display = 'flex';
            document.querySelector('.container-login').style.display = 'none';
            document.querySelector('.container-logout').style.display = 'flex';
          } 

          if(response.error != undefined && registerEmailInput.value != '' && registerPasswordInput.value != '' ){
            modalRegister.style.display = 'none';

            if(response.error != undefined && registerEmailInput.value.length > 2 && registerPasswordInput.value.length > 2) {
              document.getElementById("register-error").innerHTML="** Erro no cadastramento, efetue o cadastro novamente **";
            }
            setTimeout(function(){
            document.getElementById("register-error").innerHTML="";
            },5000);
            modalRegister.style.display = 'flex';
          }    
      }
    })
  }
}

function isLogged() {
  if(localStorage.getItem('UsersLogin') !== null) {
    document.getElementById('main').style.display = 'none';
    document.getElementById('container-area2').style.display = 'flex';
    document.querySelector('.container-login').style.display = 'none';
    document.querySelector('.container-logout').style.display = 'flex';
  } else {
    toogleModalLogin()
  }
}