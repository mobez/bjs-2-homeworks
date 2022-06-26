function compareArrays(arr1, arr2) {
  let result;
  if (arr1.length === arr2.length)
    result = arr1.every((item, indx) => item === arr2[indx]);
  else
    result = false;
  console.log("Задание 1:", result);
  return result; // boolean
}

function advancedFilter(arr) {
  let resultArr;
  resultArr = arr.filter((item) => item > 0 && !(item % 3)).map((item) => item * 10);
  console.log("Задание 2:", resultArr);
  return resultArr; // array
}
