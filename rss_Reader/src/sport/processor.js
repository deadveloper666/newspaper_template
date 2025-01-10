'use strict';

let imageProvider = require('../imageProvider');

/**
 * Processor customizer for El pais  feeds
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
    var _formatedContent = decodeHtml(notice['content']);
    notice.content='<div class="tags">'+_formatedContent+'</div>';
    notice.content=notice.content.replaceAll(" : ", ",").replaceAll(": ", ",").replaceAll("&nbsp;","");
    //No notice.image
}

function getImageIfNeeded(notice){
  notice.image=imageProvider.getImage(notice);
  return notice;
}

function getModifiedContent(notice){
 // notice.contentSnippet=imageProvider.getContent(notice.contentSnippet);
  return notice;
}


function decodeHtml(str) {
    if(str!=null){
      str=str.replaceAll('&amp;','&');
      str=str.replaceAll('&lt;','<');
      str=str.replaceAll('&gt;','>');
      str=str.replaceAll('&#39;',"'");
      str=str.replaceAll('&quot;','&');
      str=str.replaceAll('&#34;','"');
      str=str.replaceAll('\n',' ');
      str=str.replaceAll('\'','');
      
      str=str.replaceAll('&oacute;','ó');
      str=str.replaceAll('&ldquo;','');
      str=str.replaceAll('&rdquo;','');
      str=str.replaceAll('&aacute;','á');
      str=str.replaceAll('&iacute;','í');
      str=str.replaceAll('&uacute;','ú');
      str=str.replaceAll('&ntilde;','ñ');
      str=str.replaceAll('&oacute;','ó');
      str=str.replaceAll('&eacute;','é');
      str=str.replaceAll('&eacute;','é');
      str=str.replaceAll('&ordm;','º');
      
    }
    
    return str;
  }