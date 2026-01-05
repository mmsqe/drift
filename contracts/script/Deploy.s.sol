// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Drift} from "../src/Drift.sol";

contract DeployScript is Script {
    function run() public returns (Drift) {
        vm.startBroadcast();

        Drift drift = new Drift();
        console.log("Drift deployed at:", address(drift));

        vm.stopBroadcast();

        return drift;
    }
}
