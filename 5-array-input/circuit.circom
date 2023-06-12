pragma circom 2.0.0;

include "../4-reuse/multiplier.circom";

template arrayInput (N) {

    signal input in[N];
    signal output out;
    component comp[N-1];

    for(var i = 0; i < N-1; i++){
       comp[i] = multiplier();
    }

    comp[0].a <== in[0];
    comp[0].b <== in[1];

    for(var i = 0; i < N-2; i++){
       comp[i+1].a <== comp[i].c;
       comp[i+1].b <== in[i+2]; 
    }
    out <== comp[N-2].c; 
}

component main = arrayInput(4);

