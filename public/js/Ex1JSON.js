//  Javascript Exercise 1..  JSON and Pulldown Window
//
// Follow the comments and code the missing part.
//
"use strict";   // this gives us some more discipline in coding correct Javascript
//
// Funtion Init defines a string. The content of that string is actually a JSON.
// This example is just for our training.
// the object. So what we do here is to define a string ' .JSON.... ' and then parse it.
function Init ()
{
// This routine should be called after the HTML has been loaded
//
// Someting like
document.getElementsByTagName("BODY")[0].onload = Init;
// Define the JSON String
//
var jsonstring = ' { "Menschen" : [' +
  ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  },'+
    '{ "Vorname" : "Lota", "Nachname" : "Potter", "Gender": "female", "Rolle" : "Zauberer" }' +
  ' ] }';
//
//  Parse the jsonstring  to build an Object and put it as property to the global window Object.
//  This object has one attribute named Menschen which as value has an array of objects declaring
//  the people.
//  Would you agree ??
//  Putting it at the windwow object is not a good coding practice (but good enough for now).. we
//  need a global scope because differnt functions are using it..
//  It is your choice..
//
// we can simply add own properties the existing global objects like the window object or document object
// (again a bit dirty but fine for us now)
//
// we are using the JSON object method parse method to convert the string to a object structure
window.Menschen = JSON.parse(jsonstring);
//
// Define all click events
//
// Here are some examples.  Currently the function would be disabled since we still have
// severe JavaScript Coding errors
//
//
//document.getElementById('xxxxxx').addEventListener("click", dothisnow);
// Above just gives the name of the function to the event listener, the function dothisnow must be specifed
// somewhere else
//
//document.getElementById('yyyyy').addEventListener("click",function() {.. some javascript code ... });
// Above defines a inline function (anonymous function) as part of the addEventListener second parameter
// the code to be executed is within {} as part part of the second parameter
//
//
// The dothisnow function (as a basic example) makes sure that the Pullup element, which is initially invisible
// are made visible and is aligned right after the fixed header
// A routine like this can be called when e.g. the 'Dienste' button has been clicked
//
 }
 function hide(hide_id)
 {
     console.log("Hide");
     var pull2 = hide_id;
     pull2.style.display ="none";
 }
function dothisnow()
 {
  console.log("Pull up"); // just log that the event has triggered the right routine.
  //
  // access the pullup Window
  //
  var pull = document.getElementById('PullupOptions');// variable pull refers to the HTML element with the id="abc"
  // now you can simply modifiy the style attributes using this pull.style.123 notation
  // below are just examples
  // Let's assume this routine is the routine which is executed when the 'Dienste' link
  // has bee pressed and you want to make you Dienste popup visible.
  // The first question to answer is where to position this popup ?
  // Let's say we position it right below the navigation bar on the left side.
  // meaning we 'overlay' the beginning of the scrollable part
  // The code below (as an example) would do exactly that.
  //
  //
  //
  pull.style.top = document.getElementById('scrollpart').offsetTop + "px";
  pull.style.display = "block";
   }
  //
  // This function is a code skeleton of getting the above defined JSON and
  // to build an HTML string implementing a table with the JSON data
  //
function showMenschen()  {
    Init()
  //
  //  Show Menschen Object as dynamic table
  //
  console.log("showMenschen ");
  //
  // We could use JavaScript and the HTML object methods and properties to build a table or we just
  // construct a string with the HTML data
  //
  var tableheader = "<table> <tr>"; // this is the table header .. just take it
  tableheader += "<th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
  //
  // now we build each row
  //
  var tabletext = "";
  var alle = window.Menschen;
  // var alle is now the reference to the Object
  // alle.Menschen is the array of people
  for (var i = 0; i < alle.Menschen.length; i++) {
    var person = alle.Menschen[i];
    tabletext += "<tr><td>" + person.Vorname + "</td><td>" + person.Nachname + "</td><td>" + person.Gender +"</td><td>" + person.Rolle + "</td></tr>"
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = tableheader + tabletext + tableclosing;
  //
  // save the full text as innerHTML of the popup element named showwindowData
  document.getElementById('showwindowData').innerHTML = fulltext;
  // show the curently invisible showwindow item
  document.getElementById('showwindow').style.display = "block";
  // somewhere in the middle of the page
  document.getElementById('showwindow').style.top = "50%";
 }

 function wikipediaSuche(){
  document.getElementById('showwindow').style.display="block";
  document.body.style.overflow="hidden";
  var data,tabletext;
  var searchfor = document.getElementById('popupli2').value;
   var endpoint = `http://localhost:6001/proxy/?https://de.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpslimit=20&format=json&prop=extracts%7Cdescription&exintro=1&explaintext=1&excentence=3&gpssearch=${searchfor}`;
   var req = new XMLHttpRequest();
   req.open('GET', endpoint, true);
   req.onload = function() {
    // Parse the request into JSON

    data = JSON.parse(this.response);
    console.log(data);
    var main_link;
    tabletext = "";
    for (var key in data.response.query.pages) {
      if (data.response.query.pages.hasOwnProperty(key)) {
        main_link = "https://de.wikipedia.org/wiki/";
        var val = data.response.query.pages[key];

        if(val.extract=="" || val.extract==undefined) val.extract = "-";
        if(val.extract!=null && val.extract.length>100) val.extract = val.extract.substring(0,100)+"...";

        if(val.description=="undefined" || val.description==undefined) val.description = "-";
        if(val.description!=null && val.description.length>50) val.description = val.description.substring(0,50)+"...";

        var tit = val.title.split(" ");
        main_link+=tit[0];
        if(tit.length>0){
          for(var i=1;i<tit.length;i++){
          main_link += "_" +tit[i];
          }
        }

        //add information to table
        tabletext += "<tr><td>" + val.title + "</td>" + "<td>" + val.description + "</td>" + "<td>" + val.extract + "</td><td><a href=\" " + main_link + "\">" + "go to Wikipedia" + "</a></td></tr>";
        console.log(tabletext);
      }
    }
    var tableheader = "<table id=\"newWindowTable\"> <tr>";
    tableheader += "<th>Title</th><th>Description</th><th>Extract</th><th>Link</th></tr>";
    var tableclosing = "</table>"; //close the table
    var fulltext = tableheader + tabletext + tableclosing;
    document.getElementById('showwindowData').innerHTML=fulltext;
}
  req.send();


 }

//
//  Done !!!!    try it out.....
//
