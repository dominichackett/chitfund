// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

interface ICreditScore {

    function mint(string memory _certifier, uint _fundId, string memory _status , uint _creditScore, address _applicant) external payable;
}