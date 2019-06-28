/* Light Youtube Embed v1.0.0
 * https://github.com/amirsadeghian/light-youtube-embed
 * Author: Amir Sadeghian
 * 29-06-2019
 */

 // DOM is ready
 document.addEventListener("DOMContentLoaded", function() {
 	//Target all the elements with youtube class
 	let iframes = document.getElementsByClassName('youtube');
 	//Check to make sure array is not empty
 	console.log(iframes);
 	if(iframes.length > 0){
 		for(let i=0; i<iframes.length; i++){
 			console.log(iframes[i]);
 			var currentEmbedURL = iframes[i].src;
 			console.log(currentEmbedURL);
 			console.log(extractYotubeEmbedID(currentEmbedURL));
 		}
 	}
 });

 //Function to extract the Youtube embed ID
 function extractYotubeEmbedID(youtubeEmbedURL){
 	let regexPattern = /^.*((v\/)|(\/u\/\w\/)|(embed\/))\??([^#\&\?]*).*/;
 	let matches = youtubeEmbedURL.match(regexPattern);
 	return (matches && matches[5].length === 11)? matches[5] : false;
 }