// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import "./Gambet.sol";


contract GambetFactory {
    event GambetDeployed(address indexed gambetAddress);
    function deployGambet(address _userA, address _userB, address _platformAddres,string memory _usernameA, string memory _usernameB,address _reclaimAddress,string memory _gameId) public returns (address) {
        Gambet gambet =  new Gambet(_userA, _userB, _platformAddres, _usernameA, _usernameB, _reclaimAddress, _gameId);
        emit GambetDeployed(address(gambet));
        return address(gambet);
    }
}