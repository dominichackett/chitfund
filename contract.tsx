import {
  
    polygonMumbai,sepolia,avalancheFuji
  } from 'wagmi/chains';
export const chitFundAddress = "0x5817a990976259a8bdF5Bd4998aca797a7847Bf6"

 export const chitFundABI = ["function newChit(address[] memory _participants , uint _cycleCount, uint _frequency, uint _amount) public",
"function withdrawCycleAmount(uint _fundId, uint _cycleId) public",
"function makePayment(uint _fundId, uint _cycleId) public",
"function cycleWinner(uint _fundId) public",
"function checkForDefault(uint _fundId) public",
"function getIndexOfArray(address[] memory addressArray, address element) public pure returns(uint index)",
"function removeAddressFromQualified(uint _fundId, address element) public",
"event NewFund(uint indexed FundId,address[] Particpants,uint NumberOfCycles,uint AmountToBePaid,uint StartDate)"]





export const creditScoreAddress = "0xa32aa3b65cA289f58308Fce28457ADf74994763A"
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
    "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
    "function tokenURI(uint256 _tokenId) public view virtual override returns (string memory)"
  ]

export const usdcContractAddress = new Map([[polygonMumbai.id,"0x9e94358f4527bcd38770645cC74B1DfF065a54a8"]
,[sepolia.id,"0xa1A12162204A28b9e76Fcebd4066EFeC6C44B611"],[avalancheFuji.id,"0x9b47703A489107672A3C8D42Be787145cC86fE96"]])
export const usdcContractABI = ["function approve(address spender, uint256 amount) external returns (bool)"]

export const ccipPaymentContractAddress =new Map([
[sepolia.id,"0xDdE153f23E83489113E9Be6033dceE16E6fC7507"],[avalancheFuji.id,"0xC8165aBE224abf26fD8628D2E171C1FA12478CAB"]])
export const ccipPaymentContractABI = ["function sendMessage( string memory _userAddress, uint _fundId, uint _cycleId, uint _payAmount) public"]