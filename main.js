var name
var role
var startDate
var monthlyRate


var config = {
  apiKey: "AIzaSyAueOzPrIK2N_xM55izJ6OK60JrFPX7YIs",
  authDomain: "my-awesome-project-34a06.firebaseapp.com",
  databaseURL: "https://my-awesome-project-34a06.firebaseio.com",
  projectId: "my-awesome-project-34a06",
  storageBucket: "my-awesome-project-34a06.appspot.com",
  messagingSenderId: "543373788237"

};
 

firebase.initializeApp(config);

var database = firebase.database();

$("#form-group").val("");
$("#add-employee").on("click", function(){
 event.preventDefault()
 name = $("#name-input").val().trim();
 role = $("#role-input").val().trim();
 startDate = $("#start-date-input").val().trim();
 monthlyRate = $("#monthly-rate-input").val().trim();

 database.ref().push({
   name: name,
   role: role,
   startDate: startDate,
   monthlyRate: monthlyRate,
   dataAdded: firebase.database.ServerValue.TIMESTAMP

 });
});


database.ref().on("value", function(snapshot) {

 var sv = snapshot.val();

 var svArr = Object.keys(sv);

 var lastIndex = svArr.length - 1;

 var lastKey = svArr[lastIndex];

 var lastObj = sv[lastKey];

 

});

database.ref().on("child_added", function(childSnapshot) {

 console.log(childSnapshot.val().name);
 console.log(childSnapshot.val().role);
 console.log(childSnapshot.val().startDate);
 console.log(childSnapshot.val().monthlyRate);


 var addEmployeeRow = $("#add-employee-row");

 var employeeData = "<tr>";
 employeeData += "<td>" + childSnapshot.val().name + "</td>";
 employeeData += "<td>" + childSnapshot.val().role + "</td>";
 employeeData += "<td>" + childSnapshot.val().startDate + "</td>";
 employeeData += "<td></td>";
 employeeData += "<td>" + childSnapshot.val().monthlyRate + "</td>";
 employeeData += "<td></td>";
 employeeData += "</tr>";

 addEmployeeRow.append(employeeData);

}, function(errorObject) {
   console.log("Errors handled: " + errorObject.code);
});

 database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

   $("#test").append(snapshot.val().name);
   $("#test").append(snapshot.val().role);
   $("#test").append(snapshot.val().startDate);
   $("#test").append(snapshot.val().monthlyRate);

 })