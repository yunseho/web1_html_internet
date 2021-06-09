var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring')

var template={
  HTML:function (title,List,body,control){
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
            ${control}
            ${body}
          </body>
          </html>
        `;
  },List: function (fileList) {
    var List = '<ul>';
    var i = 0;
    while (i < fileList.length) {
      List = List + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`
      i = i + 1;
    }
    List = List + '<ul>';
    return List;
    
  }
}

function templateHTML(title,List,body,control){
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
          ${control}
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
  }
  List = List + '<ul>';
  return List;
  
}



var app = http.createServer(function (request, response) {
  //createServer는 node.js로 웹브라우저 접속이 들어올때마다 콜백함수를 node.js가  호출한다 그때에 저함수에 인자를 2개 주는데 request에는 요청할 떄의 웹브라우저가 보낸 정보를 response응답할때의 우리가 웹브라우저한테 전송할정보를 담는다
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {   //홈
    if (queryData.id === undefined) {

      fs.readdir('./data', function (error, fileList) {
        var title = title = 'welcome';
        var description = 'hell hode.js';
        /*
        var List = templateList(fileList);
        var template = templateHTML(title,List,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(template);
        */
        var List = template.List(fileList);
        var html = template.HTML(title,List,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(html);
      })
    } else { //id값이 있을 때
      fs.readdir('./data', function (error, fileList) {
        fs.readFile(`./data/${queryData.id}`, 'utf8',
        function (err, description) {
          var title = queryData.id;
          var List = templateList(fileList);
          var html = templateHTML(title,List,`<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>  
           <a href="update?id=${title}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
          </form>
          `);
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if(pathname == '/create') {
    // form 처리부분
      fs.readdir('./data', function (error, fileList) {
        var title = title = 'WEB -create';
        var description = 'hell hode.js';
        var List = templateList(fileList);
        var template = templateHTML(title,List,`
        <form action="/create_process" method="POST"> 
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
        <textarea name="description" placeholder= "description"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
    </form>
    `,'');
        response.writeHead(200);
        response.end(template);
      })
  }else if(pathname === '/create_process'){
    var body="";
    request.on('data',function(data){
      body =body + data; //콜백이 실행될때마다 body에 데이터를 추가해주고 있다
                         //용량이 너무 크게 들어오면 접속을 끊어 버리는 장치이다
    }) 
    /*웹브라우저가 request방식으로 post를 전송할 때
    data가 엄청나게 많으면 그것을 한번에 처리하다가 
    꺼지는 등의 무리가 가게되어 생기는 여러가지 일을 대비하여
    node에서는 post에서 전송되는 데이터가 많을 것을 대비하여
    어떤 특정한 양 100이 있다면 일정한 조각 조각의 양을 수신할 때마다
    서버는 이 콜백함수를 호출하도록 약속하고 있다
    그리고 호출할때에 data라는 인자를 통해서 수신한 정보를 주기로 하고 있다 */
    request.on('end',function(){
           //정보가 들어오다가 끝나면 end다음에 들어오는  콜백을 수신하도록 되어있다
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.writeHead(302, {Location: `/?id=${title}`});
      response.end('success');
      });
    });
  } else if(pathname === '/update'){
    fs.readdir('./data', function (error, fileList) {
      fs.readFile(`./data/${queryData.id}`, 'utf8',
      function (err, description) {
        var title = queryData.id;
        var List = templateList(fileList);
        var template = templateHTML(title,List,`
        <form action="update_process" method="POST"> 
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
            <textarea name="description" placeholder= "description">${description}</textarea>
        </p>
        <p>
            <input type="submit">
        </p>
        </form>
    `,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
        response.writeHead(200);
        response.end(template);
      });
    });
  } else if(pathname=== '/update_process'){
    var body="";
    request.on('data',function(data){
      body =body + data; 
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`,`data/${title}`,function(error){})
      //이름을 바꿔주고
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          //바꿔준 이름에 description 를 전달해 주고
          response.writeHead(302, {Location: `/?id=${title}`});
          //타이틀 주소로 들어간다
          response.end('');
           console.log(post);
        })
      });
     
      /*
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.writeHead(302, {Location: `/?id=${title}`});
      response.end('success');
      */
      });
  }else if(pathname=== '/delete_process'){
    var body="";
    request.on('data',function(data){
      body =body + data; 
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
      fs.unlink(`data/${id}`,function(error){
        response.writeHead(302, {Location: `/`});
        response.end('success');
      })
      });
    });
    }else{
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);