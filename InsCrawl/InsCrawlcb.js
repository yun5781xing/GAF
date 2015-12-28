var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var http = require('http');
//var dns = require('dns');


//var imgsObj = require('./ImgArray');
var imgsObj = require('./ImgArrayHttp');
//var imgsObj = require('./BaiduHeaderImgArray');
var imgs = imgsObj.imgs;

function quickCrawlImg() {
	var i = 0;
	for (i = 0; i < imgs.length; i++) {
		console.log(i + "/" + imgs.length);
		console.log(imgs[i]);
		request(imgs[i]).pipe(fs.createWriteStream('./DFFImg/dff' + i + '.jpg'));
	}
}

function quickCrawlImgOut(i) {
	url = imgs;
	http.get(url[i], function(res) {
		var imgData = "";
		res.setEncoding("binary");
		res.on("data", function(chunk) {
			imgData += chunk;
		});
		res.on("end", function() {
			fs.writeFile("./testImg/" + i + ".png", imgData, "binary", function(err) {
				if (err) {
					console.log(i + ".png " + "down fail");
				}
				console.log(i + ".png " + "down success");
			});
		});
	});
}

function slowCrawlImg(i) {
	console.log(i + "/" + imgs.length);
	console.log(imgs[i]);
	request(imgs[i]).pipe(fs.createWriteStream('./DFFImg/dff' + i + '.jpg'));
	//console.log(request(imgs[i]));
	if (i < imgs[i]) {
		clearInterval();
	}
}

function htmlCrawl() {
	request.get('', function(error, response, result) {
		//console.log(result);
		$ = cheerio.load(result);
		var divs = $('');
		console.log(divs);

	});
}

function run(cb, prarm) {
	if (prarm) {
		var i = prarm;
	} else {
		var i = 0;
	}
	setInterval(
		function() {
			console.log(i + "/" + imgs.length);
			cb(i);
			i++;
		}, 1000)
}


var options = process.argv;
for (var o = 0; o < options.length; o++) {
	if (options[o] == "s") {
		run(slowCrawlImg);
	} else if (options[o] == "q") {
		quickCrawlImg();
	} else if (options[o] == "qo") {
		var prarm = options[3];
		run(quickCrawlImgOut, prarm);
	}
}

function readFile() {
	fs.readFile('./www.instagram.com-1451121958567.log', function(err, logData) {
		if (err) throw err;
		var text = logData.toString();
		console.log(text);
	});
}