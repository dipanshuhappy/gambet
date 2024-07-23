// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;


import "reclaim-contracts/Reclaim.sol";
import "./GambetUtils.sol";

contract Gambet {
    struct User {
        address user;
        bool won;
        string username;
    }

    User public userA;
    User public userB;

    uint256  public totalWager;

    address public platformAddress;

    address public reclaimAddress;

    string[] public providersHashes;

    string public gameId;

    Reclaim.Proof  public proof;

    constructor(address _userA, address _userB, address _platformAddres,string memory _usernameA, string memory _usernameB,address _reclaimAddress,string memory _gameId) {
        userA = User(_userA, false, _usernameA);
        userB = User(_userB, false, _usernameB);
        reclaimAddress = _reclaimAddress;
        platformAddress = _platformAddres;
        gameId = _gameId;
    }

    function bet() public payable {
        require(msg.sender == userA.user || msg.sender == userB.user, "Only userA or userB can bet");

        totalWager += msg.value;
    }

    function end(Reclaim.Proof memory _proof) public {
        Reclaim(reclaimAddress).verifyProof(_proof);
        (string memory _gameId, string memory _userA,string memory _userB,string  memory result) = GambetUtils.getContext(_proof.claimInfo.context);
        require(keccak256(abi.encodePacked(gameId)) == keccak256(abi.encodePacked(_gameId)), "GameId does not match");
        require(keccak256(abi.encodePacked(userA.username)) == keccak256(abi.encodePacked(_userA)), "UserA does not match");
        require(keccak256(abi.encodePacked(userB.username)) == keccak256(abi.encodePacked(_userB)), "UserB does not match");
        if(keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked("1-0"))){
            userA.won = true;
            payable(userA.user).transfer(totalWager);
        }
        else if(keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked("0-1"))){
            userB.won = true;
            payable(userB.user).transfer(totalWager);
        }
        else {
            uint half = totalWager / 2;
            payable(userA.user).transfer(half);
            payable(userB.user).transfer(half);
        }
        
    }

    receive() external payable {
        bet();
    }
}
