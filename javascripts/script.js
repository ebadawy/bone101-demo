window.onload = function() {
	CanvasRenderingContext2D.prototype.beagleCard = function(startX, startY, width, height, carve1, carve2, w1, w2, d, out) {
		this.moveTo(startX, startY);
		this.lineTo(startX+width, startY);
		this.arcTo(startX+width+carve1,startY,startX+width+carve1,startY+carve1,carve1);
		this.lineTo(startX+width+carve1, startY+carve1+height);
		this.arcTo(startX+width+carve1,startY+carve1+height+carve1,startX+width,startY+carve1+height+carve1,carve1);
		this.lineTo(startX,startY+carve1+height+carve1);
		this.arcTo(startX-carve2,startY+carve1+height+carve1,startX-carve2,startY+carve1+height+carve1-carve2,carve2);
		this.lineTo(startX-carve2-out, startY+carve1+height+carve1-carve2);
		this.lineTo(startX-carve2-out,startY+carve1+height+carve1-carve2-w2);
		this.lineTo(startX-carve2,startY+carve1+height+carve1-carve2-w2);
		this.lineTo(startX-carve2, startY+carve1+height+carve1-carve2-w2-d);
		this.lineTo(startX-carve2-out, startY+carve1+height+carve1-carve2-w2-d);
		this.lineTo(startX-carve2-out, startY+carve1+height+carve1-carve2-w2-d-w1);
		this.lineTo(startX-carve2, startY+carve1+height+carve1-carve2-w2-d-w1);
		this.lineTo(startX-carve2, startY+carve1);
		this.arcTo(startX-carve2, startY, startX, startY, carve2);	
	}
	var canvasBeagleCard = document.getElementById('canves-beagleCard');	     
	var contextBeagleCard = canvasBeagleCard.getContext('2d');

	var startX = 75;
	var startY = 50;
	var width = 500;
	var height = 264.7;
	var carve1 = 73.53;//radius of the two carves on the right
	var carve2 = 36.76;//radius of the two carves on the left
	var out = 14.7;//ports out-distance
	var w1 = 94.11;//ethernet port width
	var w2 = 52.9;//power port width
	var d = 90;//distance between ethernet and power ports

	contextBeagleCard.beginPath();
	contextBeagleCard.beagleCard(startX, startY, width, height, carve1, carve2, w1, w2, d, out);
	contextBeagleCard.stroke();
	contextBeagleCard.shadowOffsetX = 5;
	contextBeagleCard.shadowOffsetY = 5;
	contextBeagleCard.shadowBlur = 10;
	contextBeagleCard.shadowColor = 'gray';
	contextBeagleCard.fillStyle = 'white';
	contextBeagleCard.fill();
}