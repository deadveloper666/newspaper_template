const fs = require('node:fs');
let Parser = require('rss-parser');
let parser = new Parser();



//PARAMS
var args = process.argv.slice(2);
console.log("Loading config from  "+ args[0]);
var sourceFeedConfig = require(args[0]);
let output_root_path=args[1];
console.log(sourceFeedConfig.sourceFeeds);


let outputFiles = ["index.json", new Date().toISOString().split('T')[0]+".json"];


/**Main Entrance */
processFeeds(sourceFeedConfig.sourceFeeds);
/**
 * Process a Feed Config List
 * @param {*} feedsConfig 
 */
function processFeeds(feedsConfig){
  feedsConfig.forEach((feedConfig)=>{
      fetchFeed(feedConfig, output_root_path);
  });
}

/**
 * Process a Feed
 * @param {} feedURL 
 * @param {*} output_root_path 
 * @param {*} category 
 */
 async function fetchFeed(feedConfig, output_root_path) {

    let feed = await parser.parseURL(feedConfig.url);
    //Global feed Info
    console.log(feed.title);
    //Feed Items
    formatFeeds(feed.items, feedConfig);
  
    /** Output to JSON FILE */
    outputFiles.forEach(fileName =>{
      writeFile(output_root_path+"/"+feedConfig.category, fileName,feed.items );
    });
}



function formatFeeds(feeds, feedConfig){
  
  feeds.forEach(item => {
    console.log(item.title + ':' + item.link);
    item.provider=feedConfig.provider;
  });

  return feeds;
}

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