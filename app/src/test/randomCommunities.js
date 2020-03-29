import axios from 'axios';

export default function getCommunities(){

    var array = [];
    axios.get("https://winhacks2020-88149.firebaseio.com/community.json")
  .then(res => {
      for (let key in res.data) {
        array.push(keY);
      }

    if(array.length <= 6) return array;

    var choosen = [];
    for(let i = 0; i < 6; i++){
        let num = Math.floor(Math.random() * array.length); // generate random num 0 - (array.length-1)
        choosen[i] = array[num];
        array.splice(num, 1); // remove index num
    }
    return choosen;
    });

    
    
}