let url = "https://winhacks2020-88149.firebaseio.com/Users.json"
var users = axios.get(url).then(resource => {
  //  console.log(resource.data);
     
     const keys = Object.keys(resource.data)
     const values = Object.values(resource.data)
     console.log(keys)
     for(val of values){
         const subkeys = Object.keys(val)
         console.log(val.latitude)
         console.log(val.longitude)
     }
})

