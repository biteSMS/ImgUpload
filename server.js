const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	multiparty = require('multiparty'),
	util = require('util'),
	insert = require('./connect')
	server = http.createServer();

server.on('request', (req, res) => {
	let index = req.url.lastIndexOf('.');
	let contentType = req.url.substr(index + 1);
	switch (contentType) {
		case '/':
			contentType = 'text/html';
			break;
		case 'js':
			contentType = 'text/javascript';
			break;
		case 'css':
			contentType = 'text/css';
			break;
		case 'ico':
			contentType = 'image/x-icon';
			break;
		default:
			contentType = '';
			break;
	}
	if (req.url === '/') {
		req.url = "index.html";
	}
	if (req.url !== '/upload') {
		let filePath = path.join(__dirname, '/dist', req.url);
		res.writeHead(200, {
			'Content-type': contentType
		});
		let readStream = fs.createReadStream(filePath);
		// console.dir(readStream);
		readStream.pipe(res);
	}
	if (req.url === '/upload') {
		res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
		var form = new multiparty.Form();
		form.encoding = 'utf-8';
		form.uploadDir = "./uploads";
		form.maxFilesSize = 12 * 1024 * 1024;
		form.parse(req, function (err, fields, files) {
			console.log(files)
			var inputImg = files.img[0];
			var uploadedPath = inputImg.path;
			var dstPath = './uploads/' + inputImg.originalFilename;
			fs.renameSync(uploadedPath, dstPath);
			files.img.path = dstPath;
			insert(inputImg.originalFilename);
		});
		res.end();
	}
}).listen(8080, '127.0.0.1', () => console.log('The server is running.'));