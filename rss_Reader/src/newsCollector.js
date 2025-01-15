const fs = require('node:fs');
const glob = require( 'glob' ); //https://github.com/isaacs/node-glob
const { log } = require('node:console');

/**
 * Este script tiene de entrada el fichero de configuracion del newspaper.config
 * Lee los data del argumento includeDataDir, los junta y genera un data temporal
 * para ese periodico con las noticias de esos provedores filtrados por las keywords
 */

//PARAMS
var args = process.argv.slice(2);
// console.log("los argumentos son "+ args);
var args = process.argv.slice(2);

var newspapersConfig = JSON.parse(fs.readFileSync(args[0]));

//Directory root that contains all data
let source_data_root_path=args[1];

//Ouput current Newspaper build_tmp directory
let output_buildData_path=args[2];

function containsKeywords(content, keywordList){
  if(!content)
    return false;
  
  let accepted = false;
  let _keywords = keywordList.split(',');
  for(i=0;i<_keywords.length && !accepted ;i++){
    let keyword = _keywords[i].toLowerCase();
    if(content.toLowerCase().includes(keyword)){
      accepted = true;
    }
  }
  
  return accepted;
  
}


/**
 * Read all files from all data directories and subdirectories
 */

var news = [];

(async () => {
    newspapersConfig.includeDataDir.forEach(sourceDir => {
      const g = new glob.Glob(source_data_root_path+'/'+sourceDir.provider_id+'/*.json', {});
      for (const file of g) {
          var fileData = JSON.parse(fs.readFileSync(file));
          
          var acceptedNews = fileData.filter(function(data, index) {
             if(sourceDir.keywords==null){ //All accepted
               news.push(data);
             }else{
              let noticetitle = data.title;
              let noticeContent = data['content:encoded'];
               if(containsKeywords(noticetitle, sourceDir.keywords) || containsKeywords(noticeContent,sourceDir.keywords) ){
                news.push(data);
               }
             }
          })

      }

      let fileOutName = new Date().toISOString().split('T')[0]+".json"
      writeFile(output_buildData_path+"/data/"+fileOutName, JSON.stringify(news) );

    });

    console.log('y he terminado aceptando '+ news.length);

})();





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
