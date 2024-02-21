'use strict';

exports.saludame = function(nombre) {
    
    return "hola "+nombre;
};

exports.getImage = function(nombre) {
    var random_boolean = Math.random() < 0.5;
    if(random_boolean){
        return "https://imagenes.20minutos.es/files/image_640_360/files/fp/uploads/imagenes/2023/04/12/pep-guardiola.r_d.2136-374-1398.jpeg";
    }else{
        return "https://img.freepik.com/foto-gratis/vista-balon-futbol-campo-hierba_23-2150887547.jpg";
    }
};

exports.getContent= function(content){
    var random_boolean = Math.random() < 0.5;
    if(random_boolean){
        return content;
    }else{
        return content + '<div class="nt-card-image tags" ><iframe src="https://www.youtube.com/embed/0T9q6HjqzhU" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" width="280" height="200" frameborder="0"></iframe></div>';
    }
   
}