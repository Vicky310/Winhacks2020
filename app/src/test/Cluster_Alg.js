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

// zoom level of map
var zoom = 1;


var dataList = [];
var communities = [];

var users = [];

var randomComm;

export default function setup() {

 
  
  // setup up default community for users who aren't in a community
  randomComm = new Community();
  randomComm.setID("default");
  
  let boundary = new Boundary(512, 256, 512, 256);
  qtree = new QuadTree(boundary, minCommSize);
  
  // calc x and y respecitve to center lon/lat
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  // parse the earthquake data and generate qtree and users array
  axios.get("https://winhacks2020-88149.firebaseio.com/Users.json")
  .then(res => {
      //console.log("users", Object.keys(res.data));  
            
      for (let key in res.data) {
        dataList.push(
            [res.data[key].latitude, res.data[key].longitude, key]
        );
      }
      //console.log(dataList);


      dataList.forEach(arr => {
        let lat = parseFloat(arr[0]);
        let lon = parseFloat(arr[1]);

        let x = mercX(lon) - cx + 512;
        let y = mercY(lat) - cy + 256;
        let point = new Point(x, y);
        let user = new User(arr[2], point, randomComm);
        users.push(user);
        qtree.insert(user);

      })
          // determine and create communities from clusters of users
    findComm(qtree);

    users.forEach(usr =>{
      console.log(usr.community.id)
      let data = {
        "community": usr.community.id
      }
      console.log("data:  " + data.community)

      let url = "https://winhacks2020-88149.firebaseio.com/Users/" + usr.id + ".json"
      axios.patch(url, data).then((response) => {
        console.log("The user was assigned a community");


      }).catch(err => {
          console.log(err)
      })
    });


  })
  .catch(err => {
      console.log(err);
  })

  
  
}


function findComm(tree){
  // check to see if tree meets minCommSize, if stop searching this branch
  if(tree.size < minCommSize) { return; }
  
  var treeDensity = tree.getDensity();
  
  if(treeDensity >= density){
    var comm = new Community();
    comm.setID(communities.length);
   
    let data = {
      "dataBaseCreation": "created"
    }
    let url = "https://winhacks2020-88149.firebaseio.com/community/" + communities.length + ".json";
    axios.put(url, data).then((response) => {
      console.log(response);

    }).catch(err => {
        console.log(err)
    });

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
  lon = Math.PI*lon / 180;
  return (256 / Math.PI) * Math.pow(2, zoom) * (lon + Math.PI);
}

// transfrom latitude to y coordinates
function mercY(lat){
  lat = Math.PI*lat / 180;
  let a = (256/Math.PI) * Math.pow(2, zoom);
  let b = Math.tan(Math.PI/4 + lat/2);
  let c = Math.PI - Math.log(b);
  return a * c;
}

class User{
  constructor(id, point, community){
    this.id = id;
    this.point = point;
    this.community = community;
  }
}

class QuadTree{
  // defines the boundary of the quad tree and the cap of users allowed in this segment of the tree
  constructor(boundary, cap){
    this.boundary = boundary;
    this.cap = cap;
    this.users = [];
    this.divided = false;
    this.size = 0;
  }
  
  
  insert(user){
    // if not within boundary, exit with false
    if(!this.boundary.contains(user.point)){ return false; }
    
    this.size++; // increase size of users in tree and child trees
    
    
    if(this.users.length < this.cap){ // if under cap then add to users
      this.users.push(user);
      return true;
    }else{ // otherwise insert into children
      if(!this.divided) { this.subdivide(); }
      
      if(this.northeast.insert(user) || this.northwest.insert(user) || 
         this.southeast.insert(user) || this.southwest.insert(user)){
         return true;
      }
      return false;
    }
  }
  
  // create children and start passing to children
  subdivide(){
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    
    let ne = new Boundary(x + w/2, y - h/2, w/2, h/2 );
    this.northeast = new QuadTree(ne, this.cap);
    let nw = new Boundary(x - w/2, y - h/2, w/2, h/2 );
    this.northwest = new QuadTree(nw, this.cap);
    let se = new Boundary(x + w/2, y + h/2, w/2, h/2 );
    this.southeast = new QuadTree(se, this.cap);
    let sw = new Boundary(x - w/2, y + h/2, w/2, h/2 );
    this.southwest = new QuadTree(sw, this.cap);
    
    this.divided = true;
  }
  
  // get the user to surface area density
  getDensity(){
    return this.size / (4 * this.boundary.w * this.boundary.h);
  }
 


}

class Point{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Community{
  contructor(){

  }
 
 setLocationPoint(x, y){
   this.point = new Point(x, y);
 }
 setID(id){
   this.id = id;
 }
}


// defines a rectangular boundary
class Boundary{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  // return if a point is within boundary
  contains(point){
    return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
  }
}


