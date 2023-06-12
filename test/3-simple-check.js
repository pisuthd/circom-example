const chai = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");

const { expect } = chai

describe('#simple-check', () => {

    let circuit

    before(async () => {
        circuit = await wasm_tester(path.join("3-simple-check", "circuit.circom"))
    })

    it("simple-check Succeeded", async () => {
        const witness = await circuit.calculateWitness({ a: 1, b: 2, c: 3, d: 6 }, true);
        await circuit.assertOut(witness, { out: 9 });
    })
 

}) 