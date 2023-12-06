// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./Messenger.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Payer {

    uint64 destinationChainSelector = 12532609583862916517 ;//polygon
    address receiver = 0x26FbB9527F00F391B4e75F3010A5223242383BD4 ; 
    Messenger messenger;
    IERC20 USDC;
    

    function addMessengerAddress(address payable _Address) public {

        messenger = Messenger(_Address);

    }

    function addUSDCAddress(address _tokenAddress) public {

        USDC = IERC20(_tokenAddress);

    }

    function sendMessage( string memory _userAddress, uint _fundId, uint _cycleId, uint _payAmount) public { 

        require(USDC.balanceOf(msg.sender) >= _payAmount, "Insufficient Balance");
        USDC.transferFrom(msg.sender, address(this), _payAmount);

        string memory sFundId = Strings.toString(_fundId);
        string memory sCycleId = Strings.toString(_cycleId);
        string memory sPayAmount = Strings.toString(_payAmount);

        string memory messageText = string.concat(_userAddress, " ", sFundId, " ", sCycleId ," ",sPayAmount);

        messenger.sendMessagePayLINK(destinationChainSelector, receiver, messageText);





    }

    
}


