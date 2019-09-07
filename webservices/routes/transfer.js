var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", function(req, res) {
  res.json({
    transfer: true
  });
});

module.exports = router;
