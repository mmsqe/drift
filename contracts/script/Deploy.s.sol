// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Drift} from "../src/Drift.sol";

contract DeployScript is Script {
    // Fixed salt for deterministic CREATE2 deployment
    bytes32 constant SALT = bytes32(uint256(0x1));

    function run() public returns (Drift) {
        vm.startBroadcast();

        // CREATE2 deployment for deterministic address
        Drift drift = new Drift{salt: SALT}();
        console.log("Drift deployed at:", address(drift));

        vm.stopBroadcast();

        return drift;
    }
}
