class PrintEditionItem{
	constructor(name, releaseDate, pagesCount, state = 100, type = null){
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this._state = state;
		this.type = type;
	}
	fix(){
		this._state *= 1.5;
		if (this._state > 100) this._state = 100;
	}
	set state(vol){
		this._state = vol < 0 ? 0 : vol > 100 ? 100 : vol;
	}
	get state(){
		return this._state;
	}
}

class Magazine extends PrintEditionItem{
	constructor(name, releaseDate, pagesCount, state = 100, type = null){
		super(name, releaseDate, pagesCount, state, "magazine");
	}
}

class Book extends PrintEditionItem{
	constructor(author, name, releaseDate, pagesCount, state = 100, type = "book"){
		super(name, releaseDate, pagesCount, state, type);
		this.author = author;
	}
}
class NovelBook extends Book{
	constructor(author, name, releaseDate, pagesCount, state = 100, type = "novel"){
		super(author, name, releaseDate, pagesCount, state, type);
	}
}
class FantasticBook extends Book{
	constructor(author, name, releaseDate, pagesCount, state = 100, type = "fantastic"){
		super(author, name, releaseDate, pagesCount, state, type);
	}
}
class DetectiveBook extends Book{
	constructor(author, name, releaseDate, pagesCount, state = 100, type = "detective"){
		super(author, name, releaseDate, pagesCount, state, type);
	}
}

class Library{
	constructor(name = "", books = []){
		this.name = name;
		this.books = books;
	}
	addBook(book){
		if (book.state > 30) this.books.push(book);
	}
	findBookBy(type, value){
		const find = this.books.find(book => book[type] === value);
		if (find != undefined){
			return find;
		}
		return null;
	}
	giveBookByName(bookName){
		const indx = this.books.findIndex(book => book.name === bookName);
		if (indx >= 0){
			const book = {...this.books[indx]};
			this.books.splice(indx, 1);
			return book;
		}
		return null;
	}
}

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);

class Student{
	constructor(name, gender="", age=""){
		this.name = name;
	  this.gender = gender;
	  this.age = age;
	  console.log("New studens:",name, gender, age);
	}
	setSubject(subjectName){
		this.subject = subjectName;
  	console.log("Set subject:",subjectName);
	}
	addMark(mark, subject){
		if(this.marks === undefined){
	    this.marks = [];
	    console.log("Add new mark:",mark);
	  } else {
	    console.log("Add mark:",mark);
	  }
	  this.marks.push({mark, subject});
	}
	addMarks(...marks){
		if(this.marks === undefined) this.marks = [];
	  for (const mark of marks) {
	   this.marks.push({mark: mark.mark, subject: mark.subject});
	  }
	  console.log("Add marks:",marks);
	}
	getAverageBySubject(subject){
		const avgSubject = this.marks.filter((mark) => mark.subject === subject);
		const sum = avgSubject.reduce((acc, rate) => acc + rate.mark, 0);
 	return sum / avgSubject.length;
	}
	getAverage(){
		let avg = 0;
	  if (this.marks.length){
	    this.marks.forEach(mark => avg += mark.mark);
	    avg /= this.marks.length;
	  }
	  console.log("Get average:",avg);
	  return avg;
	}
	exclude(reason){
		delete this.subject;
	  delete this.marks;
	  this.excluded = reason;
	  console.log("Student exclude:",this);
	}
}

library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1919,
    168
  )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1919).name); //"Пикник на обочине"
console.log("Количество книг до выдачи: " + library.books.length);
const bookTest = library.giveBookByName("Пикник на обочине");
console.log("Количество книг после выдачи: " + library.books.length);
bookTest.state = 25;
console.log("Выданная книга испорчена:", bookTest.state);
bookTest.state = 100;
library.addBook(bookTest);
console.log("Выданная книга починена:", bookTest.state);

console.log("Количество книг после возврата: " + library.books.length); //Количество книг до выдачи: 4
library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3


