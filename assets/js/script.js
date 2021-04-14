function toogleModalLogin() {
   //caso ele esteja fechado
  if(document.getElementById('modalLogin').style.display == '' || 
  document.getElementById('modalLogin').style.display == 'none') {
    document.getElementById('modalLogin').style.display = 'flex';
  } else { //se modal está aberto
   //esconde
   document.getElementById('modalLogin').style.display = 'none';
  }
}

function openModalRegister() {
  if(document.getElementById('modalLogin').style.display =='flex') {
    document.getElementById('modalLogin').style.display = 'none';
  }
  document.getElementById('modalRegister').style.display = 'flex';
}

function closeModalRegister() {
  document.getElementById('modalRegister').style.display = 'none';
}

function openModalLogin() {
  if(document.getElementById('modalRegister').style.display =='flex') {
    document.getElementById('modalRegister').style.display = 'none';
  }
  document.getElementById('modalLogin').style.display = 'flex';
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

  let objData = {
    email: document.getElementById('email').value,
    password: document.getElementById('senha').value
  }

 request({
   method: 'POST',
   endPoint: 'https://reqres.in/api/login',
   data: JSON.stringify(objData),
   onSentCallback: function( responseText ) {
      let response = JSON.parse(responseText);  


      if(response.error == undefined){
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
        document.getElementById('modalLogin').style.display = 'none';
        document.getElementById("login-notfound").innerHTML="** Usuário não encontrado, efetue o login novamente **";
        setTimeout(function(){
         document.getElementById("login-notfound").innerHTML="";
        },5000);
        document.getElementById('modalLogin').style.display = 'flex';       
      }    
   }
 }) 
}

function register() {

  let objData = {
    email: document.getElementById('emailRegister').value,
    password: document.getElementById('senhaRegister').value
  }

 request({
   method: 'POST',
   endPoint: 'https://reqres.in/api/register',
   data: JSON.stringify(objData),
   onSentCallback: function( responseText ) {
      let response = JSON.parse(responseText);  

      console.log(response)

      if(response.error == undefined){
        document.getElementById('modalRegister').style.display = 'none'; 
        document.getElementById('main').style.display = 'none';
        document.getElementById("timer").innerHTML="Registro efetuado com sucesso, aguarde 2 segundos!";
        setTimeout(function(){
         document.getElementById("timer").innerHTML="";
        },2000);

        document.getElementById('container-area2').style.display = 'flex';
        document.querySelector('.container-login').style.display = 'none';
        document.querySelector('.container-logout').style.display = 'flex';
      }

      if(response.error != undefined){
        document.getElementById('modalRegister').style.display = 'none';
        document.getElementById("register-error").innerHTML="** Erro no cadastramento, efetue o cadastro novamente **";
        setTimeout(function(){
         document.getElementById("register-error").innerHTML="";
        },5000);
        document.getElementById('modalRegister').style.display = 'flex';
      }    
   }
 }) 
}