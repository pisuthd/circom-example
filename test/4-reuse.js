const chai = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");

const { expect } = chai

describe('#reuse', () => {

    let circuit

    before(async () => {
        circuit = await wasm_tester(path.join("4-reuse", "circuit.circom"))
    })

    it("reuse Succeeded", async () => {
        const witness = await circuit.calculateWitness({ a: 10, b: 20, c: 30  });
        await circuit.assertOut(witness, { out: 6000 });
    })
 

}) 