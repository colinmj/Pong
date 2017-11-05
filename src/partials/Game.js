import { SVG_NS, KEYS } from '../settings.js'
import Board from './Board'
import Paddle from './Paddle'
import Ball from './Ball'
import Score from './Score'

export default class Game {
	
	//Sets parameters for the game instance
	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		
		
		this.gameElement = document.getElementById(element);
		
		//Creates an instance of Board
		this.board = new Board(this.width, this.height);
		
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		
		this.one = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, this.height/2 - 28, KEYS.a, KEYS.z);
		
		this.two = new Paddle(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.boardGap - this.paddleWidth), this.height/2 - 28, KEYS.up, KEYS.down);
		
		this.ball = new Ball(10, 'green', this.width, this.height);
		this.ball2 = new Ball(15, 'yellow', this.width, this.height);
		this.ball3 = new Ball(20, 'red', this.width, this.height);
		
		
		this.score1 = new Score(220, 20, 30);
		this.score2 = new Score(270, 20, 30);
		
		
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});
	}
	
	render() {
		if (this.pause){
			return;
		}
		
		this.gameElement.innerHTML = '';
		
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');
		
		this.gameElement.appendChild(svg);
		
		
		
		this.board.render(svg);
		this.one.render(svg);
		this.two.render(svg);
		this.ball.render(svg, this.one, this.two);
		this.score1.render(svg, this.one.score);
		this.score2.render(svg, this.two.score);
		if(this.one.score > 4 && this.one.score < 9){
			this.ball2.render(svg, this.one, this.two);
		}
		if (this.two.score > 3 && this.two.score < 7){
			this.ball3.render(svg, this.one, this.two);
		}
	}
	
}