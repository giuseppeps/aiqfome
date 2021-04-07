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