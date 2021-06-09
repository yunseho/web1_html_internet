var fs =require('fs');

//readFileSync
/*
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8')
console.log(result);
console.log('C');
*/


console.log('A');

       //node.js가 파일읽기작업이 끝나면           3번재인자(함수)를 실행시키면서 첫번째 인자의 오류가 있으면 에러를 두번재 파라미터에는 파일의 내용을 인자로서 공급하게 되어있다 
 fs.readFile('syntax/sample.txt','utf8'         ,function(err,result){             
        console.log(result);
});
console.log('C');

