'use strict';

let imageProvider = require('../imageProvider');
/**
 * Processor customizer default provider (No provider)
 * @param {*} nombre 
 * @returns 
 */
exports.process = function(notice) {
    
    formatJsonToCorrectMDAcceptedCharts(notice);
    getImageIfNeeded(notice);
    getModifiedContent(notice);
};


/**
 * Remove unaccepted MD chars and simbols
 */
function formatJsonToCorrectMDAcceptedCharts(notice){
  
    notice.title=notice.title.replaceAll(":", "").replaceAll("&nbsp;","");
    notice.title= decodeHtml(notice.title);

    notice.content=notice.content.replaceAll(":", "").replaceAll("&nbsp;","");
    notice.content= decodeHtml(notice.content);



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