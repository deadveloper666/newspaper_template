const fs = require('node:fs');
const curl = require("curl");
const jsdom = require("jsdom");


//PARAMS
var args = process.argv.slice(2);
console.log("Loading config from  "+ args[0]);
var sourceFeedConfig = require(args[0]);
let output_root_path=args[1];



let outputFiles = [new Date().toISOString().split('T')[0]+".json"];
//TODO: todavia no leemos dianmicamente del sourceWebscrappingconfig.json  

const url = "https://futbolenlatele.com";

var dias =[];
var contador = -1;


/**
 * Write to external file
 * @param {*} directory 
 * @param {*} file 
 * @param {*} content 
 */
function writeFile(directory, file, content){
  try {
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(directory+"/"+file, JSON.stringify(content));
  } catch (err) {
    console.error(err);
  }
}


function parseData(html){
    const {JSDOM} = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);    //let's start extracting the data
    var items = $(".partidos");
    for(var i = 0; i < items.length; i++){
         var tag = $(items[i]) ;


        tag.children().each(function () {
            var curretTag = $(this);
            if(curretTag.prop("tagName") == "A"){
                contador++;
                dias[contador]={
                    "titulo": curretTag.find("h3").text(),
                    "partidos": []
                }
            } 

            
            if(curretTag.attr('class')!=null && 
                curretTag.attr('class').includes("div_partido")){
                dias[contador].partidos.push({
                    competicion: curretTag.find(".div_campeonato a").text().trim(),
                    equipo1:curretTag.find(".div_equipo1 a").text().trim(),
                    equipo2:curretTag.find(".div_equipo2 a").text().trim(),
                    hora:curretTag.find(".div_hora").text().trim(),
                    cadena:curretTag.find(".div_cadena span").text().trim()
                });
            }
        });
        
    //   var innerInfo = $(items[i]).children('.info');
    //   var movieName = $($(innerInfo).find('a')[0]).html();
    //   var movieYear = $($(innerInfo).find('.year_type')[0]).html();
    //   console.log(i + " -> " + movieYear + ":" + movieName);
    }
    console.log("he terminado");

    console.log(JSON.stringify(dias, null, 2));

    /** Output to JSON FILE */
    outputFiles.forEach(fileName =>{
        writeFile(output_root_path+"/futbolenlatele", fileName,dias );
      });
}


curl.get(url, null, (err,resp,body)=>{
   
  if(resp.statusCode == 200){
     parseData(body);
  }
  else{
     //some error handling
     console.log("error while fetching url");
     console.log(err);
  }
});
