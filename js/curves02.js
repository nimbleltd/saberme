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

	var canvas, ctx, code, point1, point2, point3, point4, style, drag = null, dPoint;

	// define initial points
	function Init(quadratic) {

		point1 = {p1: { x:100, y:250 }};
		point2 = {p2: { x:400, y:250 }};
		point3 = {p3: { x:300, y:150 }};
		point4 = {p4: { x:150, y:150 }};
		
		if (quadratic) {
			point1.cp1 = { x: 250, y: 100 };
		}
		else {
			point1.cp1 = { x: 150, y: 100 };
			point2.cp2 = { x: 350, y: 100 };
			point3.cp3 = { x: 250, y: 200 };
			point4.cp4 = { x: 200, y: 175 };
		}
		
		// default styles
		style = {
			curve:	{ width: 6, color: "#333" },
			cpline:	{ width: 1, color: "#C00" },
			point1: { radius: 10, width: 2, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI },
			point2: { radius: 10, width: 2, color: "#090", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI },
			point3: { radius: 10, width: 2, color: "#009", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI },
			point4: { radius: 10, width: 2, color: "#991", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
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
		ctx.lineWidth = style.cpline.width;
		ctx.strokeStyle = style.cpline.color;
		ctx.beginPath();
		ctx.moveTo(point1.p1.x, point1.p1.y);
		ctx.lineTo(point1.cp1.x, point1.cp1.y);
		if (point2.cp2) {
			ctx.moveTo(point2.p2.x, point2.p2.y);
			ctx.lineTo(point2.cp2.x, point2.cp2.y);
		}
		else {
			ctx.lineTo(point2.p2.x, point2.p2.y);
		}
		if (point3.cp3) {
			ctx.moveTo(point3.p3.x, point3.p3.y);
			ctx.lineTo(point3.cp3.x, point3.cp3.y);
		}
		else {
			ctx.lineTo(point3.p3.x, point3.p3.y);
		}
		if (point4.cp4) {
			ctx.moveTo(point4.p4.x, point4.p4.y);
			ctx.lineTo(point4.cp4.x, point4.cp4.y);
		}
		else {
			ctx.lineTo(point4.p4.x, point4.p4.y);
		}
		ctx.stroke();
		
		// curve
		ctx.lineWidth = style.curve.width;
		ctx.strokeStyle = style.curve.color;
		ctx.beginPath();
		ctx.moveTo(point1.p1.x, point1.p1.y);
		if (point2.cp2) {
			ctx.bezierCurveTo(point1.cp1.x, point1.cp1.y, point2.cp2.x, point2.cp2.y, point2.p2.x, point2.p2.y);
		}
		else {
			ctx.quadraticCurveTo(point1.cp1.x, point1.cp1.y, point2.p2.x, point2.p2.y);
		}
		if (point3.cp3) {
			ctx.bezierCurveTo(point2.cp2.x, point2.cp2.y, point3.cp3.x, point3.cp3.y, point3.p3.x, point3.p3.y);
		}
		else {
			ctx.quadraticCurveTo(point2.cp2.x, point2.cp2.y, point3.p3.x, point3.p3.y);
		}
		if (point4.cp4) {
			ctx.bezierCurveTo(point3.cp3.x, point3.cp3.y, point4.cp4.x, point4.cp4.y, point4.p4.x, point4.p4.y);
			ctx.bezierCurveTo(point4.cp4.x, point4.cp4.y, point1.cp1.x, point1.cp1.y, point1.p1.x, point1.p1.y);
		}
		else {
			ctx.quadraticCurveTo(point3.cp3.x, point3.cp3.y, point4.p4.x, point4.p4.y);
			tx.quadraticCurveTo(point1.cp1.x, point1.cp1.y, point4.p4.x, point4.p4.y);
		}
		ctx.stroke();

		// control points
		for (var p in point1) {
			ctx.lineWidth = style.point1.width;
			ctx.strokeStyle = style.point1.color;
			ctx.fillStyle = style.point1.fill;
			ctx.beginPath();
			ctx.arc(point1[p].x, point1[p].y, style.point1.radius, style.point1.arc1, style.point1.arc2, style.point1.arc3, style.point1.arc4, true);
			ctx.fill();
			ctx.stroke();
		}
		for (var p in point2) {
			ctx.lineWidth = style.point2.width;
			ctx.strokeStyle = style.point2.color;
			ctx.fillStyle = style.point2.fill;
			ctx.beginPath();
			ctx.arc(point2[p].x, point2[p].y, style.point2.radius, style.point2.arc1, style.point2.arc2, style.point2.arc3, style.point2.arc4, true);
			ctx.fill();
			ctx.stroke();
		}
		for (var p in point3) {
			ctx.lineWidth = style.point3.width;
			ctx.strokeStyle = style.point3.color;
			ctx.fillStyle = style.point3.fill;
			ctx.beginPath();
			ctx.arc(point3[p].x, point3[p].y, style.point3.radius, style.point3.arc1, style.point3.arc2, style.point3.arc3, style.point3.arc4, true);
			ctx.fill();
			ctx.stroke();
		}
		for (var p in point4) {
			ctx.lineWidth = style.point4.width;
			ctx.strokeStyle = style.point4.color;
			ctx.fillStyle = style.point4.fill;
			ctx.beginPath();
			ctx.arc(point4[p].x, point4[p].y, style.point4.radius, style.point4.arc1, style.point4.arc2, style.point4.arc3, style.point4.arc4, true);
			ctx.fill();
			ctx.stroke();
		}
		
		// ShowCode();
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
		for (var p in point1) {
			pointNum = 1;
			console.log("pointNum = " + pointNum)
			dx = point1[p].x - e.x;
			dy = point1[p].y - e.y;
			if ((dx * dx) + (dy * dy) < style.point1.radius * style.point1.radius) {
				drag = p;
				dPoint = e;
				canvas.style.cursor = "move";
				return pointNum;
			}
		}
		for (var p in point2) {
			dx = point2[p].x - e.x;
			dy = point2[p].y - e.y;
			if ((dx * dx) + (dy * dy) < style.point2.radius * style.point2.radius) {
				drag = p;
				dPoint = e;
				canvas.style.cursor = "move";
				return;
			}
		}
		for (var p in point3) {
			dx = point3[p].x - e.x;
			dy = point3[p].y - e.y;
			if ((dx * dx) + (dy * dy) < style.point3.radius * style.point3.radius) {
				drag = p;
				dPoint = e;
				canvas.style.cursor = "move";
				return;
			}
		}
		for (var p in point4) {
			dx = point4[p].x - e.x;
			dy = point4[p].y - e.y;
			if ((dx * dx) + (dy * dy) < style.point4.radius * style.point4.radius) {
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
			//e = MousePos(e);
			console.log(this)
			this['point'+drag[drag.length - 1]][drag].x += e.x - dPoint.x;
			this['point'+drag[drag.length - 1]][drag].y += e.y - dPoint.y;
			dPoint = e;
			DrawCanvas();
		}
		// if (drag) {
		// 	e = MousePos(e);
		// 	point2[drag].x += e.x - dPoint.x;
		// 	point2[drag].y += e.y - dPoint.y;
		// 	dPoint = e;
		// 	DrawCanvas();
		// }
		// if (drag) {
		// 	e = MousePos(e);
		// 	point3[drag].x += e.x - dPoint.x;
		// 	point3[drag].y += e.y - dPoint.y;
		// 	dPoint = e;
		// 	DrawCanvas();
		// }
		// if (drag) {
		// 	e = MousePos(e);
		// 	point4[drag].x += e.x - dPoint.x;
		// 	point4[drag].y += e.y - dPoint.y;
		// 	dPoint = e;
		// 	DrawCanvas();
		// }
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