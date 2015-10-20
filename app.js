var employeeArray = [];
var monthlySalaryTotal = 0;

$(document).ready(function(){

	$("#employeeinfo").submit(function(event){
		event.preventDefault();

		//Object that contains all information of an employee
		var employeeInfoObj = {};

		//Store input information in employeeInfoObj
		$.each($("#employeeinfo").serializeArray(), function(i, field){
			employeeInfoObj[field.name] = field.value;
		});

		//Clears out form after clicking submit button
		$("#employeeinfo").find("input[type=text]").val("");

		//Store all employee information in employeeArray
		employeeArray.push(employeeInfoObj);

		appendDom(employeeInfoObj);
		calculateMonthlySalaryTotal(employeeArray);
	});

	deleteEmployee();

});

function appendDom(employee){
	$("#container").append("<div class='employee col-md-5 col-md-offset-1 well' data-identifyemployeedelete = '" + employee.employeenumber + "' ></div>");
	var $el = $("#container").children().last();

	$el.append("<p>Name: " + employee.employeename + "</p>");
	$el.append("<p class='employeeId'>ID #: " + employee.employeenumber + "</p>");
	$el.append("<p>Position: " + employee.jobtitle + "</p>");
	$el.append("<p>Salary: $" + employee.salary + "</p>");
	$el.append("<button class='deleteemployee btn btn-danger'>Delete Employee</button>");
}

function calculateMonthlySalaryTotal(array){
	monthlySalaryTotal = 0;

	for(var i = 0; i < array.length; i++){
		monthlySalaryTotal += ((array[i].salary)/12);	
	}
	
	//Update monthly salary total cost whenever an employee is submitted
	$(".displayvalue").replaceWith("<span class='displayvalue'>" + Math.abs(monthlySalaryTotal).toFixed(2) + "</span>");

	return monthlySalaryTotal;
}

//Hard and Pro Modes!!!
//Remove employee from DOM by clicking "Delete Employee" button
//Calculate and update the total monthly salary cost when an employee is deleted

//code below is for targeting the employee clicked in the employeeArray and 
//deleting that employee information from the array.
function deleteEmployee(){
	$("#container").on("click", ".deleteemployee", function(){
		
		var storeEmployeeIdDelete = $(this).parent().data("identifyemployeedelete");
		
		for(var i = 0; i < employeeArray.length; i++){
			if(employeeArray[i].employeenumber == storeEmployeeIdDelete){
				employeeArray.splice(i);
			}
		}

		$(this).parent().remove();
		calculateMonthlySalaryTotal(employeeArray);

	});
}