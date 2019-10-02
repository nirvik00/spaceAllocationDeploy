"use strict";

/***********************
    NEURAL NETWORK
 ***********************/

 const LOG_ON=true; // whether or not to show error logging
 const LOG_FREQ=20000; // how often to show errors / iterations


function sigmoid(x, deriv=false){
    if(deriv){
        return x*(1-x); // where x= sigmoid(x)
    }
    return 1/(1+Math.exp(-x)); 
}


class NeuralNetwork{
    constructor(numInputs, numHidden, numOutputs){
        this._inputs=[];
        this._hidden=[];
        this._numInputs=numInputs;
        this._numHidden=numHidden;
        this._numOutputs=numOutputs;
        this._bias0=new Matrix(1, this._numHidden);
        this._bias1=new Matrix(1, this._numOutputs);
        this._weights0=new Matrix(this._numInputs, this._numHidden);
        this._weights1=new Matrix(this._numHidden, this._numOutputs);
        
        // error logging
        this._logCount=LOG_FREQ;

        // randomize initial weights
        this._bias0.randomWeights();
        this._bias1.randomWeights();
        this._weights0.randomWeights();
        this._weights1.randomWeights();
    }
    get weights0(){
        return this._weights0;
    }
    set weights0(weights){
        this._weights0 = weights;
    }
    get weights1(){
        return this._weights1;
    }
    set weights1(weights){
        this._weights1 = weights;
    }
    get bias0(){
        return this._bias0;
    }
    set bias0(bias0){
        this._bias0 = bias0;
    }
    get bias1(){
        return this._bias1;
    }
    set bias1(bias1){
        this._bias1 = bias1;
    }
    get inputs(){
        return this._inputs;
    }
    set inputs(inputs){
        this._inputs=inputs;
    }
    get hidden(){
        return this._hidden;
    }
    set hidden(hidden){
        this._hidden=hidden;
    }
    get logCount(){
        return this._logCount;
    }
    set logCount(logCount){
        this._logCount=logCount;
    }

    feedForward(inputArray){
        // NEURAL NET FEEDFORWARD : convert input array to matrix
        this.inputs= Matrix.convertFromArray(inputArray);

        // NEURAL NET FEEDFORWARD : find hidden values and apply activation function - use dot prod
        this.hidden = Matrix.dot(this.inputs, this.weights0);
        this.hidden = Matrix.add(this.hidden, this.bias0); // apply bias before sigmoid
        this.hidden = Matrix.map(this.hidden, x=>sigmoid(x));

        // NEURAL NET FEEDFORWARD : find the output values and apply the activation function
        let outputs = Matrix.dot(this.hidden, this.weights1);
        outputs = Matrix.add(outputs, this.bias1); // apply bias before sigmoid 
        outputs= Matrix.map(outputs, x=>sigmoid(x));

        return outputs; 
    }

    train(inputArray, targetArray){
        // NEURAL NET TRAIN:  feed the input data through the network
        let outputs=this.feedForward(inputArray);

        // NEURAL NET TRAIN: calculate the output errors (target - output)
        let targets=Matrix.convertFromArray(targetArray);
        let outputErrors=Matrix.subtract(targets, outputs);
        
        // error logging
        if(LOG_ON){
            if(this.logCount == LOG_FREQ){
                console.log("error = " + outputErrors.data[0][0]);
            }
            this.logCount--;
            if(this.logCount ==0 ){
                this.logCount =LOG_FREQ;
            }
        }

        // NEURAL NET TRAIN: calculate the deltas
        let outputDerivs = Matrix.map(outputs, x=> sigmoid(x, true));
        let outputDeltas=Matrix.multiply(outputErrors, outputDerivs);

        // NEURAL NET TRAIN: calculate hidden layer errors (deltas dot transpose weights1)
        let weights1T= Matrix.transpose(this.weights1);
        let hiddenErrors=Matrix.dot(outputDeltas, weights1T);

        // NEURAL NET TRAIN: calculate the hidden deltas (errors * derivative of hidden)
        let hiddenDerivs = Matrix.map(this.hidden, x=> sigmoid(x, true));
        let hiddenDeltas=Matrix.multiply(hiddenErrors, hiddenDerivs);

        // NEURAL NET TRAIN:  update the weights (add transpose of layers dot deltas)
        let hiddenT=Matrix.transpose(this.hidden);
        this.weights1=Matrix.add(this.weights1, Matrix.dot(hiddenT, outputDeltas));
        let inputsT=Matrix.transpose(this.inputs);
        this.weights0=Matrix.add(this.weights0, Matrix.dot(inputsT, hiddenDeltas));

        // update bias
        this.bias1= Matrix.add(this.bias1, outputDeltas);
        this.bias0= Matrix.add(this.bias0, hiddenDeltas);
    }
}
