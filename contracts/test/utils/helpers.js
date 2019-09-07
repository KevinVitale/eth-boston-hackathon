
const { utils } = require("ethers");


async function advanceTimeAndBlock(time) {
  await advanceTime(time);
  await advanceBlock();
  return Promise.resolve(web3.eth.getBlock("latest"));
}

async function advanceTime(time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [time],
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err); }
      return resolve(result);
    });
  });
}

function advanceBlock() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_mine",
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err); }
      const newBlockHash = web3.eth.getBlock("latest").hash;
      return resolve(newBlockHash);
    });
  });
}

function getExpiresTime(hours){
  return Math.round(new Date().getTime() / 1000) + (hours * 60 * 60);
}

function getMinutesFromHours(hours){
  return Math.round(hours * 60 * 60);
}

function toHex(message){
  return utils.keccak256(
    utils.toUtf8Bytes(message)
  );
}

function waitAsync(seconds){
  return new Promise(res => {
    console.log(`Waiting ${seconds} seconds...`);
    setTimeout(() => {
      res();
    }, seconds * 1000);
  });
}

function saveStateAsync(){
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_snapshot",
      id: new Date().getTime()
    }, (err, snapshotResult) => {
      if (err) { return reject(err); }
      return resolve(parseInt(snapshotResult.result));
    });
  });
}

async function revertStateAsync(id) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_revert",
      params: [id],
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err); }
      if (result.result !== true) { return reject(result); }
      return resolve(result);
    });
  });
}


module.exports = {
  advanceTime,
  advanceBlock,
  advanceTimeAndBlock,
  saveStateAsync,
  revertStateAsync,
  waitAsync,
  toHex,
  getExpiresTime,
  getMinutesFromHours
};
