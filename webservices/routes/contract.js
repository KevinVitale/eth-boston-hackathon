const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs-extra");

router.get("/abi", async function(req, res) {
  const fileLoc = path.resolve(__dirname, "../../contracts/build/contracts/LOGN.json");
  let results = await fs.readFile(fileLoc, "utf8");
  let parsedJSON =  JSON.parse(results);
  res.json(
    cleanABI(parsedJSON)
  );
});


function cleanABI(abi) {
  delete abi.deployedBytecode;
  delete abi.sourceMap;
  delete abi.deployedSourceMap;
  delete abi.source;
  delete abi.sourcePath;
  delete abi.ast;
  delete abi.legacyAST;
  return abi;
}


module.exports = router;
