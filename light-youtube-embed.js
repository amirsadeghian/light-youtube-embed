/* Light Youtube Embed v1.0.0
 * https://github.com/amirsadeghian/light-youtube-embed
 * Author: Amir Sadeghian
 * 29-06-2019
 */

 // DOM is ready
 document.addEventListener("DOMContentLoaded", function() {
 	//Target all the elements with youtube class\
 	//@TODO: Use a parameter for the class selector
 	let iframes = document.querySelectorAll('.youtube');
 	//Check to make sure array is not empty
 	if(iframes.length > 0){
 		let count = iframes.length;
 		for(let i=0; i<count; i++){
 			let currentIframe = iframes[i];
 			let videoId = extractYotubeEmbedID(currentIframe.src);
 			let videoWrap = document.createElement("DIV");
 			videoWrap.classList.add('light-youtube-embed');
 			//Generate the thumbnail - This is unreliable. 
 			//@TODO: Use Youtube API instead
 			let videoThumnail = document.createElement("IMG");
 			videoThumnail.src = 'https://i1.ytimg.com/vi/'+videoId+'/hqdefault.jpg';
 			videoWrap.appendChild(videoThumnail);
 			//Append the videoWrap to the page
 			currentIframe.parentNode.insertBefore(videoWrap,currentIframe);
 			//Remove the iframe
 			currentIframe.remove();
 		}
 	}
 });

 //Extracts the Youtube embed ID
 function extractYotubeEmbedID(youtubeEmbedURL){
 	let regexPattern = /^.*((v\/)|(\/u\/\w\/)|(embed\/))\??([^#\&\?]*).*/;
 	let matches = youtubeEmbedURL.match(regexPattern);
 	return (matches && matches[5].length === 11)? matches[5] : false;
 }