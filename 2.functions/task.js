// Задание 1
function getArrayParams(arr) {
  let min, max, sum = 0, avg;
  min = arr[0];
  max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
    sum += arr[i];
  }
  avg = Number((sum / arr.length).toFixed(2));
  console.log("Задача 1:",min, max, sum, avg);
  return { min: min, max: max, avg: avg };
}

// Задание 2
function worker(arr) {
  let sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

function makeWork(arrOfArr, func) {
  let max, sum = 0;
  max = func(arrOfArr[0]);
  for (var i = 0; i < arrOfArr.length; i++) {
    sum = func(arrOfArr[i]);
    if (max < sum) max = sum;
  }
  console.log("Задача 2 и 3:", max);
  return max;
}

// Задание 3
function worker2(arr) {
  let min, max, delt;
  min = arr[0];
  max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (min > arr[i]) min = arr[i];
    if (max < arr[i]) max =arr[i];
  }
  delt = Math.abs(max - min);
  return delt;
}
