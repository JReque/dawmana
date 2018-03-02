$(document).ready(function(){
   $("#lponentes").on('click', function(e){
   $('#actividades').hide();
   $('#ponentes').show();
   e.preventDefault();
   $.ajax({
      url: 'ponentes.php',
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
            if (nombrePon===response[0][i+1].NamePonente){
               i++;                           
            }
         }
      }
   });
   });
});