

const HDWalletProvider = require("@truffle/hdwallet-provider");
const truffleContract = require("@truffle/contract");
const TACX = require("../../contracts/build/contracts/LOGN.json");
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


exports.validateSignatureAsync = async (body, signature) => {
  let _tmpBody = {...body};
  delete _tmpBody.signature;
  try{
    const sigResult = await web3.eth.personal.ecRecover(JSON.stringify(_tmpBody), signature);
    console.log("sigResult", sigResult.toString().toLowerCase());
    console.log("address", body.address.toString().toLowerCase());
    return (sigResult.toString().toLowerCase() == body.address.toString().toLowerCase());
  } catch(e){
    console.error("validateSignature", e);
    return false;
  }
};


exports.validateOwnerAsync = async (tokenId, sender) => {
  try{
    let tokenOwner = await contractRef.ownerOf(tokenId);
    console.log("sender", sender.toString());
    console.log("tokenOwner", tokenOwner.toString());
    return (sender.toString().toLowerCase() == tokenOwner.toString().toLowerCase());
  } catch(e){
    console.error("validateOwner", e);
    return false;
  }
};
