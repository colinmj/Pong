import { SVG_NS } from '../settings.js'

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  //Creates the board in the dom
  render(svg) {
    
    let board = document.createElementNS(SVG_NS, 'rect');
    board.setAttributeNS(null, 'width', this.width);
    board.setAttributeNS(null, 'height', this.height);
    board.setAttributeNS(null, 'fill', '#353535');
    svg.appendChild(board);
    
    //Creates the game line
    let line = document.createElementNS(SVG_NS, 'line');
    line.setAttributeNS(null, 'x1', this.width/2);
    line.setAttributeNS(null, 'y1', 0);
    line.setAttributeNS(null, 'x2', this.width/2);
    line.setAttributeNS(null, 'y2', this.height);
    line.setAttributeNS(null, 'stroke', '#ffffff');
    line.setAttributeNS(null, 'stroke-dasharray', '10, 10');
    line.setAttributeNS(null, 'stroke-width', '5');
    svg.appendChild(line);
  }
}