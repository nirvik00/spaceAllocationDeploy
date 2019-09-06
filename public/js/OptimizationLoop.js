//
//
//
function clearAllGlobalParams(){
    // dont put tracking . scoring . time params here
    // only for global arrays of objects 
    SPACES=[];
    ADJREL=[];
    REQSPACES=[];
    CONSTRANTS=[];

}
//
//
function updatedefaultVals(){

    clearAllGlobalParams();

    let dirA={"No":0, "NW":0, "We":0, "SW":0, "So":0, "SE":0, "Ea":20, "NE":0};
    let dirB={"No":0, "NW":0, "We":0, "SW":0, "So":0, "SE":0, "Ea":0, "NE":0};
    let dirC={"No":0, "NW":0, "We":0, "SW":0, "So":20, "SE":0, "Ea":0, "NE":0};
    let dirG={"No":20, "NW":0, "We":0, "SW":0, "So":0, "SE":0, "Ea":0, "NE":0};
    let dirBlank={"No":0, "NW":0, "We":0, "SW":0, "So":0, "SE":0, "Ea":0, "NE":0};

    var a=new Space("a", 7, 200,0,0, dirA);
    var b=new Space("b", 7, 200,0,200, dirBlank);
    var c=new Space("c", 7, 255,255,0, dirBlank);
    var d=new Space("d", 7, 0,0,200, dirBlank);
    var e=new Space("e", 7, 0,200,0, dirBlank);
    var f=new Space("f", 7, 100,200,200, dirBlank);
    var g=new Space("g", 10, 250,200,200, dirBlank);

    SPACES=[a,b,c,d,e,f,g];

    var rel1=new Rel(a,a,20);
    var rel2=new Rel(a,b,-20);
    var rel3=new Rel(b,c,00);
    var rel4=new Rel(g,g,0);

    ADJREL=[rel1,rel2,rel3,rel4];

    var constraintId=0;
    for(var i=0; i<ADJREL.length; i++){
        var a=ADJREL[i].spaceA.name;
        var b=ADJREL[i].spaceB.name;
        var v=ADJREL[i].val;
        var s=a+"."+b;
        var type="adjacency";
        var ele={"id":constraintId, "type":type, "detail":s};
        CONSTRAINTS.push(ele);
        constraintId++;
    }

    for(var i=0; i<SPACES.length; i++){
        var name=SPACES[i].name;
        var dir=SPACES[i].getValidDirStr();
        if(dir.length>0){
            var s=name+dir;
            var type="direction";
            var ele={"id":constraintId, "type": type, "detail":s, "counter":0, "score":0};
            CONSTRAINTS.push(ele);
            constraintId++;
        }
    }

    displaySpaces(SPACES);
}
//
//
function initSys(userVals=false){
    COUNTER=0;
    CELLS=[]; 
    SOLARR=[]; // spaces-config, score, counter - used for scoring
    TRACK_SCORE=[]; // counter, layout-score, adj-score, dir-score - used for scoring
    CONSTRAINT_COUNTER_DETAILS=[]; // id, val, vounter

    STARTTIME=performance.now(); // time 
    BESTSCORECOUNTER=0; // best overall score

    var x_=0; var id=0;
    for(var i=1; i<NUMX; i++){
        var y_=0;
        for(var j=0; j<NUMY; j++){
            if(j%3!=0){
                var cell=new Cell(x_+","+y_,id,i*CELLLENGTH,j*CELLWIDTH,CELLLENGTH,CELLWIDTH);
                y_++; id++;
                CELLS.push(cell);  
            }else if((i<3) && (j%3==0) && (j>0 && j< NUMY-1)){
                var cell=new Cell(x_+","+y_,id,i*CELLLENGTH,j*CELLWIDTH,CELLLENGTH,CELLWIDTH);
                y_++; id++;
                CELLS.push(cell);  
            }
        }
        x_++;
    }
    //
    // use default values
    if(userVals===true){
        updatedefaultVals();
    }
    // if it is false, values are coming from updateTable

    // otherwise
    // use user values from table

    REQSPACES=[];
    for(var i=0; i<SPACES.length; i++){
        var name=SPACES[i].name;
        var num=SPACES[i].num;
        var re=SPACES[i].red;
        var gr=SPACES[i].green;
        var bl=SPACES[i].blue;
        let dir=SPACES[i].dir;
        if(num>0){
            for(var j=0; j<num; j++){
                var sp=new Space(name, 1, re,gr,bl,dir);
                REQSPACES.push(sp);
            }
        }
    }
    if(STARTRANDOM===true){
        REQSPACES=randomShuffle(REQSPACES);
    }
     
    AllocateSpaceToCell(CELLS, REQSPACES); // file: Utils.js
    var score=CalculateScore(CELLS, ADJREL); // file: Scoring.js
    SOLARR.push([getSpacesStr(REQSPACES),0.0,0]);
    initDrawing();
}
//
//
function initDrawing(){
    console.clear();
    CTX.fillStyle="rgb(255,255,255)";
    CTX.fillRect(0,0,OPT_WIDTH, OPT_HEIGHT);
    CTX.clearRect(0,0,OPT_WIDTH,OPT_HEIGHT);
    displayInfo(); // file: Utils.js write content to HTML & canvas
    for(var i=0; i<CELLS.length; i++){
        CELLS[i].occupied=false;
        CELLS[i].setDir(CELLS);
    }
    // display cells
    for(var i=0; i<CELLS.length; i++){
        var cell=CELLS[i];
        cell.display();// file: cells.js
    }
}
//
// called from file: Main.js functions : startOptLoop, startRandom, 
function optLoop(){
    CTX.fillStyle="rgb(255,255,255)";
    CTX.fillRect(0,0,OPT_WIDTH, OPT_HEIGHT);
    CTX.clearRect(0,0,OPT_WIDTH,OPT_HEIGHT);
    displayInfo();// file: Utils.js write content to HTML & canvas
    //
    COUNTER++; // global variable
    //
    // get initial space
    var iniSpace=copyArray(REQSPACES);
    AllocateSpaceToCell(CELLS, REQSPACES);
    var combinedIniScore=CalculateScore(CELLS, ADJREL);
    var iniScore= combinedIniScore.dir + combinedIniScore.adj;

    //pair-wise swap
    TRACK_SCORE_DETAILS=[]; /// global variable 
    var newSpace=copyArray(iniSpace); // file: Utils.js
    newSpace=swapSpaces(newSpace); // file: Utils.js
    AllocateSpaceToCell(CELLS, newSpace); // file: Utils.js
    var combinedScore=CalculateScore(CELLS, ADJREL); // file: Scoring.js
    var newScore=parseFloat(combinedScore.dir) + parseFloat(combinedScore.adj);

    if(newScore>iniScore){
        REQSPACES=newSpace;
        SOLARR.push([ getSpacesStr(REQSPACES),newScore,COUNTER]);
        var arr={"counter":COUNTER, "totalScore":newScore, "adjScore": combinedScore.adj, "dirScore": combinedScore.dir};
        TRACK_SCORE.push(arr);
        // TRACK_SCORE_DETAILS is embedded in function: CalculateScore file: Utils.js
        var scoreDetails=TRACK_SCORE_DETAILS;
        var FD=cumuConstraintOfCounter(scoreDetails, COUNTER); // file: Utils.js
        CONSTRAINT_COUNTER_DETAILS.push(FD);
    }
    else{
        REQSPACES=iniSpace;
    }
    
    AllocateSpaceToCell(CELLS, REQSPACES);

    // display result
    for(var i=0; i<CELLS.length; i++){
        var cell=CELLS[i];
        cell.display();// file: cells.js
    }


    var elapsedIter=COUNTER-BESTSCORECOUNTER;
    if(COUNTER%PAUSEAFTERNUMITR===0 && elapsedIter>PAUSEAFTERNUMITR){
        elapsedTimeFunc(elapsedIter); // file: Utils.js function:elapsedTimeFunc()
    }

}
