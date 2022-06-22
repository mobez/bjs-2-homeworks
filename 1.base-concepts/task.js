"use strict";

function solveEquation(a, b, c) {
  let arr=[], descr;
  descr = (b**2)-4*a*c;
  console.log("discriminant:", descr);
  if (descr >= 0){
    if (descr){
      arr[0] = (-b + Math.sqrt(descr) )/(2*a);
      arr[1] = (-b - Math.sqrt(descr) )/(2*a);
    }else{
      arr[0] = -b/(2*a);
    }
  }
  console.log(arr);
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, date) {
  let totalAmount;
  let monthlyPayment;
  let percent_new = percent, contribution_new = contribution, amount_new = amount;
  if (typeof(percent) !== "number"){
    percent_new = +percent;
    if (isNaN(percent_new)||(!percent_new)) {
      const error = "Параметр \"Процентная ставка\" содержит неправильное значение \""+percent+"\"";
      console.log(error);
      return error;
    }
  }
  if (typeof(contribution) !== "number"){
    contribution_new = +contribution;
    if (isNaN(contribution_new)) {
      const error = "Параметр \"Начальный взнос\" содержит неправильное значение \""+contribution+"\"";
      console.log(error);
      return error;
    }
  }
  if (typeof(amount) !== "number"){
    amount_new = +amount;
    if (isNaN(amount_new)||(!amount_new)) {
      const error = "Параметр \"Общая стоимость\" содержит неправильное значение \""+amount+"\"";
      console.log(error);
      return error;
    }
  }
  if (!+date){
    const error = "Параметр \"Срок ипотеки\" содержит неправильное значение \""+date+"\"";
    console.log(error);
    return error;
  }
  const dt_now = new Date();
  const yearsToMonth = (date.getFullYear() - dt_now.getFullYear())*12;
  const months = date.getMonth() - dt_now.getMonth();
  const month = yearsToMonth + months;
  if (month <= 0) {
    const error = "Параметр \"Срок ипотеки\" содержит неправильное значение \""+date+"\"";
    console.log(error);
    return error;
  }
  const S = amount_new - contribution_new;
  const P = (percent_new/100)/12;
  monthlyPayment = S * (P + (P / (((1 + P)**month) - 1)));
  console.log("Ежемесячный платеж:",(Math.round(monthlyPayment * 100) / 100));
  totalAmount = (Math.round(monthlyPayment * 100 * month) / 100);
  console.log("Общая сумма:",totalAmount);
  return totalAmount;
}

