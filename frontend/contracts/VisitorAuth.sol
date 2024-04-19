// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VisitorAuth {
    struct Visitor {
        string name;
        string email;
        string add;
        string phone;
        string purpose;
        string toMeet;
        string meetPersonemail;
        uint256 date;
    }

    mapping(address => Visitor) public visitors;

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
            toMeet: _toMeet,
            meetPersonemail: _meetPersonemail,
            date: _date
        });

        emit VisitorRegistered(msg.sender, _name, _date);
    }

    function getVisitor(
        address _visitorAddress
    ) public view returns (Visitor memory) {
        return visitors[_visitorAddress];
    }
}
