//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Parking {
    uint256 parkingId=0;
    uint256 bookingId=0;

    struct ParkingStruct {
        address owner; uint256 parkingId; 
        string parkingName; string parkingAddress; string parkingCity; string parkingState; string parkingCountry;
        uint256 parkingCapacity; uint256 parkingAmount; string amountUnit;
        string parkingDetails; string vehicleType;
        uint256 timestamp;
    }
    
    ParkingStruct[] parkingList;

    function addParkingToBlockchain(
        string memory parkingName, 
        string memory parkingAddress, 
        string memory parkingCity, 
        string memory parkingState,
        string memory parkingCountry,
        uint256 parkingCapacity,
        uint256 parkingAmount,
        string memory amountUnit,
        string memory parkingDetails,
        string memory vehicleType
    ) public {
        parkingId += 1;
        parkingList.push(ParkingStruct(
            msg.sender, parkingId, 
            parkingName, parkingAddress, parkingCity, parkingState, parkingCountry,
            parkingCapacity, parkingAmount, amountUnit, 
            parkingDetails, vehicleType,
            block.timestamp
        ));
    }

    function getAllParkingList() public view returns (ParkingStruct[] memory) {
        return parkingList;
    }
}