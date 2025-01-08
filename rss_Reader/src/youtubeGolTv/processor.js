'use strict';

let imageProvider = require('../imageProvider');

/**
 * Processor customizer for You Tube Gol TV channel feeds
 * 
 * Notice must have the fields:
 *    -title
 *    -content
 *    -image
 * 
 * @param {*} nombre 
 * @returns 
 */
exports.process = function(notice) {
    formatJsonToCorrectMDAcceptedCharts(notice);
    // getImageIfNeeded(notice);
    getModifiedContent(notice);
};


/**
 * Remove unaccepted MD chars and simbols
 */
function formatJsonToCorrectMDAcceptedCharts(notice){
  
    notice.title=notice.title.replaceAll(":", "").replaceAll("&nbsp;","");
    notice.title= decodeHtml(notice.title);
    let videoId = notice.link.split("v=")[1];
    notice.content='<div class="nt-card-image tags" ><iframe src="https://www.youtube.com/embed/'+videoId+'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" width="450" height="350" frameborder="0"></iframe></div>';
    
    //No notice.image
}

function getImageIfNeeded(notice){
  notice.image=imageProvider.getImage(notice);
  return notice;
}

function getModifiedContent(notice){
  notice.contentSnippet=imageProvider.getContent(notice.contentSnippet);
  return notice;
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