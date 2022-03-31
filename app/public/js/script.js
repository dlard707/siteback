let url_atual = window.location.pathname;

if(url_atual == '/'){
   document.querySelector('#menu-home').className = "nav-link text-white active";
}else if( url_atual == '/noticias'){
   document.querySelector('#menu-noticias').className = "nav-link text-white active";
}else if( url_atual == '/admin'){
   document.querySelector('#menu-admin').className = "nav-link text-white active";
}