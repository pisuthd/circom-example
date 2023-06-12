const chai = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");

const { expect } = chai

describe('#multiplier', () => {

    let circuit

    before(async () => {
        circuit = await wasm_tester(path.join("2-multiplier", "circuit.circom"))
    })

    it("Succeeded when 3x2 = 6", async () => {
        const witness = await circuit.calculateWitness({ a: 3, b : 2 }, true);
        await circuit.assertOut(witness, { c: 6 });
    })

    it("Succeeded when 123x456 = 56088", async () => {
        const witness = await circuit.calculateWitness({ a: 123, b : 456 }, true);
        await circuit.assertOut(witness, { c: 56088 });
    })

    

}) 