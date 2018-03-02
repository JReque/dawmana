$(document).ready(function(){
   $( "#actividades" ).tabs();
   $('main').children().hide();
   $("#lactividades").on('click', function(e){
      $('#ponentes').hide();
      $('#actividades').show();
      e.preventDefault();
      $.ajax({
         url: 'ponentes.php',
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

               let contenido = "<div class='actividad' title ='"+nombreAct+"'>" +
               "<header>" + imagen +"</header>"+
               "<div class='content'><h3>" + nombreAct+"<h3>"+
               "<h4>" + nombrePon +"<span> ("+empresa+") </span></h4>" +
               "<span>"+hora+"</span>"+
               "<p>"+infoAct+"</p></div>"
               "</div>";

               switch(response[0][i].Dia){
                  case 'Lunes':
                     $("#Lunes").append(contenido);
                  break;
                  case 'Martes':
                     $("#Martes").append(contenido);
                  break;
                  case 'Miércoles':
                     $("#Miercoles").append(contenido);
                  break;
                  case 'Jueves':
                     $("#Jueves").append(contenido);
                  break;
                  case 'Viernes':
                     $("#Viernes").append(contenido);
                  break;
                  default:
                  break;
               }                    
            }
            $(".actividad").tooltip({track: true});
         }
      });
   });
});        