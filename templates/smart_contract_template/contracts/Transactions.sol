// smart_contract/contracts/Transactions.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Implement Smart Contract

contract Transactions {
    // Data structure for sending cryptocurrency
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
    }

    TransferStruct[] transactions;

    event Transfer(address from, address receiver, uint256 amount);

    function addToBlockChain(address payable receiver, uint256 amount) public {
        transactions.push(TransferStruct(msg.sender, receiver, amount));

        emit Transfer(msg.sender, receiver, amount);
    }
}
