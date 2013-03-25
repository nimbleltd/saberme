 /* 
 * Code by Paul Campbell, based on
 * Craig Buckler, "Canvas curves example"
 * 
 * Re-written to allow for rotoscoping of sabers
 * 
 * 
 * 
 *
 *  
 */

(function() {

	var canvas, ctx, code, point, styleGreen, styleRed, drag = null, dPoint;

	// define initial points
	function Init(quadratic) {

		point = {
			//The Green LightSaber
			p1: { x:130, y:240 },
			p2: { x:150, y:260 },
			p3: { x:580, y:120 },
			p4: { x:570, y:100 },

			//The Red LightSaber
			p5: { x:530, y:240 },
			p6: { x:580, y:260 },
			p7: { x:150, y:120 },
			p8: { x:130, y:100 }

		};
		
		// if (quadratic) {
		// 	point.cp1 = { x: 250, y: 100 };
		// }
		// else {
		 	point.cp1 = { x: 600, y: 100 };
		 	point.cp2 = { x: 155, y: 125 };
		// 	point.cp3 = { x: 250, y: 200 };
		// 	point.cp4 = { x: 200, y: 175 };
		// }
		
		// default styles
		styleGreen = {
			curve:	{ width: 3, color: "#333" },
			cpline:	{ width: 1, color: "#C00" },
			point: { radius: 10, width: 2, color: "#333", fill: "rgba(200,200,200,0.1)", arc1: 0, arc2: 2 * Math.PI }
		}
		styleRed = {
			curve:	{ width: 3, color: "#2EDCFF" },
			cpline:	{ width: 1, color: "#CC0" },
			point: { radius: 10, width: 2, color: "#333", fill: "rgba(000,000,254,0.5)", arc1: 0, arc2: 2 * Math.PI }
		}
		
		// line style defaults
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		// event handlers
		canvas.onmousedown = DragStart;
		canvas.onmousemove = Dragging;
		canvas.onmouseup = canvas.onmouseout = DragEnd;
		
		DrawCanvas();
	}
	
	
	// draw canvas
	function DrawCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// control lines
		// ctx.lineWidth = style.cpline.width;
		// ctx.strokeStyle = style.cpline.color;
		// ctx.beginPath();
		// ctx.moveTo(point.p1.x, point.p1.y);
		// ctx.lineTo(point.cp1.x, point.cp1.y);
		// if (point.cp2) {
		// 	ctx.moveTo(point.p2.x, point.p2.y);
		// 	ctx.lineTo(point.cp2.x, point.cp2.y);
		// }
		// else {
		// 	ctx.lineTo(point.p2.x, point.p2.y);
		// }
		// if (point.cp3) {
		// 	ctx.moveTo(point.p3.x, point.p3.y);
		// 	ctx.lineTo(point.cp3.x, point.cp3.y);
		// }
		// else {
		// 	ctx.lineTo(point.p3.x, point.p3.y);
		// }
		// if (point.cp4) {
		// 	ctx.moveTo(point.p4.x, point.p4.y);
		// 	ctx.lineTo(point.cp4.x, point.cp4.y);
		// }
		// else {
		// 	ctx.lineTo(point.p4.x, point.p4.y);
		// }
		// ctx.stroke();
		
		// Green Saber Lines!
		// ******* TEST ************
		ctx.lineWidth = styleGreen.curve.width;
		ctx.strokeStyle = styleGreen.curve.color;
		ctx.fillStyle = '#ffffff';
		//ctx.fillStyle = '#f0f8ff';
		ctx.shadowBlur = 75;
		ctx.shadowColor = "#00ff00";
		//ctx.globalAlpha = 1.0;
		ctx.beginPath();
		ctx.moveTo(point.p1.x, point.p1.y);
		//ctx.lineTo(point.cp1.x, point.cp1.y);
		if (point.p2) {
			ctx.lineTo(point.p2.x, point.p2.y);
			//ctx.lineTo(point.cp2.x, point.cp2.y);
		}
		if (point.p3) {
			ctx.lineTo(point.p3.x, point.p3.y);
			//ctx.lineTo(point.cp3.x, point.cp3.y);
		}
		if (point.p4) {
			ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p4.x, point.p4.y);			
			//ctx.lineTo(point.p4.x, point.p4.y);
			ctx.lineTo(point.p1.x, point.p1.y);
		}
		// if (point.cp1) {
		// 	ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p1.x, point.p1.y);
		// }
		ctx.stroke();
		ctx.fill();
		// ******* END: TEST ************


		// Blue Saber Lines!
		// ******* TEST ************
		ctx.lineWidth = styleRed.curve.width;
		ctx.strokeStyle = styleRed.curve.color;
		ctx.fillStyle = '#ffffff';
		//ctx.fillStyle = '#f0f8ff';
		ctx.shadowBlur = 75;
		ctx.shadowColor = "#0934E0"; //Blue
		//ctx.shadowColor = "#FF0000"; //Red
		//ctx.globalAlpha = 1.0;
		ctx.beginPath();
		ctx.moveTo(point.p5.x, point.p5.y);
		if (point.p6) {
			ctx.lineTo(point.p6.x, point.p6.y);
		}
		if (point.p7) {
			ctx.lineTo(point.p7.x, point.p7.y);
		}
		if (point.p8) {
			ctx.quadraticCurveTo(point.cp2.x, point.cp2.y, point.p8.x, point.p8.y);			
			ctx.lineTo(point.p5.x, point.p5.y);
		}
		// if (point.cp1) {
		// 	ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p1.x, point.p1.y);
		// }
		ctx.stroke();
		ctx.fill();
		// ******* END: TEST ************




		// curve		
		// ctx.lineWidth = style.curve.width;
		// ctx.strokeStyle = style.curve.color;
		// ctx.fillStyle = '#f0f8ff';
		// ctx.shadowBlur = 20;
		// ctx.shadowColor = "#00ff00";
		// ctx.globalAlpha = 1.0;
		// ctx.beginPath();
		// ctx.moveTo(point.p1.x, point.p1.y);
		// if (point.cp2) {
		// 	ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
		// }
		// else {
		// 	ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
		// }
		// if (point.cp3) {
		// 	ctx.bezierCurveTo(point.cp2.x, point.cp2.y, point.cp3.x, point.cp3.y, point.p3.x, point.p3.y);
		// }
		// else {
		// 	ctx.quadraticCurveTo(point.cp2.x, point.cp2.y, point.p3.x, point.p3.y);
		// }
		// if (point.cp4) {
		// 	ctx.bezierCurveTo(point.cp3.x, point.cp3.y, point.cp4.x, point.cp4.y, point.p4.x, point.p4.y);
		// 	ctx.bezierCurveTo(point.cp4.x, point.cp4.y, point.cp1.x, point.cp1.y, point.p1.x, point.p1.y);
		// }
		// else {
		// 	ctx.quadraticCurveTo(point.cp3.x, point.cp3.y, point.p4.x, point.p4.y);
		// 	ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p4.x, point.p4.y);
		// }
		// ctx.stroke();
		// ctx.fill();


		// curve
		// ******* TEST ************
		// ctx.lineWidth = style.curve.width;
		// ctx.strokeStyle = style.curve.color;
		// ctx.fillStyle = '#f0f8ff';
		// ctx.shadowBlur = 20;
		// ctx.shadowColor = "#00ff00";
		// //ctx.globalAlpha = 1.0;
		// ctx.beginPath();
		// ctx.moveTo(point.p1.x, point.p1.y);
		// if (point.cp2) {
		// 	ctx.moveTo(point.p2.x, point.p2.y);
		// }
		// // else {
		// // 	ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
		// //}
		// if (point.cp3) {
		// 	ctx.moveTo(point.p3.x, point.p3.y);
		// }
		// // else {
		// // 	ctx.quadraticCurveTo(point.cp2.x, point.cp2.y, point.p3.x, point.p3.y);
		// //}
		// if (point.cp4) {
		// 	ctx.moveTo(point.p4.x, point.p4.y);
		// 	ctx.moveTo(point.p1.x, point.p1.y);
		// }
		// // else {
		// // 	ctx.quadraticCurveTo(point.cp3.x, point.cp3.y, point.p4.x, point.p4.y);
		// // 	ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p4.x, point.p4.y);
		// //}
		// ctx.stroke();
		// ctx.fill();
		// ******* END: TEST ************







		// Draw the control points
		for (var p in point) {
			ctx.lineWidth = styleGreen.point.width;
			ctx.strokeStyle = styleGreen.point.color;
			ctx.fillStyle = styleGreen.point.fill;
			ctx.beginPath();
			ctx.arc(point[p].x, point[p].y, styleGreen.point.radius, styleGreen.point.arc1, styleGreen.point.arc2, styleGreen.point.arc3, styleGreen.point.arc4, true);
			ctx.fill();
			ctx.stroke();
		}
		
	//	ShowCode();
	}
			
	
	// start dragging
	function DragStart(e) {
		e = MousePos(e);
		var dx, dy;
		for (var p in point) {
			dx = point[p].x - e.x;
			dy = point[p].y - e.y;
			if ((dx * dx) + (dy * dy) < styleGreen.point.radius * styleGreen.point.radius) {
				drag = p;
				dPoint = e;
				canvas.style.cursor = "move";
				return;
			}
		}
	}
	
	
	// dragging
	function Dragging(e) {
		if (drag) {
			e = MousePos(e);
			point[drag].x += e.x - dPoint.x;
			point[drag].y += e.y - dPoint.y;
			dPoint = e;
			DrawCanvas();
		}
	}
	
	
	// end dragging
	function DragEnd(e) {
		drag = null;
		canvas.style.cursor = "default";
		//canvas.styleRed.cursor = "default";
		DrawCanvas();
	}

	
	// event parser
	function MousePos(event) {
		event = (event ? event : window.event);
		return {
			x: event.pageX - canvas.offsetLeft,
			y: event.pageY - canvas.offsetTop
		}
	}
	
	
	// start
	canvas = document.getElementById("canvas");
	code = document.getElementById("code");
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
		Init(canvas.className == "bezier");
	}
	
})(); 