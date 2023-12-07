// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;


//import '@openzeppelin/contracts/access/Ownable.sol';
//import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./strings.sol";
import "./Messenger.sol";
import "./RandomNumber.sol";
import "./ICreditScore.sol";


contract ChitFund   {
    using strings for *;

    uint fundId = 100000;
    IERC20 USDC ;
    Messenger messenger;
    RandomNumber RN;
    ICreditScore CS;
    string[] public parts;
    bool public n;
    uint256 public requestId ;
    uint256[] public _num;





    struct FundDetail {
        address[] participants;
        uint countOfParticpants;
        uint numberOfCycles;
        uint frequency; //7 for weekly; 30 for monthly
        uint payAmount;
        uint balance;
        uint startDate; // in Unix timestamp 

    }

    struct WinnerDetails {
        address cycleWinner;
        uint amount;
        uint withdrawnAmount;
    }

    event NewFund(
        uint indexed FundId,
        address[] Particpants,
        uint NumberOfCycles,
        uint AmountToBePaid,
        uint StartDate

    );

    event AmountDisbursed(
        uint indexed FundId,
        uint indexed CycleId,
        address indexed withdrawer,
        uint TotalAmountDrawn,
        uint CurrentAmountDrawn
    );

    event PaymentMade (

        uint indexed FundId,
        uint indexed CycleId,
        address indexed Payer,
        uint AmountPaid
        
    );

    event WinnerOfCyclePot(

        uint indexed FundId,
        uint indexed CycleId,
        address indexed Payer,
        uint AmountPaid

    );

    mapping(uint => FundDetail) public fundDetails;
    mapping(uint => mapping(address => uint)) public paymentDetails;
    mapping(uint => address[]) public defaulters;
    mapping(uint => address[]) public qualified;
    mapping(uint =>mapping(uint =>WinnerDetails)) public cycleDetails;


    function addUSDCAddress(address _tokenAddress) public {

        USDC = IERC20(_tokenAddress);

    }

    function addMessengerAddress(address payable _Address) public {

        messenger = Messenger(_Address);

    }

    function addRNAddress(address payable _Address) public {

        RN = RandomNumber(_Address);

    }

    function addCSAddress(address payable _Address) public {

        CS = ICreditScore(_Address);

    }





    function newChit(address[] memory _participants , uint _cycleCount, uint _frequency, uint _amount) public {

        fundId++;
        fundDetails[fundId] = FundDetail(_participants, _participants.length, _cycleCount, _frequency, _amount, 0, block.timestamp);
        qualified[fundId] = _participants;

        for (uint i = 0; i < _participants.length; i++) {

            paymentDetails[fundId][_participants[i]] = 0;

        }

        emit NewFund(fundId,_participants,_cycleCount,_amount,block.timestamp );

    }

    function withdrawCycleAmount(uint _fundId, uint _cycleId) public {
        require(cycleDetails[_fundId][_cycleId].cycleWinner == msg.sender);
        require(cycleDetails[_fundId][_cycleId].amount > cycleDetails[_fundId][_cycleId].withdrawnAmount);
        USDC.transferFrom( address(this), msg.sender, cycleDetails[_fundId][_cycleId].amount - cycleDetails[_fundId][_cycleId].withdrawnAmount);
        cycleDetails[_fundId][_cycleId].withdrawnAmount = cycleDetails[_fundId][_cycleId].amount;

        emit AmountDisbursed(_fundId,_cycleId,msg.sender, cycleDetails[_fundId][_cycleId].amount, (cycleDetails[_fundId][_cycleId].amount - cycleDetails[_fundId][_cycleId].withdrawnAmount) );

    }

    function makePayment(uint _fundId, uint _cycleId) public {

        require(USDC.balanceOf(msg.sender) >= fundDetails[_fundId].payAmount, "Insufficient Balance");
        USDC.transferFrom(msg.sender, address(this), fundDetails[fundId].payAmount);
        fundDetails[_fundId].balance += fundDetails[_fundId].payAmount;
        paymentDetails[_fundId][msg.sender] += fundDetails[_fundId].payAmount; 
        cycleDetails[_fundId][_cycleId].amount += fundDetails[_fundId].payAmount;   

        emit PaymentMade(_fundId,_cycleId,msg.sender,fundDetails[_fundId].payAmount);

    }

    function getCrossChainMessage() internal {
        (, string memory message) = messenger.getLastReceivedMessageDetails();
        strings.slice memory s = message.toSlice();
        strings.slice memory  delim = " ".toSlice();
        parts = new string[](s.count(delim)+1); 

        for(uint i = 0; i < parts.length; i++) {
            parts[i] = s.split(delim).toString();
        }

   }

   function getCrossChainPayment() public {

        getCrossChainMessage();
        address _sender = address(bytes20(bytes(parts[0])));
        uint _fundId = stringToUint(parts[1]);
        uint _cycleId = stringToUint(parts[2]);
        uint _payAmount = stringToUint(parts[3]);

        fundDetails[_fundId].balance += _payAmount;
        paymentDetails[_fundId][_sender] += _payAmount; 
        cycleDetails[_fundId][_cycleId].amount += _payAmount;   

        emit PaymentMade(_fundId,_cycleId,_sender,_payAmount);

   }

    

    function cycleWinner(uint _fundId) public {

        uint len = qualified[_fundId].length;
        uint currentCycle = (fundDetails[_fundId].startDate - block.timestamp) / 60 / 60 / 24 / fundDetails[_fundId].frequency;
        require(cycleDetails[_fundId][currentCycle].cycleWinner == address(0), 'Winner Declared Already');
        checkForDefault(_fundId);
        uint winningIndex = randomIndex(len);
        cycleDetails[_fundId][currentCycle].cycleWinner = qualified[_fundId][winningIndex];
        removeAddressFromQualified(_fundId,qualified[_fundId][winningIndex] );

        emit WinnerOfCyclePot(_fundId,currentCycle,qualified[_fundId][winningIndex],cycleDetails[_fundId][currentCycle].amount );

        
    }

    function randomIndex(uint _number) public returns( uint _rnumber) {

        
        n = false;
          
        requestId = RN.lastRequestId();
        (, n, _num) = RN.getRequestStatus(requestId);
        if( n == true ) {
            _rnumber = _num[0] % _number;    
        }  else {
            _rnumber = requestId % _number;
        }
        
        return _rnumber;



    }

    function checkForDefault(uint _fundId) public {

        uint currentCycle = (fundDetails[_fundId].startDate - block.timestamp) / 60 / 60 / 24 / fundDetails[_fundId].frequency;

        for(uint i; i < fundDetails[_fundId].participants.length; i++) {

            if(paymentDetails[_fundId][fundDetails[_fundId].participants[i]] < currentCycle * fundDetails[_fundId].payAmount) {

                defaulters[_fundId].push(fundDetails[_fundId].participants[i]);
                removeAddressFromQualified(_fundId, fundDetails[_fundId].participants[i]);
                mintCreditScoreDetails(_fundId, "Defaulted" , fundDetails[_fundId].participants[i]);
            }

        }

    }

    function getIndexOfArray(address[] memory addressArray, address element) public pure returns(uint index) {

        for(uint i=0; i < addressArray.length; i++) {

            if( element == addressArray[i] ) {

                return i;
                
            } 

        }

        return addressArray.length;
    }

    function removeAddressFromQualified(uint _fundId, address element) public {

        uint index = getIndexOfArray( qualified[_fundId], element);

        if( index < qualified[_fundId].length) {

            qualified[_fundId][index] = qualified[_fundId][qualified[_fundId].length - 1];
            qualified[_fundId].pop();

        }
    }


    function mintCreditScoreDetails(uint _fundId, string memory _status, address _applicant) public {

        uint currentCycle = (fundDetails[_fundId].startDate - block.timestamp) / 60 / 60 / 24 / fundDetails[_fundId].frequency;
        require(currentCycle >= fundDetails[_fundId].numberOfCycles , "Fund is not yet closed");

        if(getIndexOfArray(defaulters[_fundId], _applicant) < defaulters[_fundId].length) {
            _status = "Defaulted";
        }

        if(compareStrings(_status, "Defaulted")) {
            CS.mint("Chit Fund", _fundId, _status , 0,  _applicant);

        }   else if (compareStrings(_status, "Completed")) {
            CS.mint("Chit Fund", _fundId, _status , 100,  _applicant);
        }

    }

    function stringToUint(string memory s) public pure returns (uint result) {
        bytes memory b = bytes(s);
        for (uint i = 0; i < b.length; i++) { // c = b[i] was not needed
            if (uint(uint8(b[i])) >= 48 && uint(uint8(b[i])) <= 57) {
            result = result * 10 + (uint(uint8(b[i])) - 48); // bytes and int are not compatible with the operator -.
            }
        }
        return result;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
    
}