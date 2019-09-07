const HDWalletProvider = require("@truffle/hdwallet-provider");
const truffleContract = require("@truffle/contract");
const TACX = require("../../contracts/build/contracts/TACX.json");
const provider = new HDWalletProvider(process.env.MNEMONIC, `https://${process.env.NETWORK_NAME}.infura.io/${process.env.INFURA_KEY}`, 0, 2);
const Web3 = require("web3");
const web3 = new Web3(provider);
const [maker, fees] = provider.addresses;
// web3.eth.setProvider(provider);
var contract, contractRef;


// Or, if web3 is alreay initialized, you can call the 'setProvider' on web3, web3.eth, web3.shh and/or web3.bzz

(async () => {
  contract = truffleContract(TACX);
  contract.setProvider(provider);
  contractRef = await contract.at(process.env.CONTRACT_ADDRESS);
  // let minter = await contractRef.isMinter(maker);
  // console.log(minter);
})();


exports.create = function transfer(){

};

exports.transfer = function transfer(){

};
