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
  
  show(){
    stroke(255);
    noFill();
    rectMode(CENTER);
    
    rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
    
    if(this.divided){
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
  }
  
  // get the user to surface area density
  getDensity(){
    return this.size / (4 * this.boundary.w * this.boundary.h);
  }
 


}
