const chai = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");

const { expect } = chai

describe('#binary-check', () => {

    let circuit

    before(async () => {
        circuit = await wasm_tester(path.join("1-binary-check", "circuit.circom"))
    })

    it("Succeeded when input = 0", async () => {
        const witness = await circuit.calculateWitness({ in: 0 });
        await circuit.assertOut(witness, { out: 0 });
    })

    it("Succeeded when input = 1", async () => {
        const witness = await circuit.calculateWitness({ in: 1 });
        await circuit.assertOut(witness, { out: 1 });
    })

    it("Failed when the input is not binary", async () => {

        try {
            const witness = await circuit.calculateWitness({ in: 2 });
            await circuit.assertOut(witness, { out: 2 });
        } catch (e) {
            expect((e.message).includes("Error in template binaryCheck_0")).to.true
        }
    })

}) 