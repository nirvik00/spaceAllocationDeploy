//
//
function displayScore(){
    var r=getPrevScore();
    var cells=SOLARR[SOLARR.length-1][0];
    var s="";
    for(var i=0; i<cells.length; i++){
        s+=cells[i].name;
    }
}
//
//
function checkDirScore(cell){
    var score=0.0;
    var dir="";
    if(cell.No===true && cell.spaceObj.dir.No!==undefined) { 
        score+=cell.spaceObj.dir.No;
        dir+=".n";
    }
    if(cell.Nw===true && cell.spaceObj.dir.Nw!==undefined) {
        score+=cell.spaceObj.dir.Nw; dir["NW"]=cell.spaceObj.dir.No; 
        dir+=".nw";
    }
    if(cell.We===true && cell.spaceObj.dir.We!==undefined) { 
        score+=cell.spaceObj.dir.We; dir["We"]=cell.spaceObj.dir.No;
        dir+=".w";
    }
    if(cell.SW===true && cell.spaceObj.dir.SW!==undefined) { 
        score+=cell.spaceObj.dir.SW; dir["SW"]=cell.spaceObj.dir.No; 
        dir+=".sw";
    }
    if(cell.So===true && cell.spaceObj.dir.So!==undefined) { 
        score+=cell.spaceObj.dir.So; dir["So"]=cell.spaceObj.dir.No;
        dir+=".s";
    }
    if(cell.SE===true && cell.spaceObj.dir.SE!==undefined) { 
        score+=cell.spaceObj.dir.SE; dir["SE"]=cell.spaceObj.dir.No; 
        dir+=".se";
    }
    if(cell.Ea===true && cell.spaceObj.dir.Ea!==undefined) { 
        score+=cell.spaceObj.dir.Ea; dir["Ea"]=cell.spaceObj.dir.No; 
        dir+=".e";
    }
    if(cell.NE===true && cell.spaceObj.dir.NE!==undefined) { 
        score+=cell.spaceObj.dir.NE; dir["NE"]=cell.spaceObj.dir.No; 
        dir+=".ne";
    }
    var Score={"score" : score, "dir":dir};
    
    return  Score;
}
//
//
function CalculateScore(cells, rel){ //cells=global,  rel= adjrel global 
    var scoreDir=0.0;
    var scoreAdj=0.0;
    var Score=0.0;
    var dirs_combined="";
    for(var i=0; i<cells.length; i++){
        var p=cells[i].mpX;
        var q=cells[i].mpY;
        var nameI=cells[i].name;
        var combinedDirScore=checkDirScore(cells[i]);
        var dirScore=parseFloat(combinedDirScore.score);
        var dirs=combinedDirScore.dir;
        if(dirScore!==0){
            scoreDir+=dirScore;
            //
            /// ALL DETAILS OF A SCORE
            //
            var dirarr=dirs.split(".");
            for(var k=1;k<dirarr.length; k++){
                var s1=nameI+"."+dirarr[k];
                var t1=getConstraintId(s1);
                if(t1>-1){
                    var arr1={"constraintId":t1, "val":dirScore};
                    TRACK_SCORE_DETAILS.push(arr1);
                }
            }
        }
        //adjacency;
        for(var j=0; j<cells.length; j++){
            var r=cells[j].mpX;
            var s=cells[j].mpY;
            var nameJ=cells[j].name;
            var d=Math.sqrt((p-r)*(p-r) + (q-s)*(q-s));
            if(d>0.01){
                for(var k=0; k<rel.length; k++){
                    var spaceAName=rel[k].spaceA.name;
                    var spaceBName=rel[k].spaceB.name;
                    var val=rel[k].val;
                    if((spaceAName==nameI && spaceBName==nameJ) || (spaceBName==nameI && spaceAName==nameJ)){
                        var sc2=(val)/d;
                        scoreAdj+=sc2;
                        //
                        /// ALL DETAILS OF A SCORE
                        //
                        var detail2=nameI+"."+nameJ;
                        var t2=getConstraintId(detail2); // file: Utils.js
                        if(t2>-1){
                            var arr2={"constraintId":t2, "val":sc2};
                            TRACK_SCORE_DETAILS.push(arr2);
                        }
                    }
                }
            }
        }
    }
    if(TRACKING===true){
        console.log(TRACK_SCORE_DETAILS);
    }
    Score=scoreAdj+scoreDir; 
    var score={"score":Score, "adj":scoreAdj, "dir":scoreDir};
    return score;
}
//
//
function getPrevScore(){
    SOLARR.sort(function(a,b){
        return a[1]-b[1];
    });
    var r=SOLARR[SOLARR.length-1][1];
    return r;
}