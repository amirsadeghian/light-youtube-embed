/* Light Youtube Embed v1.0.0
* https://github.com/amirsadeghian/light-youtube-embed
* Author: Amir Sadeghian
* 29-06-2019
*/

// DOM is ready
document.addEventListener("DOMContentLoaded", function() {
	injectYoutubeApiScript();
	injectLightEmbedCSS();
	injectLightEmbedModal();

	//Target all the elements with youtube class\
	//@TODO: Use a parameter for the class selector
	let iframes = document.querySelectorAll('.youtube');
	let player;
	//Check to make sure array is not empty
	if(iframes.length > 0){
		let count = iframes.length;
		for(let i=0; i<count; i++){
			let currentIframe = iframes[i];
			let videoId = extractYotubeEmbedID(currentIframe.src);
			let videoWrap = document.createElement("DIV");
			videoWrap.setAttribute('video-id', videoId);
			videoWrap.classList.add('light-youtube-embed');
			videoWrap.onclick = function(){
				let youtubeVideoId = this.getAttribute('video-id');
				console.log(youtubeVideoId);
				player = new YT.Player('lyemb-player', {
					height: '360',
					width: '640',
					videoId: youtubeVideoId,
					events: {
						'onReady': onLightYoutubeEmbedPlayerReady,
						'onStateChange': onLightYoutubeEmbedPlayerStateChange
					}
				});
				//Show the player
				console.log(document.getElementsByClassName('lyemb-player-wrap')[0]);
				document.getElementsByClassName('lyemb-player-wrap')[0].style.display = 'block';
			}
			//Generate the thumbnail - This is unreliable. 
			//@TODO: Use Youtube API instead
			let videoThumnail = document.createElement("IMG");
			videoThumnail.src = 'https://i1.ytimg.com/vi/'+videoId+'/hqdefault.jpg';
			videoWrap.appendChild(videoThumnail);
			//Append play button
			videoWrap.innerHTML += '<svg version="1.1" class="lyemb-pb" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 360.3" style="enable-background:new 0 0 512 360.3;" xml:space="preserve"><g><g><path class="lyemb-pb-w" d="M492,30.9C473.6,9,439.4,0,374.3,0H137.7C71.1,0,36.4,9.5,18,32.9C0,55.7,0,89.3,0,135.8  v88.6c0,90.1,21.3,135.8,137.7,135.8h236.6c56.5,0,87.8-7.9,108.1-27.3c20.8-19.9,29.6-52.3,29.6-108.5v-88.6  C512,86.8,510.6,53,492,30.9z M328.7,192.4l-107.4,56.1c-2.4,1.3-5,1.9-7.7,1.9c-3,0-5.9-0.8-8.6-2.4c-4.9-3-8-8.4-8-14.1V122  c0-5.8,3-11.1,7.9-14.1c4.9-3,11.1-3.2,16.2-0.5l107.4,55.8c5.5,2.8,8.9,8.5,8.9,14.6C337.6,183.9,334.2,189.6,328.7,192.4z"></path></g></g><path class="lyemb-pb-c" d="M328.4,192.1l-107.4,56.1c-2.4,1.3-5,1.9-7.7,1.9c-3,0-5.9-0.8-8.6-2.4c-4.9-3-8-8.4-8-14.1V121.7  c0-5.8,3-11.1,7.9-14.1c4.9-3,11.1-3.2,16.2-0.5l107.4,55.8c5.5,2.8,8.9,8.5,8.9,14.6C337.2,183.6,333.8,189.2,328.4,192.1z" fill="#FFFFFF"></path></svg>';

			//Append the videoWrap to the page
			currentIframe.parentNode.insertBefore(videoWrap,currentIframe);
			//Remove the iframe
			currentIframe.remove();
		}
	}

	// Close button click listeners
	document.addEventListener('click', function(e) {
	    if (e.target.className === 'lyemb-player-close') {
	        document.getElementsByClassName('lyemb-player-wrap')[0].style.display = 'none';
	        //On close, remove the iframe and reset the content of lyemb-player-iframe-wrap
	   		document.getElementsByClassName('lyemb-player-iframe-wrap')[0].innerHTML = '<div id="lyemb-player"></div>';
	    } 
	});
});

//Extracts the Youtube embed ID
function extractYotubeEmbedID(youtubeEmbedURL){
	let regexPattern = /^.*((v\/)|(\/u\/\w\/)|(embed\/))\??([^#\&\?]*).*/;
	let matches = youtubeEmbedURL.match(regexPattern);
	return (matches && matches[5].length === 11)? matches[5] : false;
}

//Adds HTML for player modal
function injectLightEmbedModal(){
	let html = '<div class="lyemb-player-wrap">';
	html += '<div class="lyemb-player-content">';
	html += '<button type="button" class="lyemb-player-close">X</button>';
	html += '<div class="lyemb-player-iframe-wrap">';
	html += '<div id="lyemb-player"></div>';
	html += '</div>';
	html += '</div>';
	document.body.innerHTML+= html;
}

//Adds the Youtube API script
function injectYoutubeApiScript(){
	let youtubeApiScript = document.createElement('script');
	youtubeApiScript.src = "https://www.youtube.com/player_api";
	document.querySelector('head').appendChild(youtubeApiScript);
}

//To avoid introducing a new resource. I am trying to store the CSS in the JS
//User can use CSS do more customization
function injectLightEmbedCSS(){
	let lightYoutubeCSS = '<style>';
	lightYoutubeCSS += '.light-youtube-embed{cursor:pointer;position:relative;display:inline-block;}';
	lightYoutubeCSS += '.lyemb-pb{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:85px;opacity:0.69;transition:all350ms;fill:#414141;}';
	lightYoutubeCSS += '.light-youtube-embed:hover .lyemb-pb{opacity:1;fill:#f80000}';
	lightYoutubeCSS += '.lyemb-player-wrap{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#0b0b0bcc;z-index:9999999;display:none;}';
	lightYoutubeCSS += '.lyemb-player-content{width:85%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-height:75vh;max-width:900px;}';
	lightYoutubeCSS += '.lyemb-player-close{color:#ffffff;right:-5px;padding-right:5px;right:-30px;top:-30px;font-size:48px;text-align:right;width:100%;overflow:visible;cursor:pointer;background:00;border:0;-webkit-appearance:none;display:block;outline:none;padding:0;z-index:999999;-webkit-box-shadow:none;box-shadow:none;position:relative;line-height:0;}';
	lightYoutubeCSS += '.lyemb-player-iframe-wrap{position:relative;padding-bottom:56.25%;height:0;}';
	lightYoutubeCSS += '.lyemb-player-iframe-wrap iframe{position:absolute;top:0;left:0;width:100%!important;height:100%!important;max-width:none!important;}';
	lightYoutubeCSS += '<style>';
	document.querySelector('head').innerHTML += lightYoutubeCSS;
}

// Functions for play/stop of youtube iframe
//Ref: https://developers.google.com/youtube/iframe_api_reference
function onLightYoutubeEmbedPlayerReady(event) {
	event.target.playVideo();
}
let done = false;
function onLightYoutubeEmbedPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopLightYoutubeVideo, 6000);
		done = true;
	}
}
function stopLightYoutubeVideo() {
	player.stopVideo();
}