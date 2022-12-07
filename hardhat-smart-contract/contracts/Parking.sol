//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Parking {
    uint256 parkingId=0;
    uint256 bookingId=0;

    // Parking Create Section
    struct ParkingStruct {
        address owner; uint256 parkingId; 
        string parkingName; string parkingAddress; string parkingCity; string parkingState; string parkingCountry; string parkingZipCode;
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
        string memory parkingZipCode,
        uint256 parkingCapacity,
        uint256 parkingAmount,
        string memory amountUnit,
        string memory parkingDetails,
        string memory vehicleType
    ) public {
        parkingId += 1;
        parkingList.push(ParkingStruct(
            msg.sender, parkingId, 
            parkingName, parkingAddress, parkingCity, parkingState, parkingCountry, parkingZipCode,
            parkingCapacity, parkingAmount, amountUnit, 
            parkingDetails, vehicleType,
            block.timestamp
        ));
    }

    function getAllParkingList() public view returns (ParkingStruct[] memory) {
        return parkingList;
    }

    // Booking Transaction Part
    event Transfer(address form, string senderName, address receiver, uint256 amount, uint256 timestamp);
   
    // Parking Booking Section

    struct ParkingBookingStruct {
        address bookingOwner; address parkingOwner; uint256 bookingId; 
        string parkingName; string parkingAddress; uint256 parkingsId; uint256 bookingHour; uint256 parkingCharge;
        string parkingFor; string vehicleRegistrationNo; string bookingBy; string idType; string idCardNumber; 
        uint256 timestamp;
    }
    ParkingBookingStruct[] bookingDataList;

    function addBookingToBlockchain(
        address payable parkingOwner, 
        string memory parkingName, string memory parkingAddress, uint256 parkingsId, uint256 bookingHour, uint256 parkingCharge,
        string memory parkingFor, string memory vehicleRegistrationNo, string memory bookingBy, string memory idType, string memory idCardNumber
    ) public {
        bookingId += 1;
        bookingDataList.push(ParkingBookingStruct(
            msg.sender, parkingOwner, bookingId,
            parkingName, parkingAddress, parkingsId, bookingHour, parkingCharge, 
            parkingFor, vehicleRegistrationNo, bookingBy, idType, idCardNumber,
            block.timestamp
        ));
        emit Transfer(msg.sender, bookingBy, parkingOwner, parkingCharge, block.timestamp);
    }

    function getAllBookingList() public view returns (ParkingBookingStruct[] memory) {
        return bookingDataList;
    }
    
}