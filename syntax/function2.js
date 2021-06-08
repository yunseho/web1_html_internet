
console.log(Math.round(1.6));
console.log(Math.round(1.4));

function sum (first, second){
    console.log('a');
    return first+second;    //return은 함수를 종료시킴 그래서 'b'는 표시안됨
    console.log('b');
}

console.log(sum(2,4));  

