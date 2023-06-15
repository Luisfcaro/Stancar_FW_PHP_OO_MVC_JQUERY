function carousel_Brands() {
  ajaxPromise(friendlyURL("?module=home&op=carrusel"),'POST', 'JSON')
  .then(function(data) {
          for (row in data) {
              $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].cod_marca).appendTo(".carrousel__list").html(
                  "<img class='carousel__img' id='' src='" + data[row].descripcion + "' alt='' >"
              )
          }
          
          new Glider(document.querySelector('.carrousel__list'), {             
              slidesToShow: 5,             
              slidesToScroll: 5,            
              draggable: true,             
              dots: '.dots',            
              arrows: {                 
                  prev: '.glider-prev',                 
                  next: '.glider-next'             
              }         
          }); 

          
          
      })
      .catch(function() {
          window.location.href = "index.php?page=503";
      });
}

function loadCategories() {
  ajaxPromise(friendlyURL("?module=home&op=category"), 'POST', 'JSON')
  .then(function(data) {
      for (row in data) {
          $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].cod_categoria }).appendTo('#container_car')
              .html(
                  


                  "<div class='card'>"+

                  "<div class='card-image'>" +
                  "<img src = " + data[row].descripcion + " alt='foto' </img> " +
                  "</div>" +
                  "<div class='card_title title-black'>" +
                  "<p>" + data[row].nombre_categoria + "</p>" 

              )
      }
  }).catch(function() {
      window.location.href = "index.php?page=503";
  });
}

function loadMostViewed() {
  ajaxPromise(friendlyURL("?module=home&op=viewed"), 'POST', 'JSON')
  .then(function(data) {
      for (row in data) {
          $('<div></div>').attr('class', "div_views").attr({ 'id': data[row].numero_bastidor }).appendTo('#container_views')
              .html(
                  


                  "<div class='card'>"+

                  "<div class='card-image'>" +
                  "<img src = " + data[row].imagen + " alt='foto' </img> " +
                  "</div>" +
                  "<div class='card_title title-black'>" +
                  "<p>" + data[row].Visitas + "</p>" 

              )
      }
  }).catch(function() {
      window.location.href = "index.php?page=503";
  });
}

function loadCatTypes() {
  ajaxPromise(friendlyURL("?module=home&op=type"),'POST', 'JSON')
  .then(function(data) {
      for (row in data) {
          $('<div></div>').attr('class', "div_motor").attr({ 'id': data[row].cod_motor }).appendTo('#container_type')
              .html(



                  "<div class='card'>"+

                  "<div class='card-image'>" +
                  "<img src = " + data[row].descripcion + " alt='foto' </img> " +
                  "</div>" +
                  "<div class='card_title title-black'>" +
                  "<p>" + data[row].nombre_motor + "</p>" 

              )

      }
  }).catch(function() {
      window.location.href = "index.php?page=503";
  });
}

function clicks(){

  localStorage.removeItem('filter');
  localStorage.removeItem('orden');
  localStorage.removeItem('filter_search');
  localStorage.removeItem('Id_visitas');

  $(document).on("click",'div.carousel__elements', function (){
    var filter = [];
    filter.push(['cod_marca', this.getAttribute('id')]);
    localStorage.setItem('filter', JSON.stringify(filter)); 
      setTimeout(function(){ 
        window.location.href = friendlyURL('?module=shop');
      }, 200); 

  }); 

  $(document).on("click",'.div_cate', function (){
    var filter = [];
    filter.push(['cod_categoria', this.getAttribute('id')]);
    localStorage.setItem('filter', JSON.stringify(filter)); 
      setTimeout(function(){ 
        window.location.href = friendlyURL('?module=shop');
      }, 200); 

  });

  $(document).on("click",'.div_motor', function (){
    var filter = [];
    filter.push(['cod_motor', this.getAttribute('id')]);
    localStorage.setItem('filter', JSON.stringify(filter)); 
      setTimeout(function(){ 
        window.location.href = friendlyURL('?module=shop');
      }, 200);  

  });

  $(document).on("click",'.div_views', function (){
      var Id = [];
      Id.push(this.getAttribute('id'));
      localStorage.setItem('Id_visitas', JSON.stringify(Id)); 
        setTimeout(function(){ 
          window.location.href = friendlyURL('?module=shop');
        }, 200); 

    });
} 

function load_more_Books_car() {
  var limit = 3;

  $(document).on("click", '#load_more_books', function() {
      limit = limit + 3;
      $('.books_car').remove();
      $('#load_more_books').remove();
      
      ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=bmw','GET', 'JSON')
          .then(function(data) {
              if (limit === 9) {
                  $('<button class="no-results" id="">No hay mas libros disponibles....</button></br>').appendTo('.btn-more-books');
              } else {
                  $('<button class="load_more_button" id="load_more_books">LOAD MORE</button>').appendTo('.btn-more-books');
              }

              for (i = 0; i < limit; i++) {
                  $('<div></div>').attr({ id: 'books_car', class: 'books_car' }).appendTo('.books_content')
                      .html(
                          '<div class="col-md-4 col-sm-4 col-xs-12">' +
                          '<div class="panel panel-danger adjust-border-radius">' +
                          '<div class="title_book panel-heading adjust-border">' +
                          '<h4>' + data.items[i].volumeInfo.title + '</h4>' +
                          '</div>' +
                          '<div class="panel-body">' +
                          '<ul class="plan">' +
                          '<li class="Img_new"><img src=' + data.items[i].volumeInfo.imageLinks.thumbnail + '</li>' +
                          '<li><i id="col-ico" class="fa-solid fa-user-large fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.authors[0] + '</li>' +
                          '<li><i id="col-ico" class="fa-solid fa-calendar-days fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.publishedDate + '</li>' +
                          '</ul>' +
                          '</div>' +
                          '<div class="panel-footer">' +
                          '<a href=' + data.items[i].volumeInfo.infoLink + ' target="_blank" class="btn btn-danger btn-block btn-lg adjust-border-radius">MORE INFO</a>' +
                          '</div>' +
                          '</div>' +
                          '</div>'
                      );
              }
          }).catch(function() {
              window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=News cars HOME";
          });
  })
}

function get_Books_car() {
   limit = 3;

  ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=bmw','POST', 'JSON')
      .then(function(data) {
          data.items.length = limit;
          $('<h2 class="cat">Books related</h2>').appendTo('.books_content');
          $('<button class="load_more_button" id="load_more_books">LOAD MORE</button>').appendTo('.btn-more-books');
          
          for (i = 0; i < data.items.length; i++) {
              $('<div></div>').attr({ id: 'books_car', class: 'books_car' }).appendTo('.books_content')
                  .html(
                      '<div class="col-md-4 col-sm-4 col-xs-12">' +
                      '<div class="panel panel-danger adjust-border-radius">' +
                      '<div class="title_book panel-heading adjust-border">' +
                      '<h4>' + data.items[i].volumeInfo.title + '</h4>' +
                      '</div>' +
                      '<div class="panel-body">' +
                      '<ul class="plan">' +
                      '<li class="Img_new"><img src="' + data.items[i].volumeInfo.imageLinks.thumbnail + '"</li>' +
                      '<li><i id="col-ico" class="fa-solid fa-user-large fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.authors[0] + '</li>' +
                      '<li><i id="col-ico" class="fa-solid fa-calendar-days fa-sm"></i>&nbsp;&nbsp;' + data.items[i].volumeInfo.publishedDate + '</li>' +
                      '</ul>' +
                      '</div>' +
                      '<div class="panel-footer">' +
                      '<a href=' + data.items[i].volumeInfo.infoLink + ' target="_blank" class="btn btn-danger btn-block btn-lg adjust-border-radius">MORE INFO</a>' +
                      '</div>' +
                      '</div>' +
                      '</div>'
                  );
          }
      }).catch(function() {
          window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=News cars HOME";
      });
//   load_more_Books_car();
}




$(document).ready(function() {
//   var books = [];
  loadMostViewed();
  carousel_Brands();
  loadCategories();
  loadCatTypes();
//   get_Books_car();
  clicks();
});