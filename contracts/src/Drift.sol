// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Drift - Onchain Message in a Bottle
/// @notice Cast anonymous messages into the digital ocean and discover bottles from strangers
contract Drift {
    struct Message {
        string content;
        uint256 timestamp;
        address author;
    }

    Message[] public messages;

    event MessageCast(uint256 indexed id, uint256 timestamp);

    error NoMessages();
    error EmptyMessage();

    /// @notice Cast a message into the ocean
    /// @param content The message content
    function castMessage(string calldata content) external {
        if (bytes(content).length == 0) revert EmptyMessage();

        uint256 id = messages.length;
        messages.push(Message({
            content: content,
            timestamp: block.timestamp,
            author: msg.sender
        }));

        emit MessageCast(id, block.timestamp);
    }

    /// @notice Find a random bottle from another wanderer
    /// @param seed A random seed from the caller for additional entropy
    /// @return content The message content
    /// @return timestamp When the message was cast
    function findBottle(uint256 seed) external view returns (string memory content, uint256 timestamp) {
        if (messages.length == 0) revert NoMessages();

        uint256 index = uint256(
            keccak256(abi.encodePacked(seed, block.prevrandao, msg.sender, block.timestamp))
        ) % messages.length;

        Message storage message = messages[index];
        return (message.content, message.timestamp);
    }

    /// @notice Get the total number of messages in the ocean
    function getMessageCount() external view returns (uint256) {
        return messages.length;
    }
}
