import { SVG_NS } from '../settings.js'

export default class Paddle {
  
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    
    this.speed = 3;
    this.score = 0;
    
    document.addEventListener('keydown', event => {
      switch(event.key) {
        case up:
        this.pressUp = true;
        break;
        case down:
        this.pressDown = true;
        break;
      }
    });
    document.addEventListener('keyup', event => {
      switch(event.key) {
        case up:
        this.pressUp = false;
        break;
        case down:
        this.pressDown = false;
        break;
      }
    });
  }
  
  
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return {leftX, rightX, topY, bottomY};
  }
  
  
  //changes the position of the paddle on the y axis
  up(){
    this.y = Math.max(this.y - this.speed, 0);
  }
  
  down(){
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  }
  
  render(svg){
    
    let pad = document.createElementNS(SVG_NS, 'rect');
    pad.setAttributeNS(null, 'boardHeight', this.boardHeight);
    pad.setAttributeNS(null, 'width', this.width);
    pad.setAttributeNS(null, 'height', this.height);
    pad.setAttributeNS(null, 'x', this.x);
    pad.setAttributeNS(null, 'y', this.y);
    pad.setAttributeNS(null, 'fill', '#ffffff');
    
    
    if (this.pressUp){
      this.up();
    }
    
    if (this.pressDown){
      this.down();
    }
    svg.appendChild(pad);
  }
}



