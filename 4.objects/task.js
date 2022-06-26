function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  console.log("New studens:",name, gender, age);
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
  console.log("Set subject:",subjectName);
}
Student.prototype.addMark = function(mark){
  if(this.marks === undefined){
    this.marks = [];
    console.log("Add new mark:",mark);
  } else {
    console.log("Add mark:",mark);
  }
  this.marks.push(mark);
}
Student.prototype.addMarks = function(...marks){
  if(this.marks === undefined) this.marks = [];
  for (const mark of marks) {
   this.marks.push(mark);
  }
  console.log("Add marks:",marks);
}
Student.prototype.getAverage = function(){
  let avg = 0;
  if (this.marks.length){
    this.marks.forEach(mark => avg += mark);
    avg /= this.marks.length;
  }
  console.log("Get average:",avg);
  return avg;
}
Student.prototype.exclude = function(reason){
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
  console.log("Student exclude:",this);
}
// ваш код для остальных методов