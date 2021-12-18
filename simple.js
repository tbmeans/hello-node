'use strict';

const 
	http = require('http'), 
	fs = require('fs'), 
	hostname = 'localhost', 
	port = 8000, 
	mimeTypes = { 
		'html': 'text/html', 
		'js': 'text/javascript', 
		'css': 'text/css', 
		'json': 'application/json',
		'md': 'text/markdown', 
		'license': 'text/plain', 
		'png': 'image/png', 
		'jpg': 'image/jpeg', 
		'jpeg': 'image/jpeg', 
		'jfif': 'image/jpeg', 
		'gif': 'image/gif', 
		'svg': 'image/svg+xml', 
		'webp': 'image/webp', 
		'bmp': 'image/bmp', 
		'pjpg': 'image/jpeg', 
		'pjp': 'image/jpeg', 
		'apng': 'image/apng', 
		'avif': 'image/avif', 
		'tiff': 'image/tiff', 
		'wmf': 'image/wmf', 
		'wav': 'audio/wave', 
		'mp3': 'audio/mpeg', 
		'mp4': 'application/mp4', 
		'mov': 'video/quicktime', 
		'qt': 'video/quicktime', 
		'3gpp': 'video/3gpp', 
		'ogg': 'application/ogg', 
		'pdf': 'application/pdf', 
		'woff': 'font/woff', 
		'woff2': 'font/woff2', 
		'ttf': 'font/ttf', 
		'otf': 'font/otf', 
		'eot': 'application/vnd.ms-fontobject', 
		'ini': 'text/plain', 
		'wasm': 'application/wasm', 
		'xlsx': 'application/vnd.ms-excel', 
		'xls': 'application/vnd.ms-excel', 
		'pptx': 'application/vnd.ms-powerpoint', 
		'ppt': 'application/vnd.ms-powerpoint', 
		'docx': 'application/vnd.ms-word.document.macroEnabled.12', 
		'doc': 'application/vnd.ms-word.document.macroEnabled.12', 
		'xml': 'application/xml', 
		'xul': 'application/vnd.mozilla.xul+xml',
		'zip': 'application/zip', 
		'gz': 'application/gzip' 
	}; 

const server = http.createServer(function(req, res) {
	const reqAsPath = '.' + req.url;
	let filePath = (reqAsPath == './') ? './index.html' : reqAsPath,  
		indexOfExtDot = filePath.lastIndexOf('.'), 
		fileExt, 
		contentType; 
	if (indexOfExtDot === filePath.indexOf('.')) { 
		fileExt = filePath.slice(2).toLowerCase(); 
	} else { 
		fileExt = filePath.slice(indexOfExtDot + 1).toLowerCase(); 
	}
	if ((contentType = mimeTypes[fileExt]) == undefined) {
		contentType = 'application/octet-stream';
	}
	fs.readFile(filePath, function(error, content) {
		if (error) { 
			if (error.code == 'ENOENT') { 
				res.statusCode = 404; 
				res.end('404 not found'); 
			} else {
				res.statusCode = 500;
				res.end('See site admin for error: ' + error.code + ' ..\n');
			}
		} else {
			res.statusCode = 200;
			res.setHeader('Content-Type', contentType);
			res.end(content, 'utf-8');
		}
	}); 
});

const proc = server.listen(port, hostname, () => { 
	console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGTERM', () => {
	proc.close(() => {
		console.log('Process terminated')
	})
});