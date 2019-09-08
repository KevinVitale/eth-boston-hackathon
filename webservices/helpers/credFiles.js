

const path = require("path");
const fileDir = path.resolve(__dirname, process.env.FILE_DIR);
const fs = require("fs-extra");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENC_SECRET);


exports.setEncDataAsync = async (encrString, tokenId) => {
  console.log("EncyptedMessage", encrString);
  console.log("tokenId", tokenId);
  try{
    let encBody = cryptr.encrypt(encrString);
    console.log("encBody", encBody);
    await fs.outputFile(`${fileDir}/${tokenId}`, encBody);
    // TODO: save encrypted body
  } catch(e){
    console.error("createAsync.error", e);
  }
};

exports.getEncDataAsync = async (tokenId) => {
  console.log("tokenId", tokenId);
  try{
    let encBody = await fs.readFile(`${fileDir}/${tokenId}`, "utf8");
    let creds = cryptr.decrypt(encBody);
    console.log("creds", creds);
    return creds;
  } catch(e){
    console.error("transferAsync.error", e);
  }
};
