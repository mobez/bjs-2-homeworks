function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = args.join(","); // получаем правильный хэш
    let objectInCache = cache.find((item) => item.hash === hash); // ищем элемент, хэш которого равен нашему хэшу
    if (objectInCache) { // если элемент не найден
      console.log("Из кэша: " + objectInCache.result); // индекс нам известен, по индексу в массиве лежит объект, как получить нужное значение?
      return "Из кэша: " + objectInCache.result;
    }

    let result = func(...args); // в кэше результата нет - придётся считать
    cache.push({hash, result}) ; // добавляем элемент с правильной структурой
    if (cache.length > 5) {
      cache.shift(); // если слишком много элементов в кэше надо удалить самый старый (первый)
    }
    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }
  return wrapper;
}


function debounceDecoratorNew(func, ms) {
  let timerId = null;
  let lastTime = 0;

  return function (...args) {
    const now = Number(new Date());
    const delta = now - lastTime;
    if (timerId) console.log(`Проигнорировано так как времени от последнего вызова прошло: ${delta}ms`);
    clearTimeout(timerId);
    if (delta > ms){
      if (!lastTime){
        console.log("Сигнал отправлен так как первый");
      }
      lastTime = now;
      return func.apply(this, args);
    }else{
      lastTime = now;
      timerId = setTimeout(() => {
        func.apply(this, args);
        lastTime = Number(new Date());
        timerId = null;
      }, ms);
      return;
    }
  };
}

function debounceDecorator2(func) {
  function wrapper(...args) {
    wrapper.history.push(args);
    wrapper.count++;
    return func.call(this, ...args);
  }
  wrapper.history = [];
  wrapper.count = 0;
  return wrapper;

}

console.log("Первое задание");
const addThree = (a, b, c) => a + b + c;
const upgradedAddThree = cachingDecoratorNew(addThree);
upgradedAddThree(1, 2, 3); // вычисляем: 6
upgradedAddThree(1, 2, 3); // из кэша: 6
upgradedAddThree(2, 2, 3); // вычисляем: 7
upgradedAddThree(3, 2, 3); // вычисляем: 8
upgradedAddThree(4, 2, 3); // вычисляем: 9
upgradedAddThree(5, 2, 3); // вычисляем: 10
upgradedAddThree(6, 2, 3); // вычисляем: 11   (при этом кэш для 1, 2, 3 уничтожается)
upgradedAddThree(1, 2, 3); // вычисляем: 6  (снова вычисляем, кэша нет)
console.log("Второе задание");
const sendSignal = () => console.log("Сигнал отправлен");
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
setTimeout(upgradedSendSignal); // Сигнал отправлен
setTimeout(upgradedSendSignal, 300); // проигнорировано так как от последнего вызова прошло менее 2000мс (300 - 0 < 2000)
setTimeout(upgradedSendSignal, 900); // проигнорировано так как времени от последнего вызова прошло: 900-300=600 (600 < 2000)
setTimeout(upgradedSendSignal, 1200); // проигнорировано так как времени от последнего вызова прошло: 1200-900=300 (300 < 2000)
setTimeout(upgradedSendSignal, 2300); // проигнорировано так как времени от последнего вызова прошло: 2300-1200=1100 (1100 < 2000)
setTimeout(upgradedSendSignal, 4400); // Сигнал отправлен так как времени от последнего вызова прошло: 4400-2300=2100 (2100 > 2000)
setTimeout(upgradedSendSignal, 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с
console.log("Третье задание");
const sum = (a, b) => a + b;
const sumSpied = debounceDecorator2(sum);
sumSpied(100, 200);
sumSpied(1, 1);
sumSpied(300, 74751);
console.log("История: ",sumSpied.history);
console.log("Кол-во вызовов:", sumSpied.count);