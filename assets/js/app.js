
//initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyCgaOdiiHcY3BrmdeV0gSJgXVYXdYHO1gs",
    authDomain: "train-scheduler-2efb5.firebaseapp.com",
    databaseURL: "https://train-scheduler-2efb5.firebaseio.com",
    projectId: "train-scheduler-2efb5",
    storageBucket: "train-scheduler-2efb5.appspot.com",
    messagingSenderId: "521538739149",
    appId: "1:521538739149:web:7225e4ede616a3e07d8284",
    measurementId: "G-DT07ZSG9D5"
};


firebase.initializeApp(firebaseConfig);


//variable to use firebase database
var database= firebase.database();

//set to empty string
var trainName="";
var destination="";
var firstTrainTime="";
var frequencyMin="";

//current time for display and later use 
var time= moment().format('LT')
$("#current-time").html(time);

console.log(time);
//event listener
$(".btn").on("click", function(event){
    event.preventDefault();

    //input values
    trainName=$("#train-name").val().trim();
    destination=$("#destination").val().trim();
    firstTrainTime=$("#first-train-time").val().trim();
    frequencyMin=$("#frequency").val().trim();
   
   

   //push data to firebase 
    database.ref().push({
        trainName,
        destination,
        firstTrainTime,
        frequencyMin,
        time,
    })

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
   
   
   
});

database.ref().on("child_added", function(childSnapshot){

time;

var train= childSnapshot.val().trainName;
var dest= childSnapshot.val().destination;
var trainTime= childSnapshot.val().firstTrainTime;
var frequency= childSnapshot.val().frequencyMin;

console.log("train name" + " "+ train);
console.log("train destination" + " "+ dest);
console.log("train time" + " "+ trainTime);
console.log("train frequency" + " "+ frequency);

//change time so it's like the train already came
var takeMeBack= moment(trainTime, "hh:mm").subtract(1,"years");


console.log ("tmb"+ " "+takeMeBack);

 //putting in minutes
var difference= moment().diff(moment(takeMeBack), "minutes")

console.log("difference" +" " +difference);

//divide by frequency
var remainder= difference% frequency;

console.log("remainder:"+ " "+ remainder);


var minAway= frequency-remainder;

console.log("min away"+ " "+minAway);

var nextArrival= moment().add(minAway, "minutes");

console.log("next arrival"+" "+ nextArrival);

var display= moment(nextArrival).format("hh:mm");
 console.log(display); 
console.log("*****************************************")
//add row
$("#row").append('<tr>'+ '<td>'+ train+ '</td>'+ '<td>'+ dest+ '</td>'+ '<td>'+ frequency+ '</td>'+ '<td>'+ display+ '</td>'+ '<td>'+ minAway + '</td>'+'</tr>');




})