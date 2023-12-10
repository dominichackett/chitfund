
## Powered by Chainlink

![Chainlink](https://github.com/dominichackett/chitfund/blob/master/images/chainlink.png)

### Chainlink VRF

In our chit fund, we have integrated Chainlink VRF (Verifiable Random Function) to ensure a fair and transparent distribution of funds to participants. Using this decentralized oracle service, we obtain random numbers that are cryptographically proven to be unbiased. During each distribution cycle, the smart contract requests a random number from Chainlink VRF, and the resulting randomness is utilized to impartially select the winning participant. This implementation enhances trust and transparency in the chit fund, assuring participants that fund distribution is conducted in a decentralized and tamper-resistant manner.

VRF Code   [Click to view code](https://github.com/dominichackett/chitfund/blob/ef83b56ce1eb69a08c68c4334268dcc7af9ee725/contracts/RandomNumber.sol#L19) for more details.

VRF Usage  [Click to view code](https://github.com/dominichackett/chitfund/blob/ef83b56ce1eb69a08c68c4334268dcc7af9ee725/contracts/chitFund.sol#L205C1-L205C1) for more details.


### CCIP 
Core smart contract is deployed in the Polygon Mumbai network with an option to receive payments from _Avalanche Fuji_ network and Sepolia via **CCIP**. Since stablecoins are used for payments, corresponding smart contracts in Fuji and Sepolia receive the payment and send only the confirmation message to the Core smart contract Mumbai. 

CCIP Code   [Click to view code](https://github.com/dominichackett/chitfund/blob/ef83b56ce1eb69a08c68c4334268dcc7af9ee725/contracts/Messenger.sol#L17) for more details.

CCIP Usage  [Click to view code](https://github.com/dominichackett/chitfund/blob/ef83b56ce1eb69a08c68c4334268dcc7af9ee725/contracts/Payer.sol#L38) for more details.

CCIP Usage  [Click to view code](https://github.com/dominichackett/chitfund/blob/ef83b56ce1eb69a08c68c4334268dcc7af9ee725/contracts/chitFund.sol#L156) for more details.



### Chainlink Automation

A **chainlink automation** job **CCMChecker** checks for any CCIP message every 15 minutes to trigger the payment update in the Core smart contract for all the chit funds created. Also, there are fund-specific automation jobs such as **FUNDID100001** which run as per the payment frequency of the Fund to check defaults and to select the winner of the lumpsum payments.

