$(document).ready(function(){
   //INICIO
   $( "#actividades" ).tabs();
   $('main').children().hide();
   $('#inicio').toggle().fadeIn();
   setTimeout(function () {
      $('#inicio').fadeOut();
   }, 1500);

   $("#sysmanas").on('click', mostrarAntSysmanas);
   //ACTIVIDADES
   $("#lactividades").on('click', function(e){
      $('main').children().hide();
      $('#actividades').show();
      e.preventDefault();
      $.ajax({
         url: 'actividades.json',
         type: 'get',
         dataType: 'JSON',
         success: function(response){
            let len = response[0].length;
            for(let i=0; i<len; i++){
               let imagen = response[0][i].ImgPonente;
               let nombreAct = response[0][i].NameActivity;
               let nombrePon = response[0][i].NamePonente;
               let empresa = response[0][i].Empresa;
               let hora = response[0][i].Hora;
               let infoAct = response[0][i].Info;

               let $contenido = "<div class='actividad' id='"+i+"' title ='"+nombreAct+"'>" +
               "<header>" + imagen +"</header>"+
               "<div class='content'><h3>" + nombreAct+"<h3>"+
               "<h4>" + nombrePon +"<span> ("+empresa+") </span></h4>" +
               "<span>"+hora+"</span>"+
               "<p>"+infoAct+"</p></div>"
               "</div>";

               //$('.actividad header').hide();
               //$('.content p').hide();

               switch(response[0][i].Dia){
                  case 'Lunes':
                     $("#Lunes").append($contenido);
                     //$('#"+i+"')
                  break;
                  case 'Martes':
                     $("#Martes").append($contenido);
                  break;
                  case 'Miércoles':
                     $("#Miercoles").append($contenido);
                  break;
                  case 'Jueves':
                     $("#Jueves").append($contenido);
                  break;
                  case 'Viernes':
                     $("#Viernes").append($contenido);
                  break;
                  default:
                  break;
               }                    
            }
            $(".actividad").tooltip({track: true});
         }
      });
   });

   //PONENTES
   $("#lponentes").on('click', function(e){
      $('main').children().hide();
   $('#ponentes').show();

   e.preventDefault();
      $.ajax({
         url: 'actividades.json',
         type: 'get',
         dataType: 'JSON',
         success: function(response){
            let len = response[0].length;
            for(let i=0; i<len; i++){
               let imagen = response[0][i].ImgPonente;
               let nombrePon = response[0][i].NamePonente;
               let empresa = response[0][i].Empresa;
               let infoPon = response[0][i].InfoPon;

               let contenido = "<div class='ponente'>" +
               "<header>" + imagen +"</header>"+
               "<div class='content'>"+
               "<h4>" + nombrePon +"<span> ("+empresa+") </span></h4>" +
               "<p>"+infoPon+"</p></div>"
               "</div>";

               $("#ponentes").append(contenido);
               try{
                  if (nombrePon===response[0][i+1].NamePonente){
                     i++;                           
                  }
               }catch{
                  console.log();
               }
            }
         }
      });
   });

   //ASISTENTES
   let validarNombre = function() {
      expr = /^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/ //Comprueba el nombre

      if ( !expr.test($('#nombre').val())){
         $('#nombre').css("background-color", 'red');
         $('#errorNombre').html('El nombre es incorrecto <br>');
         return false;
      }else{
         $('#nombre').css("background-color", 'green');
         $('#errorNombre').html('');
         return true;
      }
   }

   let validarApellido = function() {
      expr = /^\w{3,}\s\w{3,}$/;
      if ( !expr.test($('#ap').val())){
         $('#ap').css("background-color", 'red');
         $('#errorap').html('El apellido es incorrecto <br>');
         return false;
      }else{
         $('#ap').css("background-color", 'green');
         $('#errorap').html('');
         return true;
      }
   }

   let validarDni = function() {
      var dni=$('#dni').val();
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
         $('#dni').css("background-color", 'red');
         $('#errorDni').html('Dni erroneo, la letra del NIF no se corresponde<br>');
         return false;
      }else{
         $('#dni').css("background-color", 'green');
         $('#errorDni').html('');
         return true;
      }
      }else{
         $('#dni').css("background-color", 'red');
         $('#errorDni').html('DNI erroneo, formato no válido <br>');
         return false;
      }
   }

   let validarEmail = function() {
      var email=$('#email').val();
      expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      if ( !expr.test(email) ){
         $('#email').css("background-color", 'red');
         $('#errorEmail').html('El correo es incorrecto <br>');
         return false;
      }else{
         $('#email').css("background-color", 'green');
         $('#errorEmail').html('');
         return true;
      }
   }
   let validarOpci = function() {
      var indice = $("#opciones").selectedIndex;
      if( indice == null || indice == 0 ) {

         $('#errorProce').html('Selecciona una procedencia<br>');
         return false;
      }else{
         $('#errorProce').html('');
         return true;
      }
   }

   //Validacion al enviar formulario
   let validacion = function() {
      if (validarUsuario() === false) {
         $('#nombre').focus();
         return false;
      }
      else if (validarEmail() == false) {
         $('#ap').focus();
         return false;
      }
      else if (validarDni() === false ) {
         $('#dni').focus();
         return false;
      }
      else if (validarGenero() === false) {
         $('#email').focus();
         return false;
      }else if (validarOpci() === false) {
         $('#opciones').focus();
         return false;
      }

      return true;
   }

   $("#asistentes").on('click', function(){ 
      $('main').children().hide();
      $('#FormAsistentes').show();

      //llamadas con addEventListener
      $('#nombre').on('blur',validarNombre);
      $('#ap').on('blur',validarApellido);
      $('#dni').on('blur',validarDni);
      $('#email').on('blur',validarEmail);   
      $('#opciones').on('blur',validarOpci);     
   });

   //SYSMANAS ANTERIORES
   var mostrarAntSysmanas = function () {
        event.preventDefault();

        $("main").html("");
        $.getJSON("sysmanas.json")
            .done(insertarSysmanas)
            .fail(mensajeError);
    };

    let insertarSysmanas = function (data) {
        $("main").append("<div id='AllSysmanas'></div>");
        $("#AllSysmanas").append("<h2>Anteriores Sysmanas</h2>" +
            "<div id='listadoSysmanas'></div>");
        $.each(data, function (indice, sysmana) {

            $("#listadoSysmanas").append("" +
                "<div class='cartel'>" +
                "<img class='fotoCartel' src='" + sysmana.foto + "' alt=''>" +
                "<h3>" + sysmana.nombre + "</h3>" +
                "</div>"
            );
        });

        $(".fotoCartel").on("click", function () {

            $("#modalCarrusel").remove();

            $("main").append("<div id='modalCarrusel'></div>");
            $("#modalCarrusel").append("<div id='carrusel'></div>");

            $.each(data, function (indice, actividad) {
                $("#carrusel").append("<div><img src='" + actividad.foto + "' alt=''></div>");
            });

            $("#carrusel").slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            });

            $("#modalCarrusel").dialog({
                modal: true,
                resizable: false,
                draggable: false,
                width: 500,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                }
            });
        });
    };

   //LOGIN
   $("#login").on('click', function(){ 
      $('main').children().hide();
      $('#FormLogin').show();

      let validarUsuario = function() {
         let $user=$('#user').val();
         expr = /^[a-z0-9_\\_\ü]+$/;
         if ( !expr.test($user) || (($user).length < 3) ){
            $('#user').css("background-color", 'red');
            $('#errorUser').text('El usuario es incorrecto');
            return false;
         }else{
            $('#user').css("background-color", 'green');
            $('#errorUser').text('');
            return true;
         }
      }
      let validarPass = function() {
         let pass=$('#pass').val();
         expr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
         if ( !expr.test(pass) ){
            $('#pass').css("background-color", 'red');
            $('#errorPass').text('La contraseña no es segura');
            return false;
         }else{
            $('#pass').css("background-color", 'green');
            $('#errorPass').text('');
            return true;
         }
      }

      //llamadas con addEventListener
      $('#user').on('blur',validarUsuario);
      $('#pass').on('blur',validarPass); 
      $('#enviarLogin').on('click',login); 
   });

   let cargarMenuPonenteLogeado = function () {
      $("#menu").html("<li id='editar'><a href=''></a>Editar mis datos</li>" +
         "<li id='crear'><a href=''></a>Crear Ponencia</li>");
      $("header").append("<button id='cerrarSesion'>Cerrar sesión</button>");
      $('#cerrarSesion').on('click',logout); 
   };

   let login = function () {
        //event.preventDefault();
        if ($("#user").val() === "jesus" && $("#pass").val() === "Jesus123456") {
            cargarMenuPonenteLogeado();
            $("#errorLogin").text('');
            $('main').children().hide();
            $('#FormEditar').show();
        } else {
            $("#errorLogin").text("El usuario o la contraseña no coinciden");
        }
    };

   let logout = function(){
      location.reload();
      console.log('hola');
   }

   //Editar mis datos
   $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
      dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
   };

   $.datepicker.setDefaults($.datepicker.regional['es']);

   let dateFormat = "dd-mm-yy",
      from = $("#diasPreferiblesFrom")
          .datepicker({
              defaultDate: "+1w",
              changeMonth: true,
              showAnim: "drop",
              dateFormat: "dd-mm-yy",
              minDate: new Date("January 29, 2018"),
              maxDate: new Date("February 02, 2018")
          }).prop("readonly", "true")
          .on("change", function () {
              to.datepicker("option", "minDate", getDate(this));
          }),
      to = $("#diasPreferiblesTo").datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          showAnim: "drop",
          dateFormat: "dd-mm-yy",
          minDate: new Date("January 29, 2018"),
          maxDate: new Date("February 02, 2018")
      }).prop("readonly", "true")
          .on("change", function () {
              from.datepicker("option", "maxDate", getDate(this));
          });

   function getDate(element) {
      let date;
      try {
          date = $.datepicker.parseDate(dateFormat, element.value);
      } catch (error) {
          date = null;
      }

      return date;
   }

   $("#editar").on('click', function(){ 
      $('#nombrePonen').on('blur',validarNombre);
      $('#apellidosPonen').on('blur',validarApellido);
   });

   $("#crear").on('click', function(){ 
      $('main').children().hide();
      $('#FormRegistro').show();
      alert('hola');
   });

});        