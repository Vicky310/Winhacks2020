class Community{
  
  constructor(){
    this.threads = [];
    this.users = [];
    this.color = color(random(255), random(255), random(255));
  }
  
  // find average point across all users within community
  deriveLocationPoint(){
    let x = 0;
    let y = 0;
    for(let i = 0; i < this.users.length; i++){
      x += this.users[i].x;
      y += this.users[i].y;
    }
    x /= this.users.length;
    y /= this.users.length;
    
    this.point = new Point(x, y);
  }

}
