
var HPoint = function(x,y){
    this.x=x;
    this.y=y;
    this.isConnected=false;
    return this;
}

var Highway = function() {
    this.pointNumber = 20;
    this.pullhPoints = function(){
        var hPoints=[{x:10,y:20}];
        return hPoints;
    }
    hPoints=[{x:10,y:20}]
    this.drawConnection = function(hPoint){
        //znajdz dwa wezly, ktore sa w najkrotszej odleglosci,
        //zaznacz je jako isConnected i przejdz do nastepnego
        for (var i=0; i<hPoints.length; i++ ){

        }
    }
}/**
 * Created by saphire on 2015-03-18.
 */
