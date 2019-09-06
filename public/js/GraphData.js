//
//
//
function clearData(){
    // DATA FOR PLOTTING
    DATA_COUNTER=[];
    DATA_CONSTRAINT_BREAKDOWN=[];

    // SCORE BREAK-DOWN
    DATA_SCORE=[];
    DATA_SCORE_ADJ=[];
    DATA_SCORE_DIR=[];
    DATA_CONFIG=[];

    // INCREMENTAL IMPROVEMENTS
    DATA_DIFF_SCORE=[];
    DATA_DIFF_COUNTER=[];
    DATA_DIFF_SCORE_ADJ=[];
    DATA_DIFF_SCORE_DIR=[];

    // CONFIG DIFF 
    DATA_DIFF_CONFIG=[];
}

//
//
function formatDataGraphs(){
    clearData();
    // score break-down
     for(var i=0; i<TRACK_SCORE.length; i++){
         var counter=TRACK_SCORE[i].counter;
         var totalScore=TRACK_SCORE[i].totalScore;
         var adjScore=TRACK_SCORE[i].adjScore;
         var dirScore=TRACK_SCORE[i].dirScore;

         DATA_COUNTER.push(counter);
         DATA_SCORE.push(totalScore);
         DATA_SCORE_ADJ.push(adjScore);
         DATA_SCORE_DIR.push(dirScore);
     }

     // diff-increment in score and counter
     for(var i=0; i<TRACK_SCORE.length-1; i++){
        var dcounter=TRACK_SCORE[i+1].counter-TRACK_SCORE[i].counter;
        var dScore=TRACK_SCORE[i+1].totalScore-TRACK_SCORE[i].totalScore;
        var dadjScore=TRACK_SCORE[i+1].adjScore-TRACK_SCORE[i].adjScore;
        var ddirScore=TRACK_SCORE[i+1].dirScore-TRACK_SCORE[i].dirScore;

        DATA_DIFF_COUNTER.push(dcounter);
        DATA_DIFF_SCORE.push(dScore);
        DATA_DIFF_SCORE_ADJ.push(dadjScore);
        DATA_DIFF_SCORE_DIR.push(ddirScore);
    }

    // improvement in configurations from starting point
    for(var i=0; i<SOLARR.length-1; i++){
        var str0=SOLARR[i][0];
        var arr0=str0.split(",");
        var str1=SOLARR[i][0];
        var arr1=str1.split(",");
        var score=0.0;
        for(var j=0; j<arr1.length; j++){
            if(arr0[j] !== arr1[j]){
                score++;
            }
        }
        DATA_DIFF_CONFIG.push(score);
    }
    
    // RATE OF CHANGE in configurations from starting point
    for(var i=0; i<SOLARR.length-1; i++){
        var config0=SOLARR[0][0];
        var arr0=config0.split(",");
        var str1=SOLARR[i+1][0];
        var arr1=str1.split(",");
        var score=0.0;
        for(var j=0; j<arr1.length; j++){
            if(arr0[j] !== arr1[j]){
                score++;
            }
        }
        DATA_CONFIG.push(score);
    }

    // CONSTRAINT BREAKDOWN DATA
    for(var i=0; i<CONSTRAINTS.length; i++){
        
    }

    // graph- 1
    // counter vs score, score-adj, score-dir
     scoreBreakDownData = {
        labels: DATA_COUNTER,
        datasets: [{
            label: 'layout score',
            borderColor: "rgba(200,0,0,1.0)",
            backgroundColor: "rgba(200,0,0,1.0)",
            fill: false,
            data: DATA_SCORE,
            yAxisID: 'y-axis-1',
        }, {
            label: 'cardinal score',
            borderColor: "rgba(0,0,200,1.0)",
            backgroundColor: "rgba(0,0,200,1.0)",
            fill: false,
            data: DATA_SCORE_DIR,
            yAxisID: 'y-axis-2'
        },{
            label: 'adjacency score',
            borderColor: "rgba(0,200,0,1.0)",
            backgroundColor: "rgba(0,200,0,1.0)",
            fill: false,
            data: DATA_SCORE_ADJ,
            yAxisID: 'y-axis-3'
        },
    ]};

    // graph - 2
    // diff-counter vs diff-score, diff-score-adj, diff-score-dir
     scoreDiffScoreCounterData = {
        labels: DATA_COUNTER,
        datasets: [{
            label: 'rate of change of total layout-score',
            borderColor: "rgba(200,0,0,1.0)",
            backgroundColor: "rgba(200,0,0,1.0)",
            fill: false,
            data: DATA_DIFF_SCORE,
            yAxisID: 'y-axis-1'
        },{
            label: 'rate of change of in cardinal score',
            borderColor: "rgba(0,0,200,1.0)",
            backgroundColor: "rgba(0,0,200,1.0)",
            fill: false,
            data: DATA_DIFF_SCORE_DIR,
            yAxisID: 'y-axis-2'
        },{
            label: 'rate of change of adjacency score',
            borderColor: "rgba(0,200,0,1.0)",
            backgroundColor: "rgba(0,200,0,1.0)",
            fill: false,
            data: DATA_DIFF_SCORE_ADJ,
            yAxisID: 'y-axis-3'
        }
    ]};

    // graph - 3 
    // counter vs diff-counter diff-score, diff-config
     scoreScoreConfigData = {
        labels: DATA_COUNTER,
        datasets: [{
            label: 'layout-score',
            borderColor: "rgba(200,0,0,1.0)",
            backgroundColor: "rgba(200,0,0,1.0)",
            fill: false,
            data: DATA_SCORE,
            yAxisID: 'y-axis-1'
        },{
            label: 'space-allocation',
            borderColor: "rgba(0,200,200,1.0)",
            backgroundColor: "rgba(0,200,200,1.0)",
            fill: false,
            data: DATA_CONFIG,
            yAxisID: 'y-axis-2'
        }
    ]};

    // graph - 4  
    // counter vs diff-counter diff-score, diff-config
     scoreDiffScoreConfigData = {
        labels: DATA_COUNTER,
        datasets: [{
            label: 'rate of change of layout-score',
            borderColor: "rgba(200,0,0,1.0)",
            backgroundColor: "rgba(200,0,0,1.0)",
            fill: false,
            data: DATA_DIFF_SCORE,
            yAxisID: 'y-axis-1'
        },{
            label: 'rate of change of space-allocation',
            borderColor: "rgba(0,200,200,1.0)",
            backgroundColor: "rgba(0,200,200,1.0)",
            fill: false,
            data: DATA_DIFF_CONFIG,
            yAxisID: 'y-axis-2'
        }
    ]};


    // graph - 5
    // constraint breakdown
    constraintBreakdown = {
        labels: DATA_COUNTER,
        datasets: [{
            label: 'rate of change of layout-score',
            borderColor: "rgba(200,0,0,1.0)",
            backgroundColor: "rgba(200,0,0,1.0)",
            fill: false,
            data: DATA_DIFF_SCORE,
            yAxisID: 'y-axis-1'
        },{
            label: 'rate of change of space-allocation',
            borderColor: "rgba(0,200,200,1.0)",
            backgroundColor: "rgba(0,200,200,1.0)",
            fill: false,
            data: DATA_DIFF_CONFIG,
            yAxisID: 'y-axis-2'
        }
    ]};

}