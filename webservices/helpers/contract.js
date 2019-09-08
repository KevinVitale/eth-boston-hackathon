

const HDWalletProvider = require("@truffle/hdwallet-provider");
const truffleContract = require("@truffle/contract");
const TACX = require("../../contracts/build/contracts/TACX.json");
const provider = new HDWalletProvider(process.env.MNEMONIC, `https://${process.env.NETWORK_NAME}.infura.io/v3/${process.env.INFURA_KEY}`, 0, 2);
const Web3 = require("web3");
const web3 = new Web3(provider);
const [owner, fees] = provider.addresses;
// web3.eth.setProvider(provider);
var contract, contractRef;


(async () => {
  contract = truffleContract(TACX);
  contract.setProvider(provider);
  contractRef = await contract.at(process.env.CONTRACT_ADDRESS);
  // console.log(contractRef)
  // let minter = await contractRef.isMinter.call(owner, {
  //   from: owner,
  //   gas: new web3.utils.BN(1000000)
  // });
  // console.log(minter);
})();


exports.validateSignature = async (body, signature) => {
  let _tmpBody = {...body};
  delete _tmpBody.signature;
  try{
    const sigResult = web3.eth.accounts.recover(JSON.stringify(_tmpBody), signature);
    console.log(sigResult);
    return sigResult;
  } catch(e){
    console.error("validateSignature", e);
    return false;
  }
};


exports.validateOwner = async (tokenId, sender) => {
  try{
    let tokenOwner = await contractRef.ownerOf(tokenId);
    return (sender === tokenOwner);
  } catch(e){
    console.error("validateOwner", e);
    return false;
  }
};
