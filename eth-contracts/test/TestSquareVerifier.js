// Define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require('SquareVerifier');
const zokratesProof = require("../../zokrates/code/square/proof.json");

contract('TestSquareVerifier', accounts => {
  const owner = accounts[0];

  ///Available Accounts
  ///==================
  ///(0) 0x6b7a64ed8be6c748fea3deb7f30c3d10e44cdced
  ///(1) 0xdd1e815fa6f1913f0e0adfa831d474c21d0a8d91
  ///(2) 0x2a0668826a7505f72649f14c71d8290e13b802b7
  ///(3) 0xec7d9247f106a24c442b4628fd0515d29e79e131
  ///(4) 0xd06230a32f6cca1d72f086a594af5e7b8d67f016
  ///(5) 0xe55f21bfbc3d3a534b7f95336232b4abf1c4a3e8
  ///(6) 0x03cb6d7f2ba941e78ad151b60fc75216639cc310
  ///(7) 0x28f4ebd33370346e60d73b76d58e112bcbf5c20a
  ///(8) 0xbcdbf6d2022e773e50d04ca1c5b2f313d4c3325a
  ///(9) 0x331037c18c68bdee1f7998d45bb6403bc0deb9cb

  console.log("TestSquareVerifier:");
  console.log("Contract Owner: accounts[0] ", accounts[0]);

  beforeEach(async() => {
      this.contract = await SquareVerifier.new({from: owner});
  });

  // Test verification with correct proof
  // - use the contents from proof.json generated from zokrates steps
  it("should verify correct proof", async() => {
    let result = await this.contract.verifyTx.call(...Object.values(zokratesProof.proof), zokratesProof.inputs);
    assert.equal(result, true)
  });
    
  // Test verification with incorrect proof
  it("should not verify incorrect proof", async() => {
    let result = await this.contract.verifyTx.call(...Object.values(zokratesProof.proof), [42, 23]);
    assert.equal(result, false);
  });
});