// export function response(input) {
//   //Insert your code here
//   const response = [];
//   for (var i = 1; i <= input; i++) {
//     if (i % 15 == 0) response.push("FizzBuzz");
//     else if (i % 3 == 0) response.push("Fizz");
//     else if (i % 5 == 0) response.push("Buzz");
//     else response.push(i);
//   }
//   return response;
// }

// response(5);

function find_total(my_list) {
  //Insert your code here
  let arr = [];

  for (let i = 0; i <= my_list.length; i++) {
    if (i % 2 == 0) {
      arr.push(my_list[i]);
    }
  }
  //   const newArr = arr.reverse();
  const result = arr.reduce((prev, curent) => prev - curent);

  console.log(result);
  return result;
}

// find_total([80, 30, 30]);
// find_total([1, 2, 3]);

function iterator(rangeStart, rangeEnd) {
  if (rangeStart == 0 && rangeEnd == 0) {
    return null;
  }

  var iterate = function* (start = 0, end = 5, step = 1) {
    let iterationCount = 0;

    for (let i = start; i < end; i += step) {
      iterationCount++;
      yield i;
    }

    return iterationCount;
  };

  var values = iterate(rangeStart, rangeEnd);
  var tmp = [];

  while (values.next().value != undefined) {
    tmp.push(values.next().value - 1);
  }

  return tmp.join(",");
}

console.log(iterator(0, 5));
// console.log(iterator(0, 10));
