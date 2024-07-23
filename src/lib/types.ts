export interface GameCallbackType {
    game: Game;
    players: Players;
  }
  interface Players {
    top: Top;
    bottom: Top;
  }
  interface Top {
    uuid: string;
    isContentHidden: boolean;
    id: number;
    isComputer: boolean;
    avatarUrl: string;
    countryId: number;
    isEnabled: boolean;
    canWinOnTime: boolean;
    color: string;
    countryName: string;
    defaultTab: number;
    hasMovedAtLeastOnce: boolean;
    isDrawable: boolean;
    isOnline: boolean;
    isInLivechess: boolean;
    isTouchMove: boolean;
    isVacation: boolean;
    isWhiteOnBottom: boolean;
    lastLoginDate: number;
    membershipLevel: number;
    membershipCode: string;
    memberSince: number;
    postMoveAction: string;
    rating: number;
    turnTimeRemaining: string;
    flairCode: string;
    username: string;
    vacationRemaining: string;
    gamesInProgress: number;
    friendRequestSent: boolean;
    friendRequestReceived: boolean;
    isBlocked: boolean;
    isFriend: boolean;
  }
  interface Game {
    canSendTrophy: boolean;
    changesPlayersRating: number;
    colorOfWinner: string;
    id: number;
    uuid: string;
    initialSetup: string;
    isLiveGame: boolean;
    isAbortable: boolean;
    isAnalyzable: boolean;
    isCheckmate: boolean;
    isStalemate: boolean;
    isFinished: boolean;
    isRated: boolean;
    isResignable: boolean;
    lastMove: string;
    moveList: string;
    plyCount: number;
    ratingChangeWhite: number;
    ratingChangeBlack: number;
    gameEndReason: string;
    resultMessage: string;
    endTime: number;
    turnColor: string;
    type: string;
    typeName: string;
    allowVacation: boolean;
    pgnHeaders: PgnHeaders;
    moveTimestamps: string;
    baseTime1: number;
    timeIncrement1: number;
  }
  interface PgnHeaders {
    Event: string;
    Site: string;
    Date: string;
    White: string;
    Black: string;
    Result: string;
    ECO: string;
    WhiteElo: number;
    BlackElo: number;
    TimeControl: string;
    EndTime: string;
    Termination: string;
    SetUp: string;
    FEN: string;
  }