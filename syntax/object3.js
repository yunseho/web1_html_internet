// var v1= 'v1';

// v1 = 'egoing';
// var v2 = 'v2';


var p = {
    v1:'v1',
    v2:'v2',
    f1:function f1() {
        console.log(this.v1);  //자신이 속한 객체를 참조할 수 있는 특수한 약속이 필요하다
    },                          //그것은 this라는 약속된 키워드다
    f2:function f2() {
        console.log(this.v2);
    }
}

p.f1();
p.f2();