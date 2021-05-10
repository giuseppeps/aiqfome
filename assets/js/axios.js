let modalLogin = document.getElementById('modalLogin');
let modalRegister = document.getElementById('modalRegister');

window.addEventListener('load', ()=> {
  showRestrictPage(false, false);
});

function toogleModalLogin() {
  if(modalLogin.style.display == '' || modalLogin.style.display == 'none') {
   modalLogin.style.display = 'flex';
  } else { //se modal está aberto
   //esconde
   modalLogin.style.display = 'none';
  }
}

function openModalRegister(e) {
  e.preventDefault();
  if(modalLogin.style.display =='flex') {
    modalLogin.style.display = 'none';
  }
  modalRegister.style.display = 'flex';
}

function closeModalRegister() {
  modalRegister.style.display = 'none';
}

function openModalLogin(e) {
  e.preventDefault();
  document.getElementById('modalRegister').style.display = 'none';
  modalLogin.style.display = 'flex';
}

function setLocalStorage(user) {
  let storedUsers = localStorage.UsersLogin ? JSON.parse(localStorage.UsersLogin) : [];
  storedUsers.push(user);
  localStorage.setItem('UsersLogin', JSON.stringify(storedUsers));
}

function logout() {
  axios.post('http://localhost:3030/logout')
    .then(response => {
      localStorage.removeItem('UsersLogin');
      document.location.reload(true);
    })
    .catch(error => {
      console.log(error.response.status);
    })
};

const registerUser = (user) => {
  axios.post('http://localhost:3030/signup', user)
    .then(response => {
      setLocalStorage(user);
      modalRegister.style.display = 'none';
      showRestrictPage(true, false); 
    })
    .catch(error => {
      if(error.response.status === 409) {
        document.getElementById("register-error").innerHTML="** Este Email já existe **";
      } else if(error.response.status === 400) {
        document.getElementById("register-error").innerHTML="** Erro no cadastramento, tente novamente **";
      }
    })
};

function register(e) {
  e.preventDefault();

  const registerEmail = document.getElementById('emailRegister').value;
  const registerPassword = document.getElementById('senhaRegister').value;

  const user = {
    email: registerEmail, 
    password: registerPassword
  };
  registerUser(user);
}

const loginUser = (user) => {
  axios.post('http://localhost:3030/login', user)
    .then(response => {
      setLocalStorage(user);
      showRestrictPage(true);
    })
    .catch(error => {
      if (error.response.status === 404) {
        document.getElementById("login-notfound").innerHTML="** Usuário não encontrado **";
      } else if (error.response.status === 403) {
        document.getElementById("login-notfound").innerHTML="** Email ou Senha incorreta. Tente novamente. **";
      }
    })
};

function login(e) {
  e.preventDefault();

  const user = {
    email: document.getElementById('email').value,
    password: document.getElementById('senha').value
  }
  loginUser(user);
}

function showRestrictPage(showRedirectMessage = false, showModalLogin = true){
  if(!isLogged()) {

    document.getElementById('main').style.display = 'flex';
    document.getElementById('container-area2').style.display = 'none';
    document.querySelector('.container-login').style.display = 'flex';
    document.querySelector('.container-logout').style.display = 'none';
    document.querySelector('.area2').style.display = 'none';

    return (showModalLogin)?  toogleModalLogin() : false;
  }

  document.getElementById('modalLogin').style.display = 'none';
  document.getElementById('main').style.display = 'none';
  document.getElementById('container-area2').style.display = 'flex';
  document.querySelector('.container-login').style.display = 'none';
  document.querySelector('.container-logout').style.display = 'flex';

  if(showRedirectMessage) {
    document.getElementById("timer").innerHTML="Login efetuado com sucesso, aguarde 2 segundos!";
    setTimeout(function() {
      document.getElementById("timer").innerHTML="";
      document.querySelector('.area2').style.display = 'block';
    },2000);

    return;
  }

  document.querySelector('.area2').style.display = 'block';

}

function isLogged() {
  if(localStorage.getItem('UsersLogin') !== null) {
    return true;
  } else {
    return false;
  }
}