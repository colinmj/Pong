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
		this.gameEnd = new Audio('public/sounds/pong-04.wav')
		
		
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
		
		
		this.score1 = new Score(210, 20, 30, '#ffffff');
		this.score2 = new Score(278, 20, 30, '#ffffff');
		this.winner1 = new Score(110, 50, 30, 'red');
		this.winner2 = new Score(110, 50, 30, 'blue');
		
		
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
		
		//Add new balls
		if(this.one.score > 5){
			this.ball2.render(svg, this.one, this.two);
		}
		if (this.two.score > 7){
			this.ball3.render(svg, this.one, this.two);
		}
		
		//Shortens Paddles
		if(this.one.score > 5){
			this.one.height = this.paddleHeight - 10;
		}  
		if (this.one.score > 6){
			this.one.height = this.paddleHeight - 15;
		}  
		if (this.one.score > 7){
			this.one.height = this.paddleHeight - 20;
		}
		
		if(this.two.score > 5){
			this.two.height = this.paddleHeight - 10;
		}  
		if (this.two.score > 6){
			this.two.height = this.paddleHeight - 15;
		} 
		if (this.two.score > 7 ){
			this.two.height = this.paddleHeight - 20;
		}
		
		
		
		
		//Declare Winner
		if (this.one.score === 10){
			this.one.score = 0;
			this.two.score = 0;
			this.winner1.render(svg, 'Winner: Player 1');
			this.gameEnd.play();
			this.pause = true;
			this.one = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, this.height/2 - 28, KEYS.a, KEYS.z);
			this.two = new Paddle(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.boardGap - this.paddleWidth), this.height/2 - 28, KEYS.up, KEYS.down);
		} else if (this.two.score === 10){
			this.one.score = 0;
			this.two.score = 0;
			this.winner2.render(svg, 'Winner: Player 2');
			this.gameEnd.play();
			this.pause = true;
			this.one = new Paddle(this.height, this.paddleWidth, this.paddleHeight, this.boardGap, this.height/2 - 28, KEYS.a, KEYS.z);
			this.two = new Paddle(this.height, this.paddleWidth, this.paddleHeight, (this.width - this.boardGap - this.paddleWidth), this.height/2 - 28, KEYS.up, KEYS.down);
		}
	}
}





