const chai = require("chai");
const wasm_tester = require("circom_tester").wasm;
const path = require("path");
const buildEddsa = require("circomlibjs").buildEddsa;
const buildMimc7 = require("circomlibjs").buildMimc7;
const buildBabyjub = require("circomlibjs").buildBabyjub;


const { expect } = chai

describe('#verify-eddsa', () => {

    let circuit
    let eddsa
    let mimc
    let babyJub;
    let F;
 

    before(async () => {
        circuit = await wasm_tester(path.join("6-verify-eddsa", "circuit.circom"))
        eddsa = await buildEddsa();
        mimc = await buildMimc7();
        babyJub = await buildBabyjub();
        F = babyJub.F;
    })

    it("Sign a message succeeded", async () => {

        const preimage = [123, 456, 789];
        const M = mimc.multiHash(preimage);
        const prvKey = Buffer.from('1'.toString().padStart(64, '0'), "hex");
        const pubKey = eddsa.prv2pub(prvKey);

        const signature = eddsa.signMiMC(prvKey, M);

        expect(signature.S).to.equal(2155891444535918152497919043343497937073225666864146866593229400861695633936n)
        expect((eddsa.verifyMiMC(M, signature, pubKey))).to.true

        const inputs = {
            "from_x": F.toObject(pubKey[0]),
            "from_y": F.toObject(pubKey[1]),
            "R8x": F.toObject(signature['R8'][0]),
            "R8y": F.toObject(signature['R8'][1]),
            "S": signature['S'],
            "M":  F.toObject(M)
        }

        const witness = await circuit.calculateWitness(inputs);
        await circuit.checkConstraints(witness);
    })


}) 