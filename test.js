var drawPoints = function (ctrlPoints) {
    for (var i=0;i<ctrlPoints.length; i++){
        context.beginPath();
        context.fillStyle='rgb('+i*50+',0,0)';

        context.fillRect(ctrlPoints[i].x,ctrlPoints[i].y,10,10);
        context.stroke();
    }
}


var coastPoints=[];
context.beginPath();
for (var i=0;i<ctrlPoints.length-1; i++){
    coastPoints.push(new Point(ctrlPoints[i].x,ctrlPoints[i].y-30-Math.random()*100));


}
context.moveTo(coastPoints[0].x,coastPoints[0].y);
context.lineTo(coastPoints[coastPoints.length-1].x,coastPoints[coastPoints.length-1].y);
/*   for (var i=0;i<coastPoints.length-1; i++){
 context.moveTo(coastPoints[i].x,coastPoints[i].y);
 context.lineTo(coastPoints[i+1].x,coastPoints[i+1].y);
 }*/
context.stroke();
// drawSmoothLine(context,coastPoints, 3);