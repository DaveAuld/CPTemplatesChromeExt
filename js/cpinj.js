/// <reference path="jquery/jquery-1.6.1.min.js"/>

// CodeProject RepWatcher Chrome Extension (Script Injection)
// (c)2011 Dave Auld
// Version: 1.0
// Date: 12th June 2011

//Local variables used to hold a couple of Strings to be used
var memberName = "";
var memberProfileURL="";


//Check if the user is logged in, if so there will be the memberprofile link

if (memberLoggedIn()) {
    //The user is logged in, so we can start to grab and inject content to the page

    //First Drop Div container into the body to hold the temporary content
    //Create thbe DOM Element
    createHoldingContainer();

    //Create the container to hold the Rep Details
    createOuputContainer();

    //Write something to the DOM using JQuery
    $("#CPRepWatchChromeExtSI").html("Hello " + memberName + ", retrieving your rep points.........");

    getRepTable();
}

//Check the member Logged in, grab the variables required later
function memberLoggedIn() {
    //Grab the member profile name
    memberName = $("#ctl00_MemberMenu_MyProfile").text();

    if (!(memberLoggedIn === "")) {
        //grab the member profile script
        memberProfileURL = $("#ctl00_MemberMenu_MyProfile").attr("href");
        return true;
    }
    else { return false; }
}

function getRepTable() {
    //First we need to get the rep table from the member profile and load it into the holding container

    //Grab the div with the necessary data to then disect from an external page
    $('#CPRepWatchChromeExtSIHolding').load(memberProfileURL + ' #About');

    //Now we need to move the class from the parent table to the rep table to keep everything in order
    //$('#CPRepWatchChromeExtSIHolding').addClass('small_text member-profile');

    $('.member-rep-list').clone().appendTo('#CPRepWatchChromeExtSI');
    //Next we need to strip out the table that contains the rep points



    //$('#CPRepWatchChromeExtSIHolding.member-rep-list').clone().appendTo('#CPRepWatchChromeExtSI');
    //$('#CPRepWatchChromeExtSIHolding.table[:last]').appendTo('#CPRepWatchChromeExtSI');
}

//This will be used to host the displayed additional content
function createOuputContainer() {
    
    //Create thbe DOM Element
    var CPRepWatchChromeExtSI = document.createElement("div");

    CPRepWatchChromeExtSI.setAttribute("id", "CPRepWatchChromeExtSI");
    CPRepWatchChromeExtSI.setAttribute("class", "container nav-memberbar member-stats");
    
    //Add it to the DOM
    document.body.insertBefore(CPRepWatchChromeExtSI, document.body.firstChild);
}

function createHoldingContainer() {

    //Create thbe DOM Element
    var CPRepWatchChromeExtSIHolding = document.createElement("div");

    CPRepWatchChromeExtSIHolding.setAttribute("id", "CPRepWatchChromeExtSIHolding");
    
    // Un-comment this before release
    //CPRepWatchChromeExtSIHolding.setAttribute("style", "visibility: hidden;");

    //Add it to the DOM
    document.body.appendChild(CPRepWatchChromeExtSIHolding);

}
