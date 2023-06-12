const chai = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");

const { expect } = chai

describe('#array-input', () => {

    let circuit

    before(async () => {
        circuit = await wasm_tester(path.join("5-array-input", "circuit.circom"))
    })

    it("array-input Succeeded", async () => {
        const witness = await circuit.calculateWitness({ in: [1,2,3, 4]  });
        await circuit.assertOut(witness, { out: 24 });
    })
 

}) 