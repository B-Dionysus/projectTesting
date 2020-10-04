$(document).ready(init);



// Civic Information API key: AIzaSyAZ9wHHNEDq8VlWWCl5t8yubKH7Vz91TfA

function init(){
    
    
    getCurrentLocation();

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
        "url": "http://api.geonames.org/findNearestAddressJSON?lat="+lat+"&lng="+long+"&username=bdionysus",
        "method": "GET",
        "headers": {

        }
    }    
    $.ajax(settings).done(function (response) {
        displayAddress(response);
    });
}
var _rep;
function displayAddress(response){
    _rep=response;

    var main=$("<h3>").text("You are near "+_rep.address.streetNumber+" "+_rep.address.street+", "+_rep.address.placename+", "+_rep.address.adminCode1+"!");
    $("body").append(main);
}







