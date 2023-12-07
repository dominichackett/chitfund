// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CreditScore is ERC721Enumerable {
    using Strings for uint256;
    bool public paused = false;
    mapping(uint256 => Word) public wordsToTokenId;

    uint supply =100000;
   
   
    struct Word {
        string name;
        string description; 
        string issuer;       
        string fundId;
        string status;
        string creditScore;
        string bgHue;
               
    }

    //string[] public wordValues = ["accomplish", "accepted", "absolutely", "admire", "achievment", "active"];

    constructor() ERC721("CreditScore", "Score") {}

    // public
    function mint(string memory _certifier, uint _fundId, string memory _status , uint _creditScore, address _applicant) public payable {
 

        Word memory newWord = Word(
            string(abi.encodePacked("Credit Rating for Fund ID ", _fundId.toString())),
            "Auto generated at ChitFund Dapp ", _certifier, _fundId.toString() , _status , _creditScore.toString(),
            _creditScore.toString()
        );


        wordsToTokenId[supply] = newWord; //Add word to mapping @tokenId
        _safeMint(_applicant, supply);
        supply ++;
    }

    



    function buildImage(uint256 _tokenId) private view returns (string memory) {
        Word memory currentWord = wordsToTokenId[_tokenId];
        string memory random = currentWord.fundId;
        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
                        '<rect id="svg_11" height="600" width="503" y="0" x="0" fill="hsl(',
                        currentWord.bgHue,
                        ',50%,25%)"/>',
                        '<text font-size="24" y="45%" x="50%" text-anchor="middle"  fill="hsl(',
                        random,
                        ',100%,0%)">The Credit Score is </text>',
                        '<text font-size="32" y="25%" x="50%"  text-anchor="middle" fill="hsl(',
                        random,
                        ',100%,0%)">Fund ID: ',
                        currentWord.fundId,
                        "</text>",
                        '<text font-size="100" y="70%" x="50%" text-anchor="middle" fill="hsl(',
                        random,
                        ',100%,0%)">',
                        currentWord.creditScore,
                        "</text>",
                        "</svg>"
                    )
                )
            );
    }

    function buildMetadata(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        Word memory currentWord = wordsToTokenId[_tokenId];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                currentWord.name,
                                '", "description":"',
                                currentWord.description,
                                '", "image": "',
                                "data:image/svg+xml;base64,",
                                buildImage(_tokenId),
                                '", "attributes": ',
                                "[",
                                '{"trait_type": "Issued by",',
                                '"value":"',
                                currentWord.issuer,
                                '"},',
                                '{"trait_type": "FundID",',
                                '"value":"',
                                currentWord.fundId,
                                '"},',
                                '{"trait_type": "Status",',
                                '"value":"',
                                currentWord.status,
                                '"},',
                                '{"trait_type": "Credit Score",',
                                '"value":"',
                                currentWord.creditScore,
                                '"}',
                                "]",
                                "}"
                            )
                        )
                    )
                )
            );
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        
        return buildMetadata(_tokenId);
    }

    //only owner
    function withdraw() public payable {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}