export const GambetAbi = [{"type":"constructor","inputs":[{"name":"_userA","type":"address","internalType":"address"},{"name":"_userB","type":"address","internalType":"address"},{"name":"_platformAddres","type":"address","internalType":"address"},{"name":"_usernameA","type":"string","internalType":"string"},{"name":"_usernameB","type":"string","internalType":"string"},{"name":"_reclaimAddress","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"function","name":"bet","inputs":[{"name":"_wager","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"end","inputs":[{"name":"_proof","type":"tuple","internalType":"struct Reclaim.Proof","components":[{"name":"claimInfo","type":"tuple","internalType":"struct Claims.ClaimInfo","components":[{"name":"provider","type":"string","internalType":"string"},{"name":"parameters","type":"string","internalType":"string"},{"name":"context","type":"string","internalType":"string"}]},{"name":"signedClaim","type":"tuple","internalType":"struct Claims.SignedClaim","components":[{"name":"claim","type":"tuple","internalType":"struct Claims.CompleteClaimData","components":[{"name":"identifier","type":"bytes32","internalType":"bytes32"},{"name":"owner","type":"address","internalType":"address"},{"name":"timestampS","type":"uint32","internalType":"uint32"},{"name":"epoch","type":"uint32","internalType":"uint32"}]},{"name":"signatures","type":"bytes[]","internalType":"bytes[]"}]}]}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"platformAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"proof","inputs":[],"outputs":[{"name":"claimInfo","type":"tuple","internalType":"struct Claims.ClaimInfo","components":[{"name":"provider","type":"string","internalType":"string"},{"name":"parameters","type":"string","internalType":"string"},{"name":"context","type":"string","internalType":"string"}]},{"name":"signedClaim","type":"tuple","internalType":"struct Claims.SignedClaim","components":[{"name":"claim","type":"tuple","internalType":"struct Claims.CompleteClaimData","components":[{"name":"identifier","type":"bytes32","internalType":"bytes32"},{"name":"owner","type":"address","internalType":"address"},{"name":"timestampS","type":"uint32","internalType":"uint32"},{"name":"epoch","type":"uint32","internalType":"uint32"}]},{"name":"signatures","type":"bytes[]","internalType":"bytes[]"}]}],"stateMutability":"view"},{"type":"function","name":"providersHashes","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"reclaimAddress","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"totalWager","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"userA","inputs":[],"outputs":[{"name":"user","type":"address","internalType":"address"},{"name":"won","type":"bool","internalType":"bool"},{"name":"username","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"userB","inputs":[],"outputs":[{"name":"user","type":"address","internalType":"address"},{"name":"won","type":"bool","internalType":"bool"},{"name":"username","type":"string","internalType":"string"}],"stateMutability":"view"}] as const;
export const GAMBET_FACTORY_ABI = [
    {
      "type": "function",
      "name": "deployGambet",
      "inputs": [
        {
          "name": "_userA",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_userB",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_platformAddres",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_usernameA",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_usernameB",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_reclaimAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_gameId",
          "type": "string",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "GambetDeployed",
      "inputs": [
        {
          "name": "gambetAddress",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    }
  ] as const;
  

export const GAMBET_ABI = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_userA",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_userB",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_platformAddres",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_usernameA",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_usernameB",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "_reclaimAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_gameId",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "bet",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "end",
      "inputs": [
        {
          "name": "_proof",
          "type": "tuple",
          "internalType": "struct Reclaim.Proof",
          "components": [
            {
              "name": "claimInfo",
              "type": "tuple",
              "internalType": "struct Claims.ClaimInfo",
              "components": [
                {
                  "name": "provider",
                  "type": "string",
                  "internalType": "string"
                },
                {
                  "name": "parameters",
                  "type": "string",
                  "internalType": "string"
                },
                {
                  "name": "context",
                  "type": "string",
                  "internalType": "string"
                }
              ]
            },
            {
              "name": "signedClaim",
              "type": "tuple",
              "internalType": "struct Claims.SignedClaim",
              "components": [
                {
                  "name": "claim",
                  "type": "tuple",
                  "internalType": "struct Claims.CompleteClaimData",
                  "components": [
                    {
                      "name": "identifier",
                      "type": "bytes32",
                      "internalType": "bytes32"
                    },
                    {
                      "name": "owner",
                      "type": "address",
                      "internalType": "address"
                    },
                    {
                      "name": "timestampS",
                      "type": "uint32",
                      "internalType": "uint32"
                    },
                    {
                      "name": "epoch",
                      "type": "uint32",
                      "internalType": "uint32"
                    }
                  ]
                },
                {
                  "name": "signatures",
                  "type": "bytes[]",
                  "internalType": "bytes[]"
                }
              ]
            }
          ]
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "gameId",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "platformAddress",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "proof",
      "inputs": [],
      "outputs": [
        {
          "name": "claimInfo",
          "type": "tuple",
          "internalType": "struct Claims.ClaimInfo",
          "components": [
            {
              "name": "provider",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "parameters",
              "type": "string",
              "internalType": "string"
            },
            {
              "name": "context",
              "type": "string",
              "internalType": "string"
            }
          ]
        },
        {
          "name": "signedClaim",
          "type": "tuple",
          "internalType": "struct Claims.SignedClaim",
          "components": [
            {
              "name": "claim",
              "type": "tuple",
              "internalType": "struct Claims.CompleteClaimData",
              "components": [
                {
                  "name": "identifier",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "owner",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "timestampS",
                  "type": "uint32",
                  "internalType": "uint32"
                },
                {
                  "name": "epoch",
                  "type": "uint32",
                  "internalType": "uint32"
                }
              ]
            },
            {
              "name": "signatures",
              "type": "bytes[]",
              "internalType": "bytes[]"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "providersHashes",
      "inputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "reclaimAddress",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalWager",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "userA",
      "inputs": [],
      "outputs": [
        {
          "name": "user",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "won",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "username",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "userB",
      "inputs": [],
      "outputs": [
        {
          "name": "user",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "won",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "username",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "view"
    }
  ] as const;

export const GAMBET_FACTORY_ADDRESS = "0x94d047D515DDe5b171cb7aD69C71F0d4Fcdc9213";


export const RECLAIM_PROTOCOL_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "id",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "timestampStart",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "timestampEnd",
						"type": "uint32"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "addr",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "host",
								"type": "string"
							}
						],
						"internalType": "struct Reclaim.Witness[]",
						"name": "witnesses",
						"type": "tuple[]"
					},
					{
						"internalType": "uint8",
						"name": "minimumWitnessesForClaimCreation",
						"type": "uint8"
					}
				],
				"indexed": false,
				"internalType": "struct Reclaim.Epoch",
				"name": "epoch",
				"type": "tuple"
			}
		],
		"name": "EpochAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "host",
						"type": "string"
					}
				],
				"internalType": "struct Reclaim.Witness[]",
				"name": "witnesses",
				"type": "tuple[]"
			},
			{
				"internalType": "uint8",
				"name": "requisiteWitnessesForClaimCreate",
				"type": "uint8"
			}
		],
		"name": "addNewEpoch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentEpoch",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "epochDurationS",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "epochs",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "id",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "timestampStart",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "timestampEnd",
				"type": "uint32"
			},
			{
				"internalType": "uint8",
				"name": "minimumWitnessesForClaimCreation",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "epoch",
				"type": "uint32"
			}
		],
		"name": "fetchEpoch",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "id",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "timestampStart",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "timestampEnd",
						"type": "uint32"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "addr",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "host",
								"type": "string"
							}
						],
						"internalType": "struct Reclaim.Witness[]",
						"name": "witnesses",
						"type": "tuple[]"
					},
					{
						"internalType": "uint8",
						"name": "minimumWitnessesForClaimCreation",
						"type": "uint8"
					}
				],
				"internalType": "struct Reclaim.Epoch",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "epoch",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "identifier",
				"type": "bytes32"
			},
			{
				"internalType": "uint32",
				"name": "timestampS",
				"type": "uint32"
			}
		],
		"name": "fetchWitnessesForClaim",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "host",
						"type": "string"
					}
				],
				"internalType": "struct Reclaim.Witness[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "provider",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "parameters",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "context",
								"type": "string"
							}
						],
						"internalType": "struct Claims.ClaimInfo",
						"name": "claimInfo",
						"type": "tuple"
					},
					{
						"components": [
							{
								"components": [
									{
										"internalType": "bytes32",
										"name": "identifier",
										"type": "bytes32"
									},
									{
										"internalType": "address",
										"name": "owner",
										"type": "address"
									},
									{
										"internalType": "uint32",
										"name": "timestampS",
										"type": "uint32"
									},
									{
										"internalType": "uint32",
										"name": "epoch",
										"type": "uint32"
									}
								],
								"internalType": "struct Claims.CompleteClaimData",
								"name": "claim",
								"type": "tuple"
							},
							{
								"internalType": "bytes[]",
								"name": "signatures",
								"type": "bytes[]"
							}
						],
						"internalType": "struct Claims.SignedClaim",
						"name": "signedClaim",
						"type": "tuple"
					}
				],
				"internalType": "struct Reclaim.Proof",
				"name": "proof",
				"type": "tuple"
			}
		],
		"name": "verifyProof",
		"outputs": [],
		"stateMutability": "view",
		"type": "function"
	}
] as const;