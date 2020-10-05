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
        "url": "https://api.open.fec.gov/v1/candidates/?sort_null_only=false&sort_hide_null=false&is_active_candidate=true&election_year=2020&per_page=100&page=1&sort_nulls_last=true&candidate_status=C&api_key="+APIKey,
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
    console.log(_rep);
    var main=$("<div>").attr("id","main");
        $("body").append(main);
        
    for (candidate of response.results){
        main.append($("<div>").text(candidate.name));
        
    }
}


function displayAddress(response){
    _rep=response;

    var main=$("<h3>").text("You are near "+_rep.address.streetNumber+" "+_rep.address.street+", "+_rep.address.placename+", "+_rep.address.adminCode1+"!");
    $("body").append(main);
}







