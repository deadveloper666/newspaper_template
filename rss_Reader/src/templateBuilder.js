const fs = require('node:fs');
const glob = require( 'glob' ); //https://github.com/isaacs/node-glob
let ejs = require('ejs');
let processorDefault = require('./default/processor');
let processorMarca = require('./marca/processor');
let youtubeChannel = require('./youtubeChannel/processor');
let elPaisProcessor = require('./elpais/processor');
let sportProcessor = require('./sport/processor');
let asProcessor = require('./as/processor');
let feedburnerProcessor = require('./feedburner/processor');
let futbolenlateleProcessor = require('./futbolenlatele/processor');

/**
 * Coge las noticias de hoy y genera:
 * - el md del index
 * - el md del dia (que sera el mismo del dia)
 * - [opcional]: ¿genera detalle de alguna de las noticias?
 */

//PARAMS
var args = process.argv.slice(2);
console.log("los argumentos son "+ args);
var args = process.argv.slice(2);

let newspaperRootFolder=args[0];


let newspaperDataNewsFolder=args[1]+'/data';
let newspaperOutMdFolder=args[1]+'/md_generated';
console.log("Loading data from  "+  newspaperDataNewsFolder);
let newspaperTemplatesNewsFolder=newspaperRootFolder+'/newspaper_templates';
console.log("Loading templates from  "+  newspaperTemplatesNewsFolder);

let output_md_root_path=args[2];
console.log("Output directory  "+  output_md_root_path);

let dateExecution = new Date().toISOString().split('T')[0];



/**
 * Main execution
 */
// 1.Cogemos las noticias que se filtraron para ese dia, estas noticias
// no estan formateadas, es decir es el RSS directamente a objeto javascript

let dateFileNews = newspaperDataNewsFolder+'/'+dateExecution+".json";
var rawDateNews = JSON.parse(fs.readFileSync(dateFileNews));
console.log(rawDateNews);

//2. Formateamos las noticias al objeto json que utilizaremos en las templates
var formattedNews = [];
rawDateNews.forEach(rawNotice=>{
    let formattedNotice = null;
    if(rawNotice.provider=="Marca"){
        formattedNotice = processorMarca.process(rawNotice);
    }else if(rawNotice.provider=="YouTubeChannel"){
        formattedNotice =youtubeChannel.process(rawNotice);
    }else if(rawNotice.provider=="elpais"){
        formattedNotice = elPaisProcessor.process(rawNotice);
    }else if(rawNotice.provider=="Sport"){
        formattedNotice = sportProcessor.process(rawNotice);
    }else if(rawNotice.provider=="as"){
        formattedNotice = asProcessor.process(rawNotice);
    }else if(rawNotice.provider=="feedburner"){
        formattedNotice = feedburnerProcessor.process(rawNotice);
    }else if(rawNotice.provider=="futbolenlatele"){
        formattedNotice = futbolenlateleProcessor.process(rawNotice);
    }else{
        formattedNotice = processorDefault.process(rawNotice);
    }
    if(formattedNotice){
        formattedNews.push(formattedNotice);
    }

});
console.log(formattedNews);

// 3. Rellenar las plantillas
// 3.1 Portada:
/**
title: <%= newspaper.title %> 
description: <%= newspaper.description %> 
cabecera: <%= newspaper.mainNotice %> 
threeNotices: <%= newspaper.threeNotices %> 
advertising: <%= newspaper.advertisingA.image %>
largeNoticeA: <%= newspaper.largeNoticeA %>
youtubeEmbedNotice: <%= newspaper.videoNotice %>
advertisingB: <%= newspaper.advertisingB.image %>
 */
var newsPaperPortada = {
    title:"soloboxeo.com",
    description: "Actualidad del mundo del boxeo",
    mainNotice: JSON.stringify(getMainNotice()),
    lastVideoNotices: JSON.stringify(getVideoNotices(2)),
    lastVideoNoticesSize: 2,
    advertisingA: JSON.stringify(getRandomAdvertising()),
    largeNoticeA: JSON.stringify(getLargeNotice()),
    threeNotices: JSON.stringify(getThreeNotices()),
    videoNotice: JSON.stringify(getVideoNotice()),
    advertisingB: JSON.stringify(getRandomAdvertising())
};
let large = getLargeNotice();
console.log(newsPaperPortada);


// 4. Fill Data into template 
let renderedPromise = ejs.renderFile(newspaperTemplatesNewsFolder + '/index.ejs', {newspaper: newsPaperPortada});


renderedPromise.then(value => {
    console.log(value);
    writeFile(newspaperOutMdFolder+'/'+dateExecution+".md", decodeHtml(value) );
});








/**
 * Retorna la noticia que considera que es la principal
 * 
 * @param {*} news 
 */
function getMainNotice(){
    
    console.log(formattedNews.length);
    
    let randomIndex= Math.floor(Math.random() * formattedNews.length) ;
    let notice = formattedNews[randomIndex];
    formattedNews = removeElementByIndex (formattedNews, randomIndex);//Removes element from array to not use duplicated
    return {
        title: notice.title,
        content:notice.content,
        image: notice.image?notice.image : 'https://picsum.photos/200/300'
    };
    
}

/**
 * Retorna la noticia que considera que es la principal
 * 
 * @param {*} news 
 */
function getLargeNotice(){
    let randomIndex= Math.floor(Math.random() * formattedNews.length) ;
    
    let notice = formattedNews[randomIndex];
    formattedNews = removeElementByIndex (formattedNews, randomIndex);//Removes element from array to not use duplicated
    return {
        title: notice.title,
        content:notice.content,
        image: notice.image?notice.image : 'https://picsum.photos/200/300'
    };
}

/**
 * Retorna la noticia que considera que es la principal
 * 
 * @param {*} news 
 */
function getThreeNotices(){
    console.log(formattedNews.length);
    let threeNotices = [];
    for(i=0;i<3;i++){
        let randomIndex= Math.floor(Math.random() * formattedNews.length);
        console.log(randomIndex);
        threeNotices.push(
            {
                title: formattedNews[randomIndex].title,
                content:formattedNews[randomIndex].content,
                image: formattedNews[randomIndex].image? formattedNews[randomIndex].image : 'https://picsum.photos/200/300'
            }
        );
        formattedNews = removeElementByIndex (formattedNews, 0);//Removes element from array to not use duplicated
    }
    return threeNotices;
}

function getRandomAdvertising(){
    let advertisings=[
        {"image": "https://neilpatel.com/wp-content/uploads/2021/02/discovery-successful-banner-advertising-.png"},
        {"image": "https://static-cse.canva.com/blob/946428/ScreenShot20160128at11.44.05PMtb800x0.png"},
        {"image": "https://static-cse.canva.com/blob/946445/21tb800x0.jpg"}

        
    ];
    let randomIndex= Math.floor(Math.random() * advertisings.length);
    return advertisings[randomIndex];
    
}


function getVideoNotices(cantidad){
    var videos =[];
    for(f=0;f<cantidad;f++){
        videos.push(getVideoNotice());
    }
    return videos;
}

function getVideoNotice(){
    
    let videoNotice = null;
    for(i=0; (i<formattedNews.length && !videoNotice );i++){
        if(formattedNews[i].provider == 'YouTubeChannel'){
            videoNotice = formattedNews[i];
            formattedNews = removeElementByIndex (formattedNews, i);//Removes element from array to not use duplicated
        }
    }
    return {
        "videoId":videoNotice.id.split(":")[2], //"cpA8z-xKAfs", 
        "videoTitle":videoNotice.title
    };
}

function removeElementByIndex(arr, elementIndex){
    var result = arr.filter(function(e, i) {
        return i != elementIndex ;
    });
    return result;
}






function parseJSONtoMD(file){
    var obj = JSON.parse(fs.readFileSync(file));
    // console.log("he leido el JSON "+obj);
    return createCards(obj);

}


function fillDataIntoMDTemplate(news){
    let md = ejs.render(cardsTemplate, {items: news});
    return decodeHtml(md);
}




/**
 * Write to external file
 * @param {*} directory 
 * @param {*} file 
 * @param {*} content 
 */
function writeFile( file, content){
  try {
    var fileDirPath=file.lastIndexOf("/");
    // fs.mkdirSync(file.substring(0,fileDirPath), { recursive: true });
    fs.writeFileSync(file, content);
  } catch (err) {
    console.error(err);
  }
}


 function decodeHtml(str) {

  str=str.replaceAll('&amp;','&');
  str=str.replaceAll('&lt;','<');
  str=str.replaceAll('&gt;','>');
  str=str.replaceAll('&#39;',"'");
  str=str.replaceAll('&quot;','&');
  str=str.replaceAll('&#34;','"');
  

  return str;


}