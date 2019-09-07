pragma solidity ^0.5.8;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";


contract TACX is ERC721Full, ERC721Mintable {

  uint256 tokenIdNum = 0;
  uint256 maintenanceGasPrice = 0;

  constructor( uint256 _gasPrice) ERC721Full("TokenizedAccess", "TACX") public {
    require(_gasPrice > 0, "Gas price must be greater than zero");
    maintenanceGasPrice = _gasPrice;
  }

  function createToken() public payable returns (uint256 tokenId) {
    require(msg.value > maintenanceGasPrice, "Payable function must be gas price");
    tokenId = getNextTokenId();
    _mint(msg.sender, tokenId);
  }

  function getNextTokenId() internal returns (uint256) {
    return tokenIdNum += 1;
  }


}