class QuadTree{
  constructor(boundary, cap){
    this.boundary = boundary;
    this.cap = cap;
    this.points = [];
    this.divided = false;
    this.size = 0;
  }
  
  insert(point){
    
    if(!this.boundary.contains(point)) { 
      return false; 
    }
    
    this.size++;
    
    if(this.points.length < this.cap){
      this.points.push(point);
      return true;
    }else{
      if(!this.divided){
        this.subdivide();
      }
      
      if(this.northeast.insert(point) || this.northwest.insert(point) || 
         this.southeast.insert(point) || this.southwest.insert(point)){
         return true;
      }
      return false;
    }
  }
  
  subdivide(){
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    
    let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2 );
    this.northeast = new QuadTree(ne, this.cap);
    let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2 );
    this.northwest = new QuadTree(nw, this.cap);
    let se = new Rectangle(x + w/2, y + h/2, w/2, h/2 );
    this.southeast = new QuadTree(se, this.cap);
    let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2 );
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
  
  getDensity(){
    return this.size / (4 * this.boundary.w * this.boundary.h);
  }


}
