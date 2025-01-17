const fs = require('node:fs');
const glob = require( 'glob' ); //https://github.com/isaacs/node-glob

/**
 * Este script lee de un directorio de md  y copia en el directorio final
 * de mkdocs
 */

//PARAMS
var args = process.argv.slice(2);
console.log("los argumentos son "+ args);
var args = process.argv.slice(2);

let newspaperRootDir=args[0];
let MD_BUILD_DIR= newspaperRootDir+"/build_tmp/md_generated";
let MKDOCS_ROOT_DIR=newspaperRootDir+"/mkdocs/docs";


let dateExecution = new Date().toISOString().split('T')[0];




/**
 * Main execution
 */
(async () => {
    const g = new glob.Glob(MD_BUILD_DIR+'/**/*.md', {});
    for (const file of g) {
        var fileDirPath=file.lastIndexOf("/")+1;
        var originalFileName = file.substring(fileDirPath,file.length);
        
        var destinationFile = MKDOCS_ROOT_DIR+'/hemeroteca/'+originalFileName;
        // File destination.txt will be created or overwritten by default.
        fs.copyFile(file, destinationFile, (err) => {
            if (err) throw err;
            console.log('source.txt was copied to destination.txt');
        });

        //check if is portada
        if(originalFileName == dateExecution+".md"){
            destinationFile = MKDOCS_ROOT_DIR+'/index.md';
            fs.copyFile(file, destinationFile, (err) => {
                if (err) throw err;
                console.log(destinationFile+' succesfully moved');
            });
        }

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
        youtubeChannel.process(notice);
      }else if(notice.provider=="elpais"){
        elPaisProcessor.process(notice);
      }else if(notice.provider=="Sport"){
        sportProcessor.process(notice);
      }else if(notice.provider=="as"){
        asProcessor.process(notice);
      }else if(notice.provider=="feedburner"){
        feedburnerProcessor.process(notice);
      }else if(notice.provider=="futbolenlatele"){
        futbolenlateleProcessor.process(notice);
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