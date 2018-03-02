$(document).ready(function(){
   $("#asistentes").on('click', function(){ 
      $('main').children().hide();
      $('#FormAsistentes').show();

      function validarNombre() {
         expr = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/ //Comprueba el nombre

         if ( !expr.test(nombre.value) ){
            document.getElementById('nombre').style.backgroundColor = 'red';
            document.getElementById('errorNombre').innerHTML = 'El nombre es incorrecto <br>';
            return false;
         }else{
            document.getElementById('nombre').style.backgroundColor = 'green';
            document.getElementById('errorNombre').innerHTML = '';
            return true;
         }
      }

      function validarApellido() {
         expr = /^\w{3,}\s\w{3,}$/;
         if ( !expr.test(ap.value) ){
            document.getElementById('ap').style.backgroundColor = 'red';
            document.getElementById('errorap').innerHTML = 'El apellido es incorrecto <br>';
            return false;
         }else{
            document.getElementById('ap').style.backgroundColor = 'green';
            document.getElementById('errorap').innerHTML = '';
            return true;
         }
      }

      function validarDni() {
         var dni=document.getElementById('dni').value;
         var numero;
         var letr;
         var letra;
         var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

         if(expresion_regular_dni.test (dni) == true){
         numero = dni.substr(0,dni.length-1);
         letr = dni.substr(dni.length-1,1);
         numero = numero % 23;
         letra='TRWAGMYFPDXBNJZSQVHLCKET';
         letra=letra.substring(numero,numero+1);
         if (letra!=letr.toUpperCase()) {
            document.getElementById('dni').style.backgroundColor = 'red';
            document.getElementById('errorDni').innerHTML = 'Dni erroneo, la letra del NIF no se corresponde<br>';
            return false;
         }else{
            document.getElementById('dni').style.backgroundColor = 'green';
            document.getElementById('errorDni').innerHTML = '';
            return true;
         }
         }else{
            document.getElementById('dni').style.backgroundColor = 'red';
            document.getElementById('errorDni').innerHTML = 'DNI erroneo, formato no válido <br>';
            return false;
         }
      }

      function validarEmail() {
         var email=document.getElementById('email').value;
         expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
         if ( !expr.test(email) ){
            document.getElementById('email').style.backgroundColor = 'red';
            document.getElementById('errorEmail').innerHTML = 'El correo es incorrecto <br>';
            return false;
         }else{
            document.getElementById('email').style.backgroundColor = 'green';
            document.getElementById('errorEmail').innerHTML = '';
            return true;
         }
      }
      function validarOpci() {
         var indice = document.getElementById("opciones").selectedIndex;
         if( indice == null || indice == 0 ) {

            document.getElementById('errorProce').innerHTML = 'Selecciona una procedencia<br>';
            return false;
         }else{
            document.getElementById('errorProce').innerHTML = '';
            return true;
         }
      }

      //Validacion al enviar formulario
      function validacion() {
         if (validarUsuario() === false) {
            document.getElementById('nombre').focus();
            return false;
         }
         else if (validarEmail() == false) {
            document.getElementById('ap').focus();
            return false;
         }
         else if (validarDni() === false ) {
            document.getElementById('dni').focus();
            return false;
         }
         else if (validarGenero() === false) {
            document.getElementById('email').focus();
            return false;
         }else if (validarOpci() === false) {
            document.getElementById('opciones').focus();
            return false;
         }

         return true;
      }

      //llamadas con addEventListener
      document.getElementById('nombre').addEventListener('blur',validarNombre,false);
      document.getElementById('ap').addEventListener('blur',validarApellido,false);
      document.getElementById('dni').addEventListener('blur',validarDni,false);
      document.getElementById('email').addEventListener('blur',validarEmail,false);   
      document.getElementById('opciones').addEventListener('blur',validarOpci,false);     
   });
});        

