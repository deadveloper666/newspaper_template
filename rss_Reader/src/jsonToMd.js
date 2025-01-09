const fs = require('node:fs');
const glob = require( 'glob' ); //https://github.com/isaacs/node-glob
let ejs = require('ejs');
let processorDefault = require('./default/processor');
let processorMarca = require('./marca/processor');
let processorYouTubeGolTV = require('./youtubeGolTv/processor');







//PARAMS
var args = process.argv.slice(2);
console.log("los argumentos son "+ args);
var args = process.argv.slice(2);

let source_data_root_path=args[0];
console.log("Loading data from  "+  source_data_root_path);

let output_md_root_path=args[1];
console.log("Output directory  "+  output_md_root_path);





/** TEMPLATES **/

let cardsTemplate = 
`
::cards::  cols=<%= items.length %>

<% items.forEach(function(item){ %>
- title: <%= item.title %>
  content: <%= item.content %>
  <% if (item.image!=null) { %>
  image: <%= item.image %>
  <% } %>
  
<% }); %>

::/cards::
`;






/**
 * Main execution
 */
(async () => {
    const g = new glob.Glob(source_data_root_path+'/**/*.json', {});
    for (const file of g) {
        let content = parseJSONtoMD(file);
        let destinationFile = file.replaceAll(source_data_root_path,output_md_root_path).replaceAll("data","md").replaceAll("json","md");
        writeFile(destinationFile, content);
      }
})();


function parseJSONtoMD(file){
    var obj = JSON.parse(fs.readFileSync(file));
    // console.log("he leido el JSON "+obj);
    return createCards(obj);

}


function createCards(news){
    console.log("creando cards "+news);

    news.forEach((notice)=>{
      if(notice.provider=="Marca"){
        processorMarca.process(notice);
      }else if(notice.provider=="YouTubeChannel"){
        processorYouTubeGolTV.process(notice);
      }else{
        processorDefault.process(notice);
      }
    });


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
    fs.mkdirSync(file.substring(0,fileDirPath), { recursive: true });
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