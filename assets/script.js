// window.addEventListener('load', (e)=>{
//   document.getElementById('modalLogin').style.display = 'none'
// })

function toogleModalLogin() {
   //caso ele esteja fechado
  if(document.getElementById('modalLogin').style.display == '' || 
  document.getElementById('modalLogin').style.display == 'none') {
    document.getElementById('modalLogin').style.display = 'flex'
  } else { //se modal está aberto
   //esconde
   document.getElementById('modalLogin').style.display = 'none'
  }
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
        document.getElementById('modalLogin').style.display = 'none'
        alert("Logado")
        return
      }

      if(response.error == "user not found"){
        alert("Conta nao encontrado. Prossiga com o registro.")
        document.getElementById('modalLogin').style.display = 'none'
        document.getElementById('modalRegister').style.display = 'flex'       
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
        alert("Registrado")        
        document.getElementById('modalLogin').style.display = 'flex'
        document.getElementById('modalRegister').style.display = 'none'   
        return
      }

      if(response.error != undefined){
        alert("Não registrado")
      }    
   }
 }) 
}