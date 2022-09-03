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
    string public baseExtension = ".json";
    string private baseURI;

    //mapping of owner of nft token
    mapping(uint => address) internal _ownerOf;
    //
    mapping(address => uint) internal _balanceOf;

    // events
    event TokenMinted(
        address indexed minter,
        uint indexed tokenId,
        string indexed tokenURI
    );

    event TokenBurned(
        address _tokenOwner,
        address _to,
        uint _tokenId
    );

    modifier onlyOwner(){
        require(msg.sender == owner, "Admin Priviledges Required");
        _;
    }

    constructor(
        address _owner, 
        string memory _name, 
        string memory _symbol, 
        string memory _initBaseURI) ERC721(_name, _symbol ){
        owner = _owner;
        setBaseURI(_initBaseURI);
        console.log("Contract is constructed");
    }

    function mint(string memory _tokenURI) public returns(uint){
        _tokenIds.increment();
        uint newRecord =  _tokenIds.current();
        _safeMint(msg.sender, newRecord);
        _ownerOf[newRecord] = msg.sender;
        _setTokenURI(newRecord, _tokenURI);

        emit TokenMinted(msg.sender, newRecord, _tokenURI); 
        return newRecord;
    }

    function burn(uint tokenId) internal{
        address _tokenOwner = _ownerOf[tokenId];
        require(_tokenOwner != address(0), "Not Minted");

        _balanceOf[_tokenOwner] -= 1;

        delete _ownerOf[tokenId];

        emit TokenBurned(_tokenOwner, address(0), tokenId);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }


}
