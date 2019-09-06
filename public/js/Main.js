//
//
const CANVAS=document.getElementById("OPTCANVAS");
const CTX=CANVAS.getContext('2d');
//
//
const OPT_WIDTH=document.getElementById("OPTCANVAS").width;
const OPT_HEIGHT=document.getElementById("OPTCANVAS").height;
//
//
initSys(true);
displayScore();
initDrawing();
//
//
function startOPTLoop(){
    // should not reset the state of the system
    PAUSECONSTANT=PAUSEAFTERNUMITR+COUNTER;
    STARTRANDOM=false;
    OPTSWITCH=setInterval(optLoop, FPS);
}
//
//
function drawGraph(){
    formatDataGraphs();
    document.getElementById('graphDiv').style.display='block';
    drawGraphs_Counter_Score_Breakdown();
    drawGraphs_Diff_Counter_Score_Breakdown();
    drawGraphs_Counter_Score_Config();
    drawGraphs_Diff_Counter_Score_Config();
}

function hideGraph(){
    document.getElementById('graphDiv').style.display='none';
}
//
//
function stopOPTLoop(){
    //shoudl not reset the system
    STARTRANDOM=false;
    clearInterval(OPTSWITCH);
    //
    console.log("\n\n-----------TRACK SCORE DETAILS SAMPLE-----------------------");
    console.log(TRACK_SCORE_DETAILS);
    console.log("\n\n---------- CONSTRAINTS ------------------------");
    console.log(CONSTRAINTS);
    console.log("\n\n----------SOL ARR ------------------------");
    console.log(SOLARR);
    console.log("\n\n-----------TRACK SCORE -----------------------");
    console.log(TRACK_SCORE);
    console.log("\n\n-----------CONSTRAINT COUNTER DETAILS -----------------------");
    console.log(CONSTRAINT_COUNTER_DETAILS);
    document.getElementById("process").innerHTML="Optimization Loops Running: false\nGraph Display: true";
    drawGraph();   
}

//
//
function resetSys(){
    //reset
    PAUSECONSTANT=1;
    STARTRANDOM=false;
    initSys(false);
    clearInterval(OPTSWITCH);
    document.getElementById('graphDiv').style.display='none';
}
//
//
function startRandom(){
    //reset
    STARTRANDOM=true;
    initSys(true);
    initDrawing();
    /// OPTSWITCH=setInterval(optLoop, 10);
}
//
//
function openDataControls(){
    let ele=document.getElementById("editDiv");
    let tbl=generateTable("editTable", "dynamicCells");
    ele.style.display="block";
    ele.appendChild(tbl);
    addButtons(ele);
}
//
//
function addButtons(ele){
    // check for too many update buttons
    var updateitems=document.getElementsByClassName("updateme");
    for(let i=0; i<updateitems.length; i++){
        updateitems[i].remove();
    }
    //add and handle update button
    let updatebtn=document.createElement("BUTTON");
    updatebtn.className="updateme";
    updatebtn.innerHTML="UPDATE DATA";
    updatebtn.style.marginTop="12px";
    updatebtn.style.marginLeft="20px";
    ele.appendChild(updatebtn);
    updatebtn.addEventListener('click', function(){
        updateDataFromTable();
    });

    // check for too many default buttons
    var defitems=document.getElementsByClassName('defvals');
    for(let i=0; i<defitems.length; i++){
        defitems[i].remove();
    }
    let defbtn=document.createElement("BUTTON");
    defbtn.className="defvals";
    defbtn.innerHTML="SET DAFAULT DATA";
    defbtn.style.marginLeft="20px";
    defbtn.style.marginTop="12px";
    ele.appendChild(defbtn);
    defbtn.addEventListener('click', function(){
        updatedefaultVals();
        generateTable("editTable", "dynamicCells");
        updateDataFromTable();
    });
    // check for too many end buttons
    var delitems=document.getElementsByClassName("closeme");
    for(let i=0; i<delitems.length; i++){
        delitems[i].remove();
    }

    //add and handle end button
    let endbtn=document.createElement("BUTTON");
    endbtn.className="closeme";
    endbtn.innerHTML="CLOSE USER INTERFACE";
    endbtn.style.marginTop="12px";
    endbtn.style.marginLeft="20px";

    ele.appendChild(endbtn);
    endbtn.addEventListener('click', function(){
        ele.style.display='none';
    });
}
