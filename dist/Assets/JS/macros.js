//select elements to manipulate
var calculateBtn = document.querySelector("#calculate");
var sexRadioBtns = document.querySelectorAll(".gender");
var isClicked = false;
var isClicked2 = false;


if(calculateBtn != undefined){
	//calculate button click listener
	calculateBtn.addEventListener("click", function(){

		processValidInput();

	});


	//radio button click listeners
	for(var i = 0; i < sexRadioBtns.length; i++){
		sexRadioBtns[i].addEventListener("click", function(){
			getRadioVal();
		});
	}
}


//make navbar responsive
// window.addEventListener("scroll", function(){
// 	console.log(scrollY);
// 	var navbar = document.querySelector("nav");
// 	var foot = document.querySelector("footer");

// 	if(window.scrollY > 0){
// 		navbar.style.backgroundColor = "black";
// 		foot.style.backgroundColor = "black";
// 	} else if(window.scrollY === 0 && window.innerWidth > 878) {
// 		navbar.style.backgroundColor = "rgba(0,0,0,0.9)";
// 		foot.style.backgroundColor = "rgba(0,0,0,0.9)";
// 	}
// });

window.addEventListener("load", function(){
	var dropdownBars = document.querySelector("#dropdownBars");
	// var navbar = document.querySelector("nav");
	// var foot = document.querySelector("footer");

	if (window.innerWidth < 878){
		dropdownBars.innerHTML = "<i onclick=\"displayDropNav();\" class=\"fas fa-bars\"></i>";
		// navbar.style.backgroundColor = "black";
		// foot.style.backgroundColor = "black";
	} else {
		dropdownBars.innerHTML = "";
		// navbar.style.backgroundColor = "rgba(0,0,0,0.9)";
		// foot.style.backgroundColor = "rgba(0,0,0,0.9)";
	}

});

window.addEventListener("resize", function(){
	var dropdownBars = document.querySelector("#dropdownBars");
	var navbar = document.querySelector("nav");
	var foot = document.querySelector("footer");

	if (window.innerWidth < 878){
		dropdownBars.innerHTML = "<i onclick=\"displayDropNav();\" class=\"fas fa-bars\"></i>";
		// navbar.style.backgroundColor = "black";
		// foot.style.backgroundColor = "black";
	} else {
		dropdownBars.innerHTML = "";
		// navbar.style.backgroundColor = "rgba(0,0,0,0.9)";
		// foot.style.backgroundColor = "rgba(0,0,0,0.9)";
	}
});



//	<------------------FUNCTION DECLARATIONS---------------------->



//Declare function to process macros
function processMacros(){
	//capture calculated bmr
	var bmr = calcBMR();
	console.log(bmr);

	//capture calculated total of calories burnt per day
	var totCalBurn = calcTotCalBurn(bmr);
	console.log(totCalBurn);

	//capture calculated total of calories needed per day 
	var calInfo = calcTotCal(totCalBurn);
	//initialise total calories needed variable and range of total calories needed variable
	var totCal;
	var totCalRange;

	//if the calcTotCal function returns an array set the value of totCal to the first element in the array
	if(Array.isArray(calInfo) == true){
		totCal = calInfo[0];
		totCalRange = calInfo[1];
	//else set the value of totCal to calInfo
	} else{
	totCal = calInfo
	}


	console.log(totCalRange);
	console.log(totCal);

	//capture calculated macronutrient values
	var macros = calcMacros(totCal);

		var protein = macros[0];
		var carbs = macros[1];
		var fats = macros[2];

		var proteinGrams = Number((protein / 4).toFixed(0));
		var carbGrams = Number((carbs / 4).toFixed(0));
		var fatGrams = Number((fats / 9).toFixed(0));

	console.log(protein, carbs, fats);

	//Display results
	var display = document.querySelector("#formContainer");

	display.innerHTML = "<div id=\"displayArea\">" + "<p>BMR:<br>" + bmr + "</p>" + "<p>TOTAL CALORIES BURNT PER DAY:<br>" + totCalBurn + "</p>" + "<p>YOU SHOULD EAT:<br>+- " + totCal + " calories per day</p>" + "<p>TOTAL PROTEIN:<br>+- " + proteinGrams + " grams</p>" + "<p>TOTAL CARBS:<br>+- " + carbGrams + " grams</p>" + "<p>TOTAL FATS:<br>+- " + fatGrams + " grams</p>" + "<button id=\"reset2\" type=\"button\">reset</button>" + "</div>";

	createReloadListener();
}


	
//Declare function to calculate macronutrients
function calcMacros(totCal) {
	//capture fitness goal value
	var fitGoal = document.querySelector("#fitGoal").value;
	//initialise macronutrient variables
	var protein;
	var carbs;
	var fats;
	//initialise macronutrients array: macros[protein, carbs, fats]
	var macros = [];
	//calculate macros based on value of fitGoal
	if(fitGoal === "mg"){
		protein = 0.3 * totCal;
		carbs = 0.5 * totCal;
		fats = 0.2 * totCal;
	} else if(fitGoal === "fl"){
		protein = 0.45 * totCal;
		carbs = 0.2 * totCal;
		fats = 0.35 * totCal;
	} else {
		protein = 0.3 * totCal;
		carbs = 0.4 * totCal;
		fats = 0.3 * totCal;
	}

	//round off macronutrient values
	protein = Number(protein.toFixed(0));
	carbs = Number(carbs.toFixed(0));
	fats = Number(fats.toFixed(0));

	//push macronutrient values into macros array
	macros.push(protein);
	macros.push(carbs);
	macros.push(fats);

	return macros;
};




//Declare function to calculate total calories needed per day
function calcTotCal(totCalBurn) {
	//capture fitness goal value and initialise total calories variable
	var fitGoal = document.querySelector("#fitGoal").value;
	var totCalMin;
	var totCalMax;
	var totCal;
	//initialise calorie info array
	var calInfo = [];
	//calculate total calories needed and return that value
	if(fitGoal === "mg"){
		totCalMin = totCalBurn + 250;
		totCalMax = totCalBurn + 500;
		totCal = totCalBurn + 400;
	} else if(fitGoal === "fl"){
		totCalMin = totCalBurn - 500;
		totCalMax = totCalBurn - 250;
		totCal = totCalBurn - 350;
	} else{
		totCal = totCalBurn;
	}

	//check if array is needed or not
	if(totCalMax > 0){
		var calRange = totCalMin + " to " + totCalMax;

		calInfo.push(totCal);
		calInfo.push(calRange);

		return calInfo;
	} else{
		return totCal;
	}
	

};



//Declare function to calculate total calories burned per day
function calcTotCalBurn(bmr) {
	//capture activity level value 
	var actLevel = Number(document.querySelector("#actLevel").value);
	//calculate total calories burnt and return that value
	var totCalBurn = actLevel * bmr;

	totCalBurn = Number(totCalBurn.toFixed(0));
	return totCalBurn;
};



//Declare function to calculate BMR
function calcBMR() {
	//capture values and initialise bmr variable
	var gender = getRadioVal();
	var age = document.querySelector("#ageInput").value;
	var height = document.querySelector("#heightInput").value;
	var weight = document.querySelector("#weightInput").value;
	var bmr;
	// if male use equation for male BMR else use female equation
	if(gender === "m"){
		bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
	} else if(gender === "f"){
		bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
	}

	bmr = Number(bmr.toFixed(0));
	return bmr;	
};



//Declare function to get checked radio value	
function getRadioVal() {
    // get list of radio buttons
    var radios = document.querySelectorAll(".gender");
    // loop through list of radio buttons
    for (var i=0, len=radios.length; i<len; i++) {
        
        if (radios[i].checked) {
            val = radios[i].value;

            document.querySelector("#male").setCustomValidity('');

           	return val; 
        } 
    };

    document.querySelector("#male").setCustomValidity('Please check relevant box');
    
    return "invalid";

};



//declare function to check validity of inputs
function validate(inputID){
	var input = document.getElementById(inputID);
	var validityState;

 	if(input.value != "" && input.value != "0"){
		input.setCustomValidity('');

		validityState ="valid";
	} else {
		input.setCustomValidity('Please enter a value');
   		// document.querySelector("#ageInput").reportValidity();

   		validityState = "invalid";
	}

	return validityState;
 	
};



//Declare function to check if all input is valid
function processValidInput(){
	//check validity of age input
	var ageValidity = validate("ageInput");
	//check validity of gender input
	getRadioVal();
	var genderValidity = getRadioVal();
	//check validity of height input
	var heightValidity = validate("heightInput");
	//check validity of weight input
	var weightValidity = validate("weightInput");
	//check validity of fitGoal input
	var fitGoalValidity = validate("fitGoal");
	//check validity of actLevel input
	var actLevelValidity = validate("actLevel");

	
	if(ageValidity === "invalid" || genderValidity === "invalid" || heightValidity === "invalid" || weightValidity === "invalid" || fitGoalValidity === "invalid" || actLevelValidity === "invalid"){
		document.querySelector("#actLevel").reportValidity();
		document.querySelector("#fitGoal").reportValidity();
		document.querySelector("#weightInput").reportValidity();
		document.querySelector("#heightInput").reportValidity();
		document.querySelector("#male").reportValidity();
		document.querySelector("#ageInput").reportValidity();
	} else{
		processMacros();
	}
};



//Declare function to reload page 
function createReloadListener(){
	//select reset2 button, add click listener and write code to reload page when event is triggered 
	var reset2 = document.querySelector("#reset2");

	reset2.addEventListener("click", function(){
		document.location.reload();
	});
};



//Display dropdown navigation
function displayDropNav(){
	var dropNav = document.querySelector("#dropNav");

	if(!isClicked){
		dropNav.innerHTML = "<div class=\"dropNavLinkDiv\"><a class=\"dropNavLink\" href=\"#\"><i class=\"fas fa-home\"></i>Home</a></div><div class=\"dropdownDropNav dropNavLinkDiv\" onclick=\"displayDropNavCalcOpt();\"><a href=\"#\" class=\"dropBtnDropNav\">Calculate <i id=\"dropIcon2\" class=\"fas fa-chevron-down\"></i></a><div class=\"dropdown-contentDropNav\"></div></div><div class=\"dropNavLinkDiv\"><a class=\"dropNavLink\" href=\"guide.html\">Guide</a></div><div class=\"dropNavLinkDiv\"><a class=\"dropNavLink\" href=\"contact.html\">Contact<i class=\"fas fa-phone\"></i></a></div>";
		isClicked = true;
	} else {
		dropNav.innerHTML = "";
		isClicked2 = false;
		isClicked = false;
	}

};


//display dropdown navigation, calculate dropdown options
function displayDropNavCalcOpt(){
	var dropNavDropdown = document.querySelector(".dropdown-contentDropNav");
	var dropIcon2 = document.querySelector("#dropIcon2");

	if(!isClicked2){
		dropIcon2.classList.add("fa-flip-vertical");
		dropNavDropdown.innerHTML = "<a class=\"dropOptDropNav\" href=\"#\">Macros</a><a class=\"dropOptDropNav\" href=\"#\">Fat %</a><a class=\"dropOptDropNav\" href=\"#\">1 Rep Max</a>";
		
		isClicked2 = true;
	} else {
		dropIcon2.classList.remove("fa-flip-vertical");
		dropNavDropdown.innerHTML = "";

		isClicked2 = false;
	}

};