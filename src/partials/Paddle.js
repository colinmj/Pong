import { SVG_NS } from '../settings.js'

export default class Paddle {

  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch(event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
   });
 }

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
  svg.appendChild(pad);
  }
}