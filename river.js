var Point = function(x,y){
    this.x=x;
    this.y=y;
    return this;
}

var River = function(){
    this._x = 0;
    this._y = 0;
    this.x = width+50;
    this.y = height+50;
    this.border=50;

    this.drawRiver = function () {
        var thickness=20;

        drawSmoothLine(context, ctrlPoints,thickness);
        //drawPoints(ctrlPoints);
        setCoastLine(ctrlPoints);
        context.lineWidth=1;
    }

    var pullPointFromLeft= function (){
        this.x=-50;
        this.y=Math.random()*height;
        return this;
    }
    var pullPointFromRight= function (){
        this.x=width+50;
        this.y=Math.random()*height;
        return this;
    }
    var pullPointFromTop= function (){
        this.x=Math.random()*width;
        this.y=-50;
        return this;
    }
    var pullPointFromBottom= function (){
        this.x=Math.random()*width;
        this.y=height+50;
        return this;
    }

    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    var pull = function(value){
        switch(value){
            case 0:
                var point = new pullPointFromLeft();
                break;
            case 1:
                var point = new pullPointFromRight();
                break;
            case 2:
                var point = new pullPointFromTop();
                break;
            case 3:
                var point = new pullPointFromBottom();
                break;
        }
        return point;
    }


    var pullCtrlPoints = function(){
        var array=[0,1,2,3];
        shuffle(array);
        var firstPoint=pull(array[0]);
        var lastPoint=pull(array[1]);

        ctrlPoints=[];
        var higherPoint=firstPoint.x<lastPoint.x?lastPoint:firstPoint;
        var lowerPoint=firstPoint.x>lastPoint.x?lastPoint:firstPoint;
        ctrlPoints.push(lowerPoint);
        var a=100;
        do {
            a+=100;
            var x = Math.abs(Math.random()*100)+a + lowerPoint.x ;
            var y = (lastPoint.y - firstPoint.y) * (x - firstPoint.x) / (lastPoint.x - firstPoint.x) + firstPoint.y +(-50 + Math.random()*100)
            ctrlPoints.push(new Point(x, y));
        }
        while (x<higherPoint.x);
        ctrlPoints.push(higherPoint);
        return ctrlPoints;
    }

    var ctrlPoints = pullCtrlPoints();
    var setCoastLine = function(ctrlPoints){
        var coastPoints=[];
        for (var i=0;i<ctrlPoints.length; i++){
           coastPoints.push(new Point(ctrlPoints[i].x,ctrlPoints[i].y+20+Math.random()*50));
        }

        drawSmoothLine(context,coastPoints, 3);

        var coastPoints=[];
        for (var i=0;i<ctrlPoints.length; i++){
            coastPoints.push(new Point(ctrlPoints[i].x,ctrlPoints[i].y-20-Math.random()*50));
        }

        drawSmoothLine(context,coastPoints, 3);
    }
    var drawHighway = function (context, ctrlPoints, thickness){

    }
    var drawSmoothLine = function(context, ctrlPoints,thickness){
        context.lineWidth=thickness;
        var l = ctrlPoints.length;
        switch (l){
            case 0:
            case 1: //no control points
                break;
            case 2: //line
                context.beginPath();
                context.moveTo(ctrlPoints[0].x, ctrlPoints[0].y);
                context.lineTo(ctrlPoints[1].x, ctrlPoints[1].y);
                context.stroke();
                break;
            case 3: //lets use the second point as the two middle control points
                context.beginPath();
                context.moveTo(ctrlPoints[0].x, ctrlPoints[0].y);
                context.bezierCurveTo(ctrlPoints[1].x, ctrlPoints[1].y, ctrlPoints[1].x, ctrlPoints[1].y, ctrlPoints[2].x, ctrlPoints[2].y);
                context.stroke();
                break;
            default: //lets draw a bezier with the first 4 points, and for the rest lets create a control point to keep the line smooth
                context.beginPath();
                context.moveTo(ctrlPoints[0].x, ctrlPoints[0].y);
                var pnt_a = ctrlPoints[1], pnt_b = ctrlPoints[2], pnt_end = ctrlPoints[3];
                context.bezierCurveTo(pnt_a.x, pnt_a.y, pnt_b.x, pnt_b.y, pnt_end.x, pnt_end.y);
                ctrlPoints = ctrlPoints.slice(0);
                l = ctrlPoints.length;
                pnt_b = ctrlPoints[2];
                var i = 5
                for (; i < l; i += 2){
                    pnt_a = {x: pnt_end.x + (pnt_end.x - pnt_b.x), y: pnt_end.y + (pnt_end.y - pnt_b.y)};
                    pnt_b = ctrlPoints[i - 1];
                    pnt_end = ctrlPoints[i];
                    context.bezierCurveTo(pnt_a.x, pnt_a.y, pnt_b.x, pnt_b.y, pnt_end.x, pnt_end.y);
                }
                if (i == l){ //a last lonely point, lets use the calculated pnt_a as pnt_b
                    pnt_a = {x: pnt_end.x + (pnt_end.x - pnt_b.x), y: pnt_end.y + (pnt_end.y - pnt_b.y)};
                    pnt_b = pnt_a;
                    pnt_end = ctrlPoints[l - 1];
                    context.bezierCurveTo(pnt_a.x, pnt_a.y, pnt_b.x, pnt_b.y, pnt_end.x, pnt_end.y);
                }
                context.stroke();
                break;
        }
        context.lineWidth=1;
    };
};