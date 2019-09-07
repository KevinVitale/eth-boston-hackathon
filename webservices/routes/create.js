const express = require("express");
const router = express.Router();
// const assert = require("assert");
const contract = require("../helpers/contract");


// router.get("/", function(req, res) {
//   res.send(200);
// });
router.post("/", function(req, res) {
  console.log(req.body);
  res.json({hello:true});
});

module.exports = router;
