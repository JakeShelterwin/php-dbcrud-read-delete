// creare una index + delete sulla tabella paganti. Mostrare tutte le informazioni interessanti dell'entita' e dare la possibilita' all'utente di elminare un pagante dalla tabella e quindi dal front-end

//Al caricamento della pagina richiamo la funzione getDatiPagante
function init(){
  getDatiPagante()
}

$(document).ready(init);

// gestione evento di click sul cestino per eliminare un pagante, uso la event delegation
$( "#target" ).on( "click", ".delete", deletePagante);

// con questa funzione richiamo il php che mi restisuisce in html tramite handlebars i dati di ciascun pagante
function getDatiPagante(){
  $.ajax({
  url: "getAllPaganti.php",
  method: "POST",
  success: function(data,stato) {
    console.log(data);

    //handlebars
    var source = $("#templatePagante").html();
    var template = Handlebars.compile(source);

    var target = $("#target");
    // per ciascun pagante di data, appendi in html il dati corrispondenti
    for (var pagante of data){
      var html = template(pagante);
      target.append(html);
    }
  },
  error: function(richiesta,stato,errore){
    alert("Chiamata fallita!!!");
  }
});
}

// con questa funzione usata nell'evento click sul cestino, richiamo il php che permette la cancellazione di un pagante dal database in base all'id. 
function deletePagante(){

  var self = $(this);
  var genitoreCestino = self.parent();
  var idPagante = genitoreCestino.data("id");
  console.log("id", idPagante);

  $.ajax({
  url: "deletePagantiById.php",
  method: "POST",
  data: {
    "id" : idPagante
  },
  success: function(data,stato) {
    console.log("ajax funge");
    genitoreCestino.remove();
  },
  error: function(richiesta,stato,errore){
    alert("Chiamata fallita!!!");
  }
});
}
