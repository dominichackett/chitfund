import {
  
    polygonMumbai,sepolia,baseGoerli,optimismGoerli
  } from 'wagmi/chains';
export const chitFundAddress = ""

 export const chitFundABI = ["function newChit(address[] memory _participants , uint _cycleCount, uint _frequency, uint _amount) public",
"function withdrawCycleAmount(uint _fundId, uint _cycleId) public",
"function makePayment(uint _fundId, uint _cycleId) public",
"function cycleWinner(uint _fundId) public",
"function checkForDefault(uint _fundId) public",
"function getIndexOfArray(address[] memory addressArray, address element) public pure returns(uint index)",
"function removeAddressFromQualified(uint _fundId, address element) public",
"event NewFund(uint indexed FundId,address[] Particpants,uint NumberOfCycles,uint AmountToBePaid,uint StartDate)"]





export const creditScoreAddress = "0x62e8c0Bd049b68f0b5845FF8b6C67d3A187D7894"
export const creditScoreABI = [
    "function balanceOf(address owner) external view returns (uint256)",
    "function ownerOf(uint256 tokenId) external view returns (address)",
    "function approve(address to, uint256 tokenId) external",
    "function getApproved(uint256 tokenId) external view returns (address)",
    "function setApprovalForAll(address operator, bool approved) external",
    "function isApprovedForAll(address owner, address operator) external view returns (bool)",
    "function transferFrom(address from, address to, uint256 tokenId) external",
    "function safeTransferFrom(address from, address to, uint256 tokenId) external",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) external",
    "function totalSupply() external view returns (uint256)",
    "function tokenByIndex(uint256 index) external view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)"
  ]

export const usdcContractAddress = new Map([[polygonMumbai.id,"0xD238246168278E2dE843b573f9Ff04db8c22f1aC"]
,[sepolia.id,"0x564a4aC7716F9c5540E0afE163391146e99AA10d"],[baseGoerli.id,"0x8d5862b0568A2d644be4C406bf6763C025dd8535"],[optimismGoerli.id,"0x64C5668B710E751D4C0F068cf6D45FF07fFdB32a"]
])
export const usdcContractABI = []

export const ccipPaymentContractAddress = new Map([[polygonMumbai.id,"0xD238246168278E2dE843b573f9Ff04db8c22f1aC"]
,[sepolia.id,"0x564a4aC7716F9c5540E0afE163391146e99AA10d"],[baseGoerli.id,"0x8d5862b0568A2d644be4C406bf6763C025dd8535"],[optimismGoerli.id,"0x64C5668B710E751D4C0F068cf6D45FF07fFdB32a"]
])

export const ccipPaymentContractABI = []