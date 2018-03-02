$(document).ready(function(){
   $("#login").on('click', function(){ 
      $('main').children().hide();
      $('#FormLogin').show();

      function validarUsuario() {
         var user=document.getElementById('user').value;
         expr = /^[a-z0-9_\\_\ü]+$/;
         if ( !expr.test(user) || ((user).length < 3) ){
            document.getElementById('user').style.backgroundColor = 'red';
            document.getElementById('errorUser').innerHTML = 'El usuario es incorrecto <br>';
            return false;
         }else{
            document.getElementById('user').style.backgroundColor = 'green';
            document.getElementById('errorUser').innerHTML = '';
            return true;
         }
      }
      function validarPass() {
         var pass=document.getElementById('pass').value;
         expr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
         if ( !expr.test(pass) ){
            document.getElementById('pass').style.backgroundColor = 'red';
            document.getElementById('errorPass').innerHTML = 'La contraseña no es segura <br>';
            return false;
         }else{
            document.getElementById('pass').style.backgroundColor = 'green';
            document.getElementById('errorPass').innerHTML = '';
            return true;
         }
      }

      //Validacion al enviar formulario
      function validacion() {
         if (validarUsuario() === false) {
            document.getElementById('user').focus();
            return false;
         }
         
         else if (validarPass ()=== false) {
            document.getElementById('checkbox').focus();
            return false;
         }

         return true;
      }

      //llamadas con addEventListener
      document.getElementById('user').addEventListener('blur',validarUsuario,false);
      document.getElementById('pass').addEventListener('blur',validarPass,false);      
   });
});        

