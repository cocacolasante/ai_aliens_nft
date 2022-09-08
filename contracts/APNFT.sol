// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract APCollection is ERC721URIStorage  {
using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public admin;

    string private baseURI = "https://ipfs.io/ipfs/QmbMiN9qC3MeZqyv7hpRXAKTYN6YpKj9Rbcp7b9eiwK7cY/";

    mapping(uint => address) public _ownerOfNFT;
    mapping(address=>uint) public NFTOwner;

    //events 
    event TokenBurned(
        address _tokenOwner,
        address _to,
        uint _tokenId
    );

    modifier onlyOwner{
        require(msg.sender == admin);
        _;
    }

    constructor() ERC721("AI Aliens", "AIA") {
        admin = payable(msg.sender);
    }

    function mint()
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);

        _ownerOfNFT[newItemId] = msg.sender;
        NFTOwner[msg.sender] = newItemId;

        _setTokenURI(newItemId, string(abi.encodePacked(baseURI, Strings.toString(newItemId), '.json')));

        return newItemId;
    }

    function burn(uint tokenId) public{
        require(msg.sender == _ownerOfNFT[tokenId], "not owner of token");
        
        delete _ownerOfNFT[tokenId];
        NFTOwner[msg.sender] -= tokenId;

        emit TokenBurned(msg.sender, address(0), tokenId);

    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}