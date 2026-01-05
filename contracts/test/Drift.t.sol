// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Drift} from "../src/Drift.sol";

contract DriftTest is Test {
    Drift public drift;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        drift = new Drift();
    }

    function test_CastMessage() public {
        vm.prank(alice);
        drift.castMessage("Hello from the ocean");

        assertEq(drift.getMessageCount(), 1);
    }

    function test_CastMessageEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit Drift.MessageCast(0, block.timestamp);

        vm.prank(alice);
        drift.castMessage("Testing events");
    }

    function test_CastMessageRevertsOnEmpty() public {
        vm.prank(alice);
        vm.expectRevert(Drift.EmptyMessage.selector);
        drift.castMessage("");
    }

    function test_FindBottle() public {
        vm.prank(alice);
        drift.castMessage("Message in a bottle");

        vm.prank(bob);
        (string memory content, uint256 timestamp) = drift.findBottle(12345);

        assertEq(content, "Message in a bottle");
        assertEq(timestamp, block.timestamp);
    }

    function test_FindBottleRevertsWhenEmpty() public {
        vm.prank(alice);
        vm.expectRevert(Drift.NoMessages.selector);
        drift.findBottle(12345);
    }

    function test_MultipleMessages() public {
        vm.prank(alice);
        drift.castMessage("First message");

        vm.prank(bob);
        drift.castMessage("Second message");

        vm.prank(alice);
        drift.castMessage("Third message");

        assertEq(drift.getMessageCount(), 3);
    }

    function test_RandomnessVariation() public {
        // Cast multiple messages
        for (uint i = 0; i < 10; i++) {
            vm.prank(makeAddr(string(abi.encodePacked("user", i))));
            drift.castMessage(string(abi.encodePacked("Message ", i)));
        }

        // Find bottles with different seeds should potentially return different messages
        vm.prank(alice);
        (string memory content1,) = drift.findBottle(1);

        vm.prank(alice);
        (string memory content2,) = drift.findBottle(2);

        // With 10 messages and different seeds, it's highly likely we get different results
        // (not guaranteed, but a good sanity check)
        assertTrue(
            keccak256(bytes(content1)) != keccak256(bytes(content2)) ||
            drift.getMessageCount() == 1,
            "Different seeds should likely return different messages"
        );
    }

    function test_MessageCount() public {
        assertEq(drift.getMessageCount(), 0);

        vm.prank(alice);
        drift.castMessage("One");
        assertEq(drift.getMessageCount(), 1);

        vm.prank(bob);
        drift.castMessage("Two");
        assertEq(drift.getMessageCount(), 2);
    }
}
