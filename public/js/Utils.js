//
//
// from optLoop in file: OptimizationLoop.js
function copyArray(arr){
    var newArr=[];
    for(var i=0; i<arr.length; i++){
        var e=arr[i];
        newArr.push(e);
    }
    return newArr;
}
//
//
// from optLoop in file: OptimizationLoop.js
function randomShuffle(arr){
    for(var i=arr.length-1; i>=0; i--){
        var j=Math.round(Math.random()*(i+1));
        var tmp=arr[i];
        arr[i]=arr[j];
        arr[j]=tmp;
    }
    return arr;
}
//
//
function getSpaces(){
    var arr=[];
    for(var i=0; i<CELLS.length; i++){
        var space=CELLS[i].space;
        arr.push(space);
    }
    return arr;
}
//
// given a details, check which constraint id is affected
function getConstraintId(str){
    var reqId=-1;
    // constraint is {id: id_, detail:"detail_"}
    for(var i=0; i<CONSTRAINTS.length; i++){
        var id=CONSTRAINTS[i].id;
        var detail= CONSTRAINTS[i].detail;
        if(str===detail) {
            reqId=id;
            break;
        }
    }
    return reqId;
}
//
// for a counter, get cumulative effect on a constraint from arr of all {constrain_id, score}
function cumuConstraintOfCounter(arr, counter){
    var constraintCounterDetails=[];
    for(var i=0; i<CONSTRAINTS.length; i++){
        var id1=CONSTRAINTS[i].id;
        var score=0.0;
        for(var j=0; j<arr.length; j++){
            var id2=arr[j].constraintId;
            var val=arr[j].val;
            if(id1===id2){
                score+=val;
            }
        }
        var farr={"id":id1, "score":score, "counter":counter};
        constraintCounterDetails.push(farr);
    }
    return constraintCounterDetails;
}

//
// from optLoop in file: OptimizationLoop.js
function swapSpaces(arr){
    let i=Math.round(Math.random()*(arr.length-1));
    let j=Math.round(Math.random()*(arr.length-1));
    var tmp=arr[i];
    arr[i]=arr[j];
    arr[j]=tmp;
    return arr;
}
//
//
function AllocateSpaceToCell(cells, spaces){
    var newSpaces=copyArray(spaces);
    for(var i=0; i<cells.length; i++){
        try{
            cells[i].setSpace(newSpaces[i]);
        }
        catch(Exception){
            //console.log("error utils 51, "+i);
            continue;
        }
    }
    return cells;
}
//
//
function displaySpaces(arr){
    var s="";
    for(var i=0; i<arr.length; i++){
        s+=arr[i].name;
        s+=arr[i].getDirStr();
        s+="\n";
    }
    console.log(s);
}
//
//
function getSpacesStr(arr){
    var s="";
    for(var i=0; i<arr.length; i++){
        s+=arr[i].name;
        if(i<arr.length-1){
            s+=","
        }
    }
    return s;
}
//
//
function ptInCell(x,y,cells){
    // true means OUTSIDE all cells - direction is free
    // false means it is INSIDE a cell
    var t=true;
    for(let i=0;i<cells.length; i++){
        let cellx=cells[i].x;
        let celly=cells[i].y;
        let cellL=cells[i].l;
        let cellw=cells[i].w;
        if(Math.abs(x-cellx)>0.01 & Math.abs(y-celly)>0.01){
            if(x>cellx && x<cellx+cellL && y>celly && y<celly+cellw){
                t=false;
                break;
            }
        }
    }
    return t;
}
//
//
// from optLoop in file: OptimizationLoop.js
function displayInfo(){
    CTX.font="10px Arial";
    CTX.fillStyle="rgb(0,0,0)";
    CTX.fillText("SPACES", 620,50);
    let Y_De=70;
    for(var i=0; i<SPACES.length; i++){
        var re=SPACES[i].red;
        var gr=SPACES[i].green;
        var bl=SPACES[i].blue;
        CTX.fillStyle="rgba("+re+","+gr+","+bl+","+0.5+")";
        CTX.fillRect(620,Y_De,20,20);
        CTX.fillStyle="rgb(0,0,0)";
        CTX.fillText(SPACES[i].name+"   # "+SPACES[i].num+","+SPACES[i].getDirStr(),630,Y_De+15);
        Y_De+=20;
    }
    CTX.font="10px Arial";
    CTX.fillStyle="rgb(0,0,0)";
    Y_De+=40;
    CTX.fillText("ADJACENCY", 620,Y_De);
    Y_De+=10;
    for(var i=0; i<ADJREL.length; i++){
        let rel=ADJREL[i];
        CTX.fillStyle="rgb(0,0,0)";
        CTX.fillText(i+") "+rel.spaceA.name+", "+rel.spaceB.name+", val="+rel.val,620,Y_De+15);
        Y_De+=20;
    }

    CTX.fillStyle="rgba(0,0,0)";
    CTX.font="10px Arial";
    CTX.fillText("Topological Complexity: void space",CELLLENGTH*3.75,CELLWIDTH*3.55);
    CTX.fillText("Topological Complexity: void space",CELLLENGTH*3.75,CELLWIDTH*6.55);

    if(SOLARR.length>0){
        SOLARR.sort(function(a,b){return b[1]-a[1];});
        var strConfig=getSpacesStr(REQSPACES);
        BESTSCORE=Math.abs(SOLARR[0][1]);
        BESTSCORECOUNTER=SOLARR[0][2];
        document.getElementById("itrCounter").innerHTML="Iteration: " + COUNTER;
        document.getElementById("bestString").innerHTML="Best SPACE-ALLOCATION: "+ strConfig;
        document.getElementById("bestScore").innerHTML="Best Score: " + BESTSCORE;
        document.getElementById("bestScoreCounter").innerHTML="Best Score Iteration: " + BESTSCORECOUNTER;
        // document.getElementById("randomStart").innerHTML="Random Start: " + STARTRANDOM;
        ENDTIME=performance.now();
        var timeElapsed=ENDTIME-STARTTIME;
        document.getElementById("timeElapsed").innerHTML="Time Elapsed: " +timeElapsed +" milliseconds";
    }
    document.getElementById("process").innerHTML="Optimization Loops Running: true\nGraph Display: false";
}
//
//
// from optLoop in file: OptimizationLoop.js
function elapsedTimeFunc(elapsedIter){
    clearInterval(OPTSWITCH);
    // clear previous button and add close button
    var delitems=document.getElementsByClassName("closeme2");
    for(var i=0; i<delitems.length; i++){
        delitems[i].remove();
    }
    // another method to remove all children 
    var div=document.getElementById("endLoop");
    while(div.hasChildNodes()){
        div.removeChild(div.firstChild);
    }
    var p=document.createElement("p");
    p.className="closeme2";
    p.innerHTML=COUNTER+" ITERATIONS COMPLETED. " +elapsedIter+" ITERATIONS ELAPSED SINCE LAST UPDATE. OPTIMIZATION PROCESS PAUSED FOR REVIEW.";
    div.style.display="block";
    div.appendChild(p);
    var closeme=document.createElement("BUTTON");
    closeme.className="closeme2";
    closeme.style.marginLeft="25px";
    closeme.innerHTML="CLOSE UI";
    div.appendChild(closeme);
    closeme.addEventListener('click', function(){
        div.style.display="none";
    });
    var runagain=document.createElement("BUTTON");
    runagain.className="closeme2";
    runagain.innerHTML="CONTINUE PROCESS";
    runagain.style.marginLeft="25px";
    div.appendChild(runagain);
    runagain.addEventListener('click', function(){
        div.style.display="none";
        OPTSWITCH=setInterval(optLoop,FPS);
    });
}

