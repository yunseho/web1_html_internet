
  module.exports ={
    HTML:function (title,List,body,control){
      return `
      <!doctype html>
            <html>
            <head>
              <title>WEB2! - ${title}</title>
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

  module.exports