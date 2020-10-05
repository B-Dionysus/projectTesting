var lat;
var long;

$(document).ready(init);



// Civic Information API key: AIzaSyAZ9wHHNEDq8VlWWCl5t8yubKH7Vz91TfA

function init(){
    
    
    // getCurrentLocation();
    getBallot();


}



function getCurrentLocation(){

    lat=localStorage.getItem("lat");
    long=localStorage.getItem("long");
    if(!lat || !long)
        window.navigator.geolocation.getCurrentPosition(processLocation);
    else getStreetAddress();
}

function processLocation(pos){

    lat=pos.coords.latitude;
    long=pos.coords.longitude;
    localStorage.setItem("lat",lat);
    localStorage.setItem("long",long);

    getStreetAddress();

}
function getStreetAddress(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://secure.geonames.org/findNearestAddressJSON?lat="+lat+"&lng="+long+"&username=bdionysus",
        "method": "GET",
        "headers": {

        }
    }    
    $.ajax(settings).done(function (response) {
        displayAddress(response);
    });
}



function getBallot(){
    var APIKey="y7BRgIT6VX4YDceQNfig6Lf7UnvdUh1NVLTxLcef";
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.open.fec.gov/v1/candidates/?sort=party_full&sort_null_only=false&sort_hide_null=false&is_active_candidate=true&election_year=2020&per_page=100&page=1&sort_nulls_last=true&state=IL&candidate_status=C&api_key="+APIKey,
        "method": "GET",
        "headers": {

        }
    }    
    $.ajax(settings).done(function (response) {
        displayBallot(response);
    });
}
var _rep;
function displayBallot(response){
    _rep=response;
    var house=$("<div>").addClass("senate candidate");
    var senate=$("<div>").addClass("house candidate");
    senate.append($("<h2>").text("Senate"));
    house.append($("<h2>").text("House"));

    var main=$("<div>").attr("id","main");
    main.addClass("container");
    main.append($("<h1>").text("OpenFEC Proof of Concept"));
    $("body").append(main);
        
    for (candidate of response.results){
        var name=titleCase(candidate.name);
        var party=titleCase(candidate.party_full);
        var election=titleCase(candidate.office_full);
        if(candidate.office_full.toUpperCase()==="HOUSE")
            house.append($("<div>").text(name+" is a member of the "+party+" running for "+election));
        else
            senate.append($("<div>").text(name+" is a member of the "+party+" running for "+election));        
    }
    main.append(senate, house);
}
function titleCase(str){
    allStr=str.toLowerCase().split(" ");
    final="";
    for(w of allStr){
        
        var l=w.charAt(0).toUpperCase();
        w=w.slice(1);
         w=l+w;
        final+=w+" ";
    }
    return final;
}


function displayAddress(response){
    _rep=response;

    var main=$("<h3>").text("You are near "+_rep.address.streetNumber+" "+_rep.address.street+", "+_rep.address.placename+", "+_rep.address.adminCode1+"!");
    $("body").append(main);
}







