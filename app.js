// getting elements

let name1 = document.getElementById("name");

let fName = document.getElementById("f-name");

let rollNum = document.getElementById("roll-num");

let courses = document.querySelector("select");

let result = document.querySelector("h1");

let weedDays = document.getElementById("week-days");

let weedEndDays = document.getElementById("weekend-days");

let errorMsg = document.querySelectorAll("h2")[0];

function submit() {
  //getting value of inputs
  let name1Value = name1.value;

  let fNameValue = fName.value;

  let rollNumValue = rollNum.value;

  //getting value of select item
  let coursesValue = courses.options[courses.selectedIndex].value;

  let daysResult;

  // getting value of radio
  if (weedDays.checked == true) {
    daysResult = weedDays.value;
  } else if (weedEndDays.checked == true) {
    daysResult = weedEndDays.value;
  }

  // let student data in object
  var studentDataObj = {
    Name: name1Value,
    FatherName: fNameValue,
    RollNumber: rollNumValue,
    selectedCourse: coursesValue,
    DaysAttempt: daysResult,
  };

  // validation for form fill and if form all fields are filled print data on screen

  if (
    studentDataObj.Name &&
    studentDataObj.FatherName &&
    studentDataObj.RollNumber &&
    studentDataObj.selectedCourse &&
    studentDataObj.DaysAttempt) {
    // result.innerHTML += `${name1Value} ${fNameValue} ${rollNumValue} ${coursesValue} ${daysResult}`;
    saveprintlocalstorage(studentDataObj);
    printWithDOMNodes(studentDataObj)
    printData(studentDataObj);

  } else {
    errorMsg.innerHTML = "All fields are required";
    errorMsg.style.color = "red";

    setTimeout(function () {
      errorMsg.innerHTML = "";
    }, 3000);
  }
}

//print data by backtriks making elements
var stdntdiv = document.querySelectorAll(".div-container")[0];
function printData(studentDataObj, elementIndex) {
  var data = ` <div id ="data" ;>   
<h2>${studentDataObj.Name}</h2>
<h2>${studentDataObj.FatherName}</h2>
<h2>${studentDataObj.RollNumber}</h2>
<h3>${studentDataObj.selectedCourse}</h3>
<h3>${studentDataObj.DaysAttempt}</h3>
      <button onclick ="removeData(this, ${elementIndex})" id = "delete"> DELETE </button>
</div> `;
  stdntdiv.innerHTML += data;
}

var allStudentData = [];
function getlocalstorage() {
  var stdList = localStorage.getItem("stdList");
  if (stdList) {
    allStudentData = JSON.parse(stdList);
  }
 
  for (var i = 0; i < allStudentData.length; i++) {
    printData(allStudentData[i], i);
  }
}
getlocalstorage();

function saveprintlocalstorage(studentDataObj) {
  allStudentData.push(studentDataObj);
  localStorage.setItem("stdList", JSON.stringify(allStudentData));
}

//creating function to create alements to print data by the help of dom

function createElementsNodes(elementsName, textcontent) {
  var elements = document.createElement(elementsName);
  var text = document.createTextNode(textcontent);
  elements.appendChild(text);

  return elements;
}



// creating elements and elementsNodes by using createElementsNodes function and append them

var divDom = document.getElementById("the-dom")

function printWithDOMNodes(studentDataObj) {
  var div = document.createElement("div");
  var h2stName = createElementsNodes("h2", studentDataObj.Name);
  var h2FName = createElementsNodes("h2", studentDataObj.FatherName);
  var h2RollNumber = createElementsNodes("h2", studentDataObj.RollNumber);
  var h3Courses = createElementsNodes("h3", studentDataObj.selectedCourse);
  var h3Days = createElementsNodes("h2", studentDataObj.DaysAttempt);

  div.appendChild(h2stName);
  div.appendChild(h2FName);
  div.appendChild(h2RollNumber);
  div.appendChild(h3Courses);
  div.appendChild(h3Days);
  div.setAttribute('style', "border: 1px solid black; margin: 15px; padding:15px; background-color: pink;")

  // divDom.appendChild(div);

  return divDom;
  
};





// remove one by one by using delete button on click on dom

// function removeData(d){


//     d.parentNode.remove()

// };


function removeData(deltBtn, elementIndex){

console.log(elementIndex, allStudentData);

stdntdiv.removeChild(deltBtn.parentNode);

var local = localStorage.getItem(`stdList`);
console.log(local);

var splc = allStudentData.splice( elementIndex, 1);



console.log(allStudentData)
localStorage.setItem("stdList", JSON.stringify(allStudentData));
stdntdiv.innerHTML = "";

allStudentData = [];

getlocalstorage()

console.log(local);

};




