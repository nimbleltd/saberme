 /* 
 * Canvas curves example
 *
 * By Craig Buckler,		http://twitter.com/craigbuckler
 * of OptimalWorks.net		http://optimalworks.net/
 * for SitePoint.com		http://sitepoint.com/
 * 
 * Refer to:
 * http://blogs.sitepoint.com/html5-canvas-draw-quadratic-curves/
 * http://blogs.sitepoint.com/html5-canvas-draw-bezier-curves/
 *
 * This code can be used without restriction. 
 */

(function() {

	var canvas, ctx, code, point, style, drag = null, dPoint;

	// define initial points
	function Init(quadratic) {

		point = {
			p1: { x:100, y:250 },
			p2: { x:400, y:250 },
			p3: { x:300, y:150 },
			p4: { x:150, y:150 }
		};
		
		// if (quadratic) {
		// 	point.cp1 = { x: 250, y: 100 };
		// }
		// else {
		 	point.cp1 = { x: 220, y: 180 };
		// 	point.cp2 = { x: 350, y: 100 };
		// 	point.cp3 = { x: 250, y: 200 };
		// 	point.cp4 = { x: 200, y: 175 };
		// }
		
		// default styles
		style = {
			curve:	{ width: 6, color: "#333" },
			cpline:	{ width: 1, color: "#C00" },
			point: { radius: 10, width: 2, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
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
		
		// No Control Point Lines!
		// ******* TEST ************
		ctx.lineWidth = style.curve.width;
		ctx.strokeStyle = style.curve.color;
		ctx.fillStyle = '#f0f8ff';
		ctx.shadowBlur = 20;
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
			ctx.lineWidth = style.point.width;
			ctx.strokeStyle = style.point.color;
			ctx.fillStyle = style.point.fill;
			ctx.beginPath();
			ctx.arc(point[p].x, point[p].y, style.point.radius, style.point.arc1, style.point.arc2, style.point.arc3, style.point.arc4, true);
			ctx.fill();
			ctx.stroke();
		}
		
	//	ShowCode();
	}
	
	
	// show canvas code
	// function ShowCode() {
	// 	if (code) {
	// 		code.firstChild.nodeValue = 
	// 			"canvas = document.getElementById(\"canvas\");\n"+
	// 			"ctx = canvas.getContext(\"2d\")\n"+
	// 			"ctx.lineWidth = " + style.curve.width +
	// 			";\nctx.strokeStyle = \"" + style.curve.color +
	// 			"\";\nctx.beginPath();\n" +
	// 			"ctx.moveTo(" + point.p1.x + ", " + point.p1.y +");\n" +
	// 			(point.cp2 ? 
	// 				"ctx.bezierCurveTo("+point.cp1.x+", "+point.cp1.y+", "+point.cp2.x+", "+point.cp2.y+", "+point.p2.x+", "+point.p2.y+");" :
	// 				"ctx.quadraticCurveTo("+point.cp1.x+", "+point.cp1.y+", "+point.p2.x+", "+point.p2.y+");"
	// 			) +
	// 			"\nctx.stroke();"
	// 		;
	// 	}
	// }
	
	
	// start dragging
	function DragStart(e) {
		e = MousePos(e);
		var dx, dy;
		for (var p in point) {
			dx = point[p].x - e.x;
			dy = point[p].y - e.y;
			if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
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
		Init(canvas.className == "quadratic");
	}
	
})(); 