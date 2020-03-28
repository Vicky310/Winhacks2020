function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(saveCoords);
    }
    else{
        //error    
    }
}
function saveCoords(position){
    db.collection('Users').doc().set({

        Location: {
            Lat:position.coords.latitude,
            Lng:position.coords.longitude
        }
    })

}
getLocation();