// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AlienPunkzNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //storage variables
    address public owner;

    //mappings
    mapping(uint => address) public nftOwners;

    // events
    event TokenMinted(
        address indexed minter,
        uint indexed tokenId,
        string indexed tokenURI
    );

    constructor(address _owner) ERC721("Alien Punkz", "APZ"){
        owner = _owner;
        console.log("Contract is constructed");
    }

    function mint(string memory _tokenURI) public returns(uint){
        _tokenIds.increment();
        uint newRecord =  _tokenIds.current();
        _safeMint(msg.sender, newRecord);
        nftOwners[newRecord] = msg.sender;
        _setTokenURI(newRecord, _tokenURI);

        emit TokenMinted(msg.sender, newRecord, _tokenURI); 
        return newRecord;
    }

    




}
