/*
function a() {
    console.log('A');
}
*/



 
var a = function() {
    console.log('A');
}

/*함수가 실행이 끝나면 그다음일을 해라 라고 하고싶으면  함수의 인자로 콜백을 받고 실행해주면 된다
오랜시간 걸려서 실행되는 slowfunc함수가 실행이 되고 콜백이라는 파라미터는 (a)가 가르키는 함수를 갖게 된다
그안에서 callback라는 함수를 실행하면 a의 값인  A가 실행된다
function slowfunc (callback){       
    callback();
}


slowfunc(a);