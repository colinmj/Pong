import { SVG_NS } from '../settings.js'

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }

  reset(){
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

      this.vx = this.direction * (6 - Math.abs(this.vy));
    }


    wallCollision(one, two) {
      const hitLeft = this.x - this.radius <= 0;
      const hitRight = this.x + this.radius >= this.boardWidth;
      const hitTop = this.y - this.radius <= 0;
      const hitBottom = this.y + this.radius >= this.boardHeight;

      // if (hitLeft || hitRight) {
      //   this.vx = -this.vx;
      // } else if (hitTop || hitBottom) {
      //   this.vy = -this.vy;
      // }

      if(hitLeft) {
        this.direction = -1;
        this.goal(two);
        

      } else if(hitRight) {
        this.direction = 1;
        this.goal(one);
        

      } else if(hitTop || hitBottom) {
        this.vy = -this.vy;
      }
    }

    paddleCollision(one, two){
      if (this.vx > 0) {
       //Detect collision on right side (player 2)
       let paddle = two.coordinates(two.x, two.y, two.width, two.height);
       let {leftX, topY, bottomY} = paddle; //Destructure Array
       
       if ( 
         this.x + this.radius >= leftX
         && this.y >= topY
         && this.y <= bottomY
        ){
         this.vx = -this.vx;
       }

       } else {
        //Detect collision on left side(player1)
        if (this.vx < 0) {
          let paddle1 = one.coordinates(one.x, one.y, one.width, one.height);
          let {rightX, topY, bottomY} = paddle1;

          if (
            this.x - this.radius <= rightX
            && this.y >= topY
            && this.y <= bottomY
           ) {
          this.vx = -this.vx;
          }
         }
        }//closes else  
      }

      goal(player){
        player.score++;
        this.reset();
       }
    
    
  

  render(svg, one, two) {

    this.y += this.vy;
    this.x += this.vx;

    this.wallCollision(one, two);
    this.paddleCollision(one, two);
    
    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', 'green');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    svg.appendChild(ball);
    
  }
}