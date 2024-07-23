
pragma solidity ^0.8.0;

import "./JsonLib.sol";

library GambetUtils {
  
    function getContext(string memory json )public pure returns  (string memory gameId, string memory userA,string memory userB,string  memory result)  {
        uint returnValue;
		JsonLib.Token[] memory tokens;
		uint actualNum;
        
        (returnValue, tokens, actualNum) =  JsonLib.parse(json,19);
                uint gameIdx = _getTokenIndex(json, tokens,"URL_PARAMS_1_GRD", 0);

        gameId = JsonLib.getBytes(
			json,
			tokens[gameIdx].start,
			tokens[gameIdx].end
		);

        uint userAIdx = _getTokenIndex(json, tokens,"white_paper", 0);
        userA = JsonLib.getBytes(
            json,
            tokens[userAIdx].start,
            tokens[userAIdx].end
        );
        
        uint userBIdx = _getTokenIndex(json, tokens,"black_player", 0);
        userB = JsonLib.getBytes(
            json,
            tokens[userBIdx].start,
            tokens[userBIdx].end
        );

        uint resultIdx = _getTokenIndex(json, tokens,"result",0);
        result = JsonLib.getBytes(
            json,
            tokens[resultIdx].start,
            tokens[resultIdx].end
        );

       
        return  (gameId, userA, userB,result) ;


    }

    function _getTokenIndex(
		string memory str,
		JsonLib.Token[] memory tokens,
		string memory key,
		uint startIdx
	) private pure returns (uint returnIdx) {
		string memory keyStr;
		require(tokens[0].jsmnType == JsonLib.JsmnType.OBJECT, "Object expected");
		// iterate through keys
		for(uint i = startIdx + 1; i < tokens.length; i+= 2) {
			if(tokens[i].jsmnType != JsonLib.JsmnType.STRING) {
				continue;
			}
			keyStr = JsonLib.getBytes(str, tokens[i].start, tokens[i].end);
			
			if(JsonLib.strCompare(keyStr, key) == 0) {
				returnIdx = i+1;
				return returnIdx;
			}
		}

		require(false, "Key not found");
	}

}