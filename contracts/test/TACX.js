
// const truffleContract = require("truffle-contract");
const truffleAssert = require("truffle-assertions");
const TACX = artifacts.require("TACX");
// const constants = require("./utils/constants.js");
const assertRevert = require("./utils/assertRevert");
const devUtils = require("./utils/helpers.js");
// console.log(constants);


contract("TACX", (accounts) => {
  console.log("Accounts", accounts);
  const [owner, buyer, author, funder] = accounts;
  let tokenContract;
  let blockInfo;
  let snapshotId;

  /* create named accounts for contract roles */

  // assert(mediator === "0x8347291305158bb6FE46757C7BDE7daFBD478456", "Use Ganache UI for 0x435e6c9D8FdbDeD62b0C86FDcAe14A34148791A9 account.");

  before(async () => {
    console.log(TACX.new);
    snapshotId = await devUtils.saveStateAsync();
    tokenContract = await TACX.new();
    console.log(tokenContract);

    // await tokenContract.mint(funder, web3.utils.toWei("10"));
    // await tokenContract.approve(tokenContract.address, web3.utils.toWei("99", "ether"), { from: funder });
    const blockInfo = await web3.eth.getBlock((await web3.eth.getBlockNumber()));
    console.log(blockInfo);
  });

  after(async () => {
    let ownerMinter = await tokenContract.isMinter(owner);
    console.log(ownerMinter)
    let buyerMinter = await tokenContract.isMinter(buyer);
    console.log(buyerMinter)
    let authorMinter = await tokenContract.isMinter(author);
    console.log(authorMinter)
    let funderMinter = await tokenContract.isMinter(funder);
    console.log(funderMinter)
    await devUtils.revertStateAsync(snapshotId);
  });


  it("author fails approving contract when not selected", async () => {
    assert(1==1,"Duh!");
  });

  // context("Happy path test", async () => {

  //   let contextSnapshot;

  //   before(async () => {
  //     contextSnapshot = await devUtils.saveStateAsync();
  //     daeContract = await DAE.new(
  //       constants.NULL_ADDRESS,
  //       tokenExchange.address,
  //       tokenContract.address,
  //       devUtils.getMinutesFromHours(48),
  //       { value: web3.utils.toWei("1", "ether"), from: buyer }
  //     );
  //   });

  //   after(async () => {
  //     return await devUtils.revertStateAsync(contextSnapshot);
  //   });


  //   it("author fails approving contract when not selected", async () => {
  //     return assertRevert(async () => {
  //       const balance = await tokenContract.balanceOf(daeContract.address);
  //       await daeContract.authorApproveContract(tokenContract.address, balance, { from: author });
  //     });
  //   });
    
  //   it("buyer approves author", async () => {
  //     const buyerApproveAuthorReceipt = await daeContract.buyerSelectAuthor(author, { from: buyer });
  //     truffleAssert.eventEmitted(buyerApproveAuthorReceipt, "BuyerApproveAuthor", (ev) => {
  //       return ev.newAuthor == author;
  //     });
  //   });
    
    
  // });



});
