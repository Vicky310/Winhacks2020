import axios from 'axios';

// center of screen lon and lat
var clon = 0;
var clat = 0;

// cluster min density
var density = 1;
// cluster min community size
var minCommSize = 20;

// quad tree
var qtree;

// image of map
var mapImg;
// zoom level of map
var zoom = 1;

// 
var commIcon;

var dataList = [];
var communities = [];

var points = [];

function preload(){
  mapImg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0," + zoom + ",0,0/1024x512?access_token=pk.eyJ1IjoidW5rbm93bjB4MDAiLCJhIjoiY2s4YWxhNGRtMGlhNjNlcGJtc2pwdmlyNyJ9.vcNCcMF3sIfv7lbKYCznrw", "unknown");
  commIcon = loadImage("commIcon.png");

  axios.get("https://winhacks2020-88149.firebaseio.com/Users.json")
  .then(res => {
      //console.log("users", Object.keys(res.data));  
            
      for (let key in res.data) {
        dataList.push(
            [res.data[key].latitude, res.data[key].longitude, key]
        );
      }
      //console.log(dataList);
  })
  .catch(err => {
      console.log(err);
  })
  
}

function setup() {
  
  createCanvas(1024, 512);
  
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapImg, 0, 0);
  
  randomComm = new Community();
  randomComm.setID(0);
  
  let boundary = new Boundary(width/2, height/2, width/2, height/2);
  qtree = new QuadTree(boundary, minCommSize);
  
  // calc x and y respecitve to center lon/lat
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  // parse the earthquake data and generate qtree and users array
  dataList.forEach(arr => {
    lat = arr[0];
    lon = arr[1];

    let x = mercX(lon) - cx + width/2;
    let y = mercY(lat) - cy + height/2;
    let point = new Point(x, y);
    let user = new User(arr[2], point, randomComm);
    users.push(user);
    qtree.insert(user);

  })

  // for(let i = 1; i < dataList.length; i++){
  //   let data = dataList[i].split(/,/);
  //   let lat = data[1];
  //   let lon = data[2];
    
  //   let x = mercX(lon) - cx + width/2;
  //   let y = mercY(lat) - cy + height/2;
  //   let point = new Point(x, y);
  //   let user = new User(localStorage.getItem('userId'), point, randomComm);
  //   users.push(user);
  //   qtree.insert(user);
  // }
  
  translate(-width/2, -height/2);
  
  // draw all users onto map
  noStroke();
  fill(0, 0, 255, 200);
  for(let i = 0; i < users.length; i++){
    ellipse(users[i].point.x, users[i].point.y, 4, 4);
  }
  
  // show the quad tree bars
  //qtree.show();
  
  // determine and create communities from clusters of users
  findComm(qtree);
  
  // draw in the users with their repsective community color
  noStroke();
  for(let i = 0; i < users.length; i++){
    //fill(users[i].community.color);
    ellipse(users[i].point.x, users[i].point.y, 2, 2);
  }
  
  // place down map push pin on communities
  commIcon.resize(20, 15); // resize icon to appropriate size
  for(let i = 0; i < communities.length; i++){
    image(commIcon, communities[i].point.x, communities[i].point.y);
  }
  
  users.forEach(usr =>{
    data = {
      community: usr.community.id
    }
    let url = "https://winhacks2020-88149.firebaseio.com/Users/" + usr.id + ".json"
    axios.patch(url, data).then((response) => {
      console.log(response);

    }).catch(err => {
        console.log(err)
    })
  })

  
  

}

function findComm(tree){
  // check to see if tree meets minCommSize, if stop searching this branch
  if(tree.size < minCommSize) { return; }
  
  var treeDensity = tree.getDensity();
  
  if(treeDensity >= density){
    var comm = new Community();
    comm.setID(communities.length);
   
    data = {
      dataBaseCreation: "created"
    }
    let url = "https://winhacks2020-88149.firebaseio.com/community/" + communities.length + ".json"
    axios.put(url, data).then((response) => {
      console.log(response);

    }).catch(err => {
        console.log(err)
    })

    communities.push(comm);
    partitionToComm(tree, comm);
    comm.setLocationPoint(tree.boundary.x, tree.boundary.y);
  }
  
  if(tree.divided){
    findComm(tree.northeast);
    findComm(tree.northwest);
    findComm(tree.southeast);
    findComm(tree.southwest);
  }
 
  
  
  
}

// recusively call until reaching bottom and set nodes which fufill requirement to community
function partitionToComm(tree, comm){
  if(tree.divided){
    partitionToComm(tree.northeast, comm);
    partitionToComm(tree.northwest, comm);
    partitionToComm(tree.southeast, comm);
    partitionToComm(tree.southwest, comm);
  }
  
  var treeDensity = tree.getDensity();
  if(treeDensity >= density/2){
    for(let i = 0; i < tree.users.length; i++){
      tree.users[i].community = comm;
    }
  }
  
}

// transform longitude to x coordinates
function mercX(lon){
  lon = radians(lon);
  return (256 / PI) * pow(2, zoom) * (lon + PI);
}

// transfrom latitude to y coordinates
function mercY(lat){
  lat = radians(lat);
  let a = (256/PI) * pow(2, zoom);
  let b = tan(PI/4 + lat/2);
  let c = PI - log(b);
  return a * c;
}
