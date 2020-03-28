

// center of map
var clon = 0; 
var clat = 0;


var density = 0.02;
 // the minimum density of clusters
var found_density = density/2; // minimum density for the expansion of clusters
var minCommSize = 40; // minimum cluster size

// quad tree used for finding clusters
var qtree;

var mapImg;
var zoom = 1; // zoom factor for map

var commIcon;

var dataList;
var communities = [];

var points = [];

function preload(){
  mapImg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0," + zoom + ",0,0/1024x512?access_token=pk.eyJ1IjoidW5rbm93bjB4MDAiLCJhIjoiY2s4YWxhNGRtMGlhNjNlcGJtc2pwdmlyNyJ9.vcNCcMF3sIfv7lbKYCznrw", "unknown");
  commIcon = loadImage("commIcon.png");
  dataList = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv");
}

function setup() {
  createCanvas(1024, 512);

  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapImg, 0, 0);
 
  
  // create quad tree which covers entire canvas
  let boundary = new Rectangle(width/2, height/2, width/2, height/2);
  qtree = new QuadTree(boundary, minCommSize);
  
  // calculate x and y respective to center lon/lat
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  console.log(dataList.length);
  //gather data and enter into quad tree
  for(let i = 0; i < dataList.length; i++){
    let data = dataList[i].split(/,/);
    let lat = data[1];
    let lon = data[2];
    
    let x = mercX(lon) - cx + width/2;
    let y = mercY(lat) - cy + height/2;
    let point = new Point(x, y);
    qtree.insert(point);
    points.push(point);
  }
  
  translate(-width/2, -height/2);
  
  noStroke();
  fill(0, 0, 255, 200);
  for(let i = 0; i < points.length; i++){
    ellipse(points[i].x, points[i].y, 4, 4);
  }
  
  findComm(qtree);
  
  commIcon.resize(20, 15);
  for(let i = 0; i < communities.length; i++){
    image(commIcon, communities[i].point.x, communities[i].point.y);
  }
  
  
}


function findComm(tree){
  if(tree.size < minCommSize){ return; }
  
  var SA = (4 * tree.boundary.w * tree.boundary.h);
  var treeDensity = tree.getDensity();//tree.size / SA;
  console.log(treeDensity);
  
  if(treeDensity >= density){  
    var comm = new Community();
    communities.push(comm);
    partitionToComm(tree, comm);
    comm.deriveLocationPoint();
  }
  
  if(tree.divided){
    findComm(tree.northeast);
    findComm(tree.northwest);
    findComm(tree.southeast);
    findComm(tree.southwest);
  }
  
  
 
}

function partitionToComm(tree, comm){
  if(tree.divided){
    partitionToComm(tree.northeast, comm);
    partitionToComm(tree.northwest, comm);
    partitionToComm(tree.southeast, comm);
    partitionToComm(tree.southwest, comm);
  }
  
  var SA = (4 * tree.boundary.w * tree.boundary.h);
  var treeDensity = tree.size / SA;
  if(treeDensity >= density){
    for(var i = 0; i < tree.points.length; i++){
      comm.users.push(tree.points[i]);
    }
  }
  
}

function mercX(lon){
  lon = radians(lon);
  return (256 / PI) * pow(2, zoom) * (lon + PI);
}

function mercY(lat){
  lat = radians(lat);
  let a = (256/PI) * pow(2, zoom);
  let b = tan(PI/4 + lat/2);
  let c = PI - log(b);
  return a * c;
}
