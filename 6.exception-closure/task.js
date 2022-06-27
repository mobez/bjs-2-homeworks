const errTriangle = {
	getArea: function(){
		return "Ошибка! Треугольник не существует";
	},
	getPerimeter: function(){
		return "Ошибка! Треугольник не существует";
	}
}

class Triangle{
	constructor(a, b, c){
		if ((a+b<c)||(b+c<a)||(c+a<b)) throw new Error("Треугольник с такими сторонами не существует");
		this.a = a;
		this.b = b;
		this.c = c;
	}
	getPerimeter(){
		return this.a+this.b+this.c;
	}
	getArea(){
		const p = (this.a+this.b+this.c)/2;
		const s = Math.sqrt(p*(p-this.a)*(p-this.b)*(p-this.c));
		const result = Number(s.toFixed(3));
		console.log("S=", result);
		return result;
	}
}
function getTriangle(a, b, c){
	try{
		return new Triangle(a, b, c);
	}catch{
		return errTriangle;
	}
}


function parseCount(cnt){
	let result = parseInt(cnt);
	if (isNaN(result)) throw new Error("Невалидное значение");
	return result;
}
function validateCount(number){
	try{
		return parseCount(number);
	}catch(err){
		console.error(err.message);
		return err;
	}
}