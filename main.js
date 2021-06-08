var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title,List,body){
  return `
  <!doctype html>
        <html>
        <head>
          <title>WEB! - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${List}
          ${body}
        </body>
        </html>
      `;
}

function templateList(fileList) {
  var List = '<ul>';
  var i = 0;
  while (i < fileList.length) {
    List = List + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`
    i = i + 1;
    console.log(i);
  }
  List = List + '<ul>';
  return List;
  
}


var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  
  if (pathname === '/') {
    if (queryData.id === undefined) {

      fs.readdir('./data', function (error, fileList) {
        var title = title = 'welcome';
        var description = 'hell hode.js';
        var List = templateList(fileList);
        var template = templateHTML(title,List,`<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
      })
    } else { //id값이 있을 때
      fs.readdir('./data', function (error, fileList) {
        fs.readFile(`./data/${queryData.id}`, 'utf8',
        function (err, description) {
          var title = queryData.id;
          var List = templateList(fileList);
          var template = templateHTML(title,List,`<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);