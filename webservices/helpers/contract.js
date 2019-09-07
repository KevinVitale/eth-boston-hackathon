

const HDWalletProvider = require("@truffle/hdwallet-provider");
const truffleContract = require("@truffle/contract");
const TACX = require("../../contracts/build/contracts/TACX.json");
const provider = new HDWalletProvider(process.env.MNEMONIC, `https://${process.env.NETWORK_NAME}.infura.io/v3/${process.env.INFURA_KEY}`, 0, 2);
const Web3 = require("web3");
const web3 = new Web3(provider);
const [owner, fees] = provider.addresses;
// web3.eth.setProvider(provider);
var contract, contractRef;

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENC_SECRET);



// Or, if web3 is alreay initialized, you can call the "setProvider' on web3, web3.eth, web3.shh and/or web3.bzz

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


exports.createAsync = async (encrString, senderAddress, tokenId) => {
  console.log("EncyptedMessage", encBody);
  console.log("senderAddress", senderAddress);
  console.log("tokenId", tokenId);
  try{
    // senderAddress
    let tokenOwner = await contractRef.ownerOf(tokenId);
    assert(tokenOwner === senderAddress, "Owner is not sender");
    console.log("tokenOwner", tokenOwner);
    let encBody = cryptr.encrypt(encrString);
    console.log("encBody", encBody);
    // TODO: save encrypted body
  } catch(e){
    console.error("ERROR", e);
  }
};

exports.transferAsync = async () => {

};


// const Cryptr = require("cryptr");
// const cryptr = new Cryptr("myTotalySecretKey");
 
// const encryptedString = cryptr.encrypt("bacon");
// const decryptedString = cryptr.decrypt(encryptedString);
 
// console.log(encryptedString); // 5590fd6409be2494de0226f5d7
// console.log(decryptedString); // bac