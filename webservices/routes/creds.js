const express = require("express");
const router = express.Router();
const assert = require("assert");
const contract = require("../helpers/contract");
const files = require("../helpers/credFiles");


// router.get("/", function(req, res) {
//   res.send(200);
// });
router.post("/create", async function(req, res) {
  console.log("create.req.body", req.body)
  try {
    assert(req.body.creds !== undefined, "Creds required");
    assert(req.body.address !== undefined || /^0x[a-fA-F0-9]{40}$/.test(req.body.address), "Address required");
    assert(req.body.tokenId !== undefined || /^\d+$/.test(req.body.tokenId), "Token required");
    assert(req.body.signature !== undefined || /^0[xX][0-9A-Fa-f]{64}$/.test(req.body.signature), "Signature required");
    assert(contract.validateSignature(req.body, req.body.signature), "Signature validation failure");
    assert( (await contract.validateOwner(req.body.tokenId, req.body.address) ), "Not the owner");
    await files.setEncDataAsync(req.body.creds.toString(), req.body.tokenId);
    res.send(201);
  } catch (e){
    res.json({error : e.toString()});
  }
});


router.post("/consume", async function(req, res) {
  console.log("consume.req.body", req.body);
  try {
    assert(req.body.address !== undefined || /^0x[a-fA-F0-9]{40}$/.test(req.body.address), "Address required");
    assert(req.body.tokenId !== undefined || /^\d+$/.test(req.body.tokenId), "Token required");
    assert(req.body.signature !== undefined || /^0[xX][0-9A-Fa-f]{64}$/.test(req.body.signature), "Signature required");
    assert(contract.validateSignature(req.body, req.body.signature), "Signature validation failure");
    let results = await files.getEncDataAsync(req.body.tokenId);
    res.json({creds: results});
  } catch (e){
    res.json({error : e.toString()});
  }
});

module.exports = router;
