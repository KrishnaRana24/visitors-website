// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VisitorAuth {
    struct Visitor {
        string name;
        string email;
        string add;
        string phone;
        string purpose;
        string types;
        string toMeet;
        string meetPersonemail;
        uint256 date;
    }

    mapping(uint256 => Visitor) public visitors;
    uint256 public lastVisitorId = 0;

    event VisitorRegistered(
        uint256 indexed visitorId,
        string name,
        uint256 date
    );

    // Function to register a visitor
    function registerVisitor(
        string memory _name,
        string memory _email,
        string memory _address,
        string memory _phone,
        string memory _purpose,
        string memory _types,
        string memory _toMeet,
        string memory _meetPersonemail,
        uint256 _date // Date in "DD-MM-YYYY" format
    ) public payable {
        require(msg.value > 0, "Value must be greater than 0");
        lastVisitorId++;
        visitors[lastVisitorId] = Visitor({
            name: _name,
            email: _email,
            add: _address,
            phone: _phone,
            purpose: _purpose,
            types: _types,
            toMeet: _toMeet,
            meetPersonemail: _meetPersonemail,
            date: _date
        });
        // Emit an event for the registered visitor
        emit VisitorRegistered(lastVisitorId, _name, _date);
    }

    // Function to retrieve a visitor by ID
    function getVisitor(
        uint256 _visitorId
    ) public view returns (Visitor memory) {
        return visitors[_visitorId];
    }

    // Function to retrieve all visitors
    function getAllVisitors() public view returns (Visitor[] memory) {
        Visitor[] memory allVisitors = new Visitor[](lastVisitorId);
        for (uint256 i = 1; i <= lastVisitorId; i++) {
            allVisitors[i - 1] = visitors[i];
        }
        return allVisitors;
    }

    // Function to calculate total visitors by month
    function getTotalVisitorsByMonth(
        uint256 _month
    ) public view returns (uint256) {
        uint256 totalVisitors = 0;
        Visitor[] memory allVisitors = getAllVisitors();
        for (uint256 i = 1; i < lastVisitorId; i++) {
            if (getMonth(allVisitors[i].date) == _month) {
                totalVisitors++;
            }
        }
        return totalVisitors;
    }

    // Function to calculate total visitors by week
    function getTotalVisitorsByWeek(
        uint256 _week
    ) public view returns (uint256) {
        uint256 totalVisitors = 0;
        Visitor[] memory allVisitors = getAllVisitors();
        for (uint256 i = 1; i < lastVisitorId; i++) {
            if (getWeek(allVisitors[i].date) == _week) {
                totalVisitors++;
            }
        }
        return totalVisitors;
    }

    // Internal function to extract month from Unix timestamp
    function getMonth(uint256 _timestamp) internal pure returns (uint256) {
        return ((_timestamp / 86400) + 4) % 7;
    }

    // Internal function to extract week from Unix timestamp
    function getWeek(uint256 _timestamp) internal pure returns (uint256) {
        return ((_timestamp / 86400) + 4) % 52;
    }
}
