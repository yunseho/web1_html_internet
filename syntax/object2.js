//array,object

var f = function f1(){   //이것은 값이다 (값은 변수에 넣을 수 있다)
    console.log(1+1);
    console.log(1+2);
}
var a = [f]; //원소로서 담긴 함수f
a[0]();

var o = {     //o는 object
    func:f    //func객체의 원소 프로퍼티
                //객체는 담아논 함수를 이름으로 꺼내기 좋다
}    
o.func();





/*
var i = if(true){console.log(1)};

var w = while(true){ console.log(1);}
에러남 값이 될 수 없기 때문이다
*/