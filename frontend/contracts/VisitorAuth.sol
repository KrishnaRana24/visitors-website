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

    mapping(address => Visitor) public visitors;
    address[] public visitorAddresses; // Store visitor addresses separately for easy retrieval

    event VisitorRegistered(
        address indexed visitorAddress,
        string name,
        uint256 date
    );

    function registerVisitor(
        string memory _name,
        string memory _email,
        string memory _address,
        string memory _phone,
        string memory _purpose,
        string memory _types,
        string memory _toMeet,
        string memory _meetPersonemail,
        uint256 _date
    ) public {
        visitors[msg.sender] = Visitor({
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
        visitorAddresses.push(msg.sender);
        emit VisitorRegistered(msg.sender, _name, _date);
    }

    function getVisitor(
        address _visitorAddress
    ) public view returns (Visitor memory) {
        return visitors[_visitorAddress];
    }

    function getAllVisitors() public view returns (Visitor[] memory) {
        Visitor[] memory allVisitors = new Visitor[](visitorAddresses.length);
        for (uint256 i = 0; i < visitorAddresses.length; i++) {
            allVisitors[i] = visitors[visitorAddresses[i]];
        }
        return allVisitors;
    }
}
