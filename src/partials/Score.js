import {SVG_NS, KEYS } from '../settings';


export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }



/* <text x="206" y="30" font-family="'Silkscreen Web', monotype" font-size="30" fill="white">0</text> */

render(svg, score) {
  let text = document.createElementNS(SVG_NS, 'text');
  text.setAttributeNS(null, 'x', this.x);
  text.setAttributeNS(null, 'y', this.y);
  text.setAttributeNS(null, 'font-family', 'Silkscreen Web');
  text.setAttributeNS(null, 'font-size', this.size);
  text.setAttributeNS(null, 'fill', '#ffffff');

  text.innerHTML = score;
  svg.appendChild(text);
  
 }
}