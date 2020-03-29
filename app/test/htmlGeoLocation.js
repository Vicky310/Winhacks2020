


userId = localStorage.getItem('userId')
var usercommunity;
let url = "https://winhacks2020-88149.firebaseio.com/Users.json";
var users = axios.get(url).then(resource => {
  //  console.log(resource.data)
     const keys = Object.entries(resource.data)
     const values = Object.values(resource.data)
    
     for(key of keys){
        if(key[0] == userId){
            usercommunity = key[1].community;
            let url2 = "https://winhacks2020-88149.firebaseio.com/community/" + usercommunity + ".json";
            var community = axios.get(url2).then(resource => {
              //  console.log(resource.data)
                 const keys = Object.entries(resource.data)
                 const values = Object.values(resource.data)
                
                 for(key of keys){

                    //this is the line that logs out the posts in a community
                    console.log(key[1].postContent)
                }
                 
            });
        }
    }
     
});