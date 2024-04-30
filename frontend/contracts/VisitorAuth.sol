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
        string memory _date // Date in "DD-MM-YYYY" format
    ) public {
        lastVisitorId++;
        // Parse the date and store it in Unix timestamp format
        visitors[lastVisitorId] = Visitor({
            name: _name,
            email: _email,
            add: _address,
            phone: _phone,
            purpose: _purpose,
            types: _types,
            toMeet: _toMeet,
            meetPersonemail: _meetPersonemail,
            date: parseDate(_date)
        });
        // Emit an event for the registered visitor
        emit VisitorRegistered(lastVisitorId, _name, parseDate(_date));
    }

    // Internal function to parse date string to Unix timestamp
    function parseDate(string memory _date) private pure returns (uint256) {
        bytes memory dateBytes = bytes(_date);
        uint256 day = parseNumber(dateBytes[0]) *
            10 +
            parseNumber(dateBytes[1]);
        uint256 month = parseNumber(dateBytes[3]) *
            10 +
            parseNumber(dateBytes[4]);
        uint256 year = parseNumber(dateBytes[6]) *
            1000 +
            parseNumber(dateBytes[7]) *
            100 +
            parseNumber(dateBytes[8]) *
            10 +
            parseNumber(dateBytes[9]);
        return toUnixTimestamp(day, month, year);
    }

    // Internal function to parse individual characters to numbers
    function parseNumber(bytes1 _char) private pure returns (uint256) {
        return uint256(uint8(_char)) - 48; // ASCII '0' = 48
    }
    // Internal function to convert date components to Unix timestamp
    function toUnixTimestamp(
        uint256 _day,
        uint256 _month,
        uint256 _year
    ) private pure returns (uint256) {
        // Function implementation remains the same as in your contract
        // (I've omitted it here for brevity)
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
}
