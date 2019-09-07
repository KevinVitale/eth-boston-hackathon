const express = require("express");
const router = express.Router();
const assert = require("assert");
const contract = require("../helpers/contract");


// router.get("/", function(req, res) {
//   res.send(200);
// });
router.post("/", async function(req, res) {
  console.log(req.body)
  assert(req.body.creds !== undefined, "Creds required");
  assert(req.body.address !== undefined || /0x[a-fA-F0-9]{40}/.test(req.body.sender), "Address required");
  assert(req.body.tokenId !== undefined || /\d+/.test(req.body.sender), "Address required");
  let results = await contract.createAsync(req.body.creds.toString(), req.body.address);
  res.json({results});
});

module.exports = router;
