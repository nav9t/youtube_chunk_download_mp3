var express = require('express');
var router = express.Router();

//configure downloader
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
 

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "#",        // Where is the FFmpeg binary located?
    "outputPath": "#",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "lowest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});
 


//reading file 
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./routes/file.txt')
});

lineReader.on('line', function (line) {

	  	YD.download(line,line+".mp3");
	 
		YD.on("finished", function(err, data) {
	    	console.log(":finished");
		});
	 
		YD.on("error", function(error) {
	    console.log(error);
		});
	 
		YD.on("progress", function(progress) {
		    console.log(JSON.stringify(progress));
	});
});



/*
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
 

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "C:/ffmpeg-20181018-f72b990-win64-static/bin/ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": "C:/Users/Navneet gangwar/Desktop/youtube downloader/mp3",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});
 
//Download video and save as MP3 file
YD.download("8kMv5ssr6Dw","abc.mp3");
 
YD.on("finished", function(err, data) {
    console.log(JSON.stringify(data));
});
 
YD.on("error", function(error) {
    console.log(error);
});
 
YD.on("progress", function(progress) {
    console.log(JSON.stringify(progress));
});
*/
module.exports = router;
