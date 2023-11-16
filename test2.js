const findMaxMin = (array) => {
  let max = 0;
  let min = array[0];
  for (let i = 0; i < array.length; i++) {
    if (max < array[i]) max = array[i];
    if (min > array[i]) min = array[i];
  }

  console.log("min : ", min, " max : ", max);
};

// findMaxMin([02, 01, 11, 34, 5, 9]);

const pass = "1111111111111111111111111111111111111111111111111111111111111111";
console.log(pass.length);

const log = console.log;

function maxTwo(a, b) {
  return a >= b ? a : b;
}

function maxThree(a, b, c) {
  if (a >= b) {
    if (a >= c) return "A : " + a;
    else return "C : " + c;
  } else {
    if (b >= c) return "B : " + b;
    else return "C : " + c;
  }
}

function maxThreeChat(a, b, c) {
  if (a >= b && a >= c) return "A : " + a;
  if (b >= c) return "B : " + b;
  return "C : " + c;
}

function maxThreeWithTwo(a, b, c) {
  if (a >= b) {
    // a and c
    return maxTwo(a, c);
  } else {
    // b and c
    return maxTwo(b, c);
  }
}

function maxFour(a, b, c, d) {
  if (a >= b) {
    if (a >= c) {
      if (a >= d) return "A : " + a;
      else return "D : " + d;
    } else {
      if (c >= d) return "C : " + c;
      else return "D : " + d;
    }
  } else {
    if (b >= c) {
      if (b >= d) return "B : " + b;
      else return "D : " + d;
    } else {
      if (c >= d) return "C : " + c;
      else return "D : " + d;
    }
  }
}

function maxFourWithFunction(a, b, c, d) {
  if (a >= b) {
    // a,c,d
    return maxThreeWithTwo(a, c, d);
  } else {
    // b,c,d
    return maxThreeWithTwo(b, c, d);
  }
}

log("Check for Three params");
log(maxThree(10, 20, 30));
log(maxThree(5, 15, 10));
log(maxThree(100, 100, 100));
log(maxThree(-5, -10, -3));
log(maxThree(0, 0, 0));

log("Check for Three params with two function helping");
log(maxThreeWithTwo(10, 20, 30));
log(maxThreeWithTwo(5, 15, 10));
log(maxThreeWithTwo(100, 100, 100));
log(maxThreeWithTwo(-5, -10, -3));
log(maxThreeWithTwo(0, 0, 0));

log("Check for Four params");

log(maxFour(10, 20, 30, 40));
log(maxFour(-5, -1, -3, -10));
log(maxFour(100, 50, 175, 125));
log(maxFour(100, 250, 175, 125));
log(maxFour(-1, -10, -3, -4));
log(maxFour(0, 0, 0, 0));
log(maxFour(1, 2, 3, 4));

log("max four with 3rd function");

log(maxFourWithFunction(10, 20, 30, 40));
log(maxFourWithFunction(-5, -1, -3, -10));
log(maxFourWithFunction(100, 50, 175, 125));
log(maxFourWithFunction(100, 250, 175, 125));
log(maxFourWithFunction(-1, -10, -3, -4));
log(maxFourWithFunction(0, 0, 0, 0));
log(maxFourWithFunction(1, 2, 3, 4));

const fun = (data) => {
  const d = {
    success: true,
    ...data,
  };

  console.log(d, "dddddd");
};

const fun2 = () => {
  fun({ error: { msg: "ctest" } });
};

fun2();


console.log('************************************');


const f1 = (value)=>{
  if(!value){
    return 'Error in value ' + value;
  }
}

const f2 = ()=>{
    const value = "", value2 =2;
    const v = f1(value);
  console.log(v)
     f1(value2);

    console.log('after f1');

}

const f3 = ()=>{
  f2();
}

f3();