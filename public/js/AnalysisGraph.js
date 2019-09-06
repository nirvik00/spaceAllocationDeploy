
//
// graph - 1
// draw the counter vs score, adj, dir
function drawGraphs_Counter_Score_Breakdown() {
    var ctx = document.getElementById('graphScoreCounter').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: scoreBreakDownData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Graph-1'
            },
            scales: {
                yAxes: [{
                    label:'yaxis',
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }, {
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                },{
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-3',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                }],
            }
        }
    });
};

//
// graph - 2
// diff-score, diff-score-adj, diff-score-dir
function drawGraphs_Diff_Counter_Score_Breakdown() {
    var ctx = document.getElementById('graphDiffScoreCounter').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: scoreDiffScoreCounterData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Graph-2' 
            },
            scales: {
                yAxes: [{
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }, {
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                },{
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-3',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                }],
            }
        }
    });
};

//
// graph - 3
// draw the diff- score vs diff- config
function drawGraphs_Counter_Score_Config() {
    var ctx = document.getElementById('graphScoreConfigCounter').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: scoreScoreConfigData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text:'Graph-3'
            },
            scales: {
                yAxes: [{
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },{
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                }],
            }
        }
    });
}

// graph - 4
// draw the diff- score vs diff- config
function drawGraphs_Diff_Counter_Score_Config() {
    var ctx = document.getElementById('graphDiffScoreConfigCounter').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: scoreDiffScoreConfigData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text:'Graph-4'
            },
            scales: {
                yAxes: [{
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },{
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                }],
            }
        }
    });
}


// graph - 5
// draw the constraint-breakdown
function drawGraphs_Diff_Counter_Score_Config() {
    var ctx = document.getElementById('graphDiffScoreConfigCounter').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: scoreDiffScoreConfigData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text:'Graph-4'
            },
            scales: {
                yAxes: [{
                    type: 'linear', 
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },{
                    type: 'linear', 
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnChartArea: false, 
                    }
                }],
            }
        }
    });
}

