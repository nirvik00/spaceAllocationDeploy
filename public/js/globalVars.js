const FPS=1;
var OPTSWITCH;
var STARTRANDOM=false;


const NUMX=9;
const NUMY=10;
const CELLLENGTH=65;
const CELLWIDTH=40;

var SPACES=[];
var REQSPACES=[];
var SOLARR=[];
var ADJREL=[];
var CELLS=[];

var COUNTER=0;
var BESTSCORE=0.0;
var BESTSCORECOUNTER=0;
const PAUSEAFTERNUMITR=10000;

var STARTTIME; // updated in function initSys // file: OptimizationLoop.js
var ENDTIME; // updated in function: displayInfo  // file : Utils.js


var TRACK_SCORE=[]; // combined score with counter, adjacency and direction
var TRACK_SCORE_DETAILS=[]; // detailed tracking of score

var CONSTRAINTS=[]; // 
var CONSTRAINTSCORE=[]; // { counter, score, dscore }

var TRACKING=false; // track the details of score all constraints for 1 counter

var CONSTRAINT_COUNTER_DETAILS=[]; // for every counter, get all change in score of constraints


// DATA FOR PLOTTING

var DATA_COUNTER=[];

// SCORE BREAK-DOWN
var DATA_SCORE=[];
var DATA_SCORE_ADJ=[];
var DATA_SCORE_DIR=[];
var DATA_CONFIG=[];

// INCREMENTAL IMPROVEMENTS from PREVIOUS ITERATION
var DATA_DIFF_SCORE=[]; 
var DATA_DIFF_COUNTER=[];
var DATA_DIFF_SCORE_ADJ=[];
var DATA_DIFF_SCORE_DIR=[];

// CONFIG DIFF 
var DATA_DIFF_CONFIG=[];
var DATA_CONSTRAINT_BREAKDOWN=[];


// DATA STRUCTURES TO DRAW GRAPHS
var scoreBreakDownData;
var scoreDiffScoreCounterData;
var scoreScoreConfigData;
var scoreDiffScoreConfigData;
var constraintBreakdown;