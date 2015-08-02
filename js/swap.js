
  var field = document.querySelector("#student");
  var studentName = "";
  var studentArray = [];
  var suggestionsDiv = document.querySelector("#suggestions");
  var headerHold = suggestionsDiv.innerHTML;


	field.addEventListener("keypress", function(event) {
		if (event.keyCode == "$".charCodeAt(0) ||
		    event.keyCode == "?".charCodeAt(0) ||
		    event.keyCode == "'".charCodeAt(0) ||
		    event.keyCode == "&".charCodeAt(0) ||
		    event.keyCode == "<".charCodeAt(0) ||
		    event.keyCode == ">".charCodeAt(0) ||
		    event.keyCode == "/".charCodeAt(0) ||
		    event.keyCode == "\\".charCodeAt(0) ||
		    event.keyCode == "@".charCodeAt(0) ||
		    event.keyCode == "#".charCodeAt(0) ||
		    event.keyCode == "*".charCodeAt(0) ||
		    event.keyCode == "+".charCodeAt(0) ||
		    event.keyCode == "!".charCodeAt(0)
		    ) {
			      event.preventDefault();
		   }
	});


  var addStudentBtn = document.querySelector("#addStudent");
  
  addStudentBtn.addEventListener("click", function() {
  	// Alt way of removing trouble characters
	// var cleanedUp = field.value.split("$").join("");
  	if (field.value){
  		studentArray.push(field.value);
  	}
    field.value = "";
    studentName = "";

  });


  var add14ListRadio = document.querySelector('input[value="14List"]');
  
  add14ListRadio.addEventListener("click", function() {
  	var 14List = [AK, Harry, Mel, Abila, AJay, Asal, Craig, Ethan, Francisco, Jeff, Jesse, Jessica, Josh, Julian, Kelly, Mewpeter, Rachel];
  	studentArray = 14List;
    field.value = "";
    studentName = "";
    console.log("Added 1-4pm class list!");

  });








  var clearStudentBtn = document.querySelector("#clearStudent");
  
  clearStudentBtn.addEventListener("click", function() {
    studentArray = [];
    field.value = "";
    studentName = "";
    suggestionsDiv.innerHTML = "" + headerHold;
  });



  var printStudentBtn = document.querySelector("#printStudent");
  
  printStudentBtn.addEventListener("click", function() {
    console.log(studentArray);
  	var printingList = _.shuffle(studentArray);

  	// clear old html
    suggestionsDiv.innerHTML = "" + headerHold;

    // begin printing
		if (printingList[0]){
			var newList = document.createElement("UL");
			suggestionsDiv.appendChild(newList);

			if (printingList.length % 2){
				var thirdPerson = printingList.pop();
			}

			for (var i = 0; i < printingList.length-1; i = i + 2){
				var newListLI = document.createElement("LI");
				newList.appendChild(newListLI);
			
				var studentArrayTemp = document.createTextNode(printingList[i] + " :: " + printingList[i+1]);
				newListLI.appendChild(studentArrayTemp);
			}

			if (thirdPerson){
				var newListLI = document.createElement("LI");
				newList.appendChild(newListLI);
			
				var studentArrayTemp = document.createTextNode(thirdPerson + " can join any pair");
				newListLI.appendChild(studentArrayTemp);
			}
		}
  });




