export interface Clan {
    tag: string;
    name: string;
    badgeId: number;
}

export interface Arena {
    id: number;
    name: string;
}

export interface CurrentSeason {
    trophies: number;
    bestTrophies: number;
}

export interface PreviousSeason {
    id: string;
    trophies: number;
    bestTrophies: number;
}

export interface BestSeason {
    id: string;
    trophies: number;
}

export interface LeagueStatistics {
    currentSeason: CurrentSeason;
    previousSeason: PreviousSeason;
    bestSeason: BestSeason;
}

export interface Badge {
    name: string;
    progress: number;
}

export interface Achievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo?: any;
}

export interface IconUrls {
    medium: string;
}

export type Level = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;
export type MaxLevel = 14 | 12 | 9 | 6 | 4;
export interface Card {
    name: string;
    id: number;
    level: Level;
    maxLevel: MaxLevel;
    count: number;
    iconUrls: IconUrls;
}

export interface CurrentFavouriteCard {
    name: string;
    id: number;
    maxLevel: number;
    iconUrls: IconUrls;
}

export interface PlayerData {
    tag: string;
    name: string;
    expLevel: number;
    trophies: number;
    bestTrophies: number;
    wins: number;
    losses: number;
    battleCount: number;
    threeCrownWins: number;
    challengeCardsWon: number;
    challengeMaxWins: number;
    tournamentCardsWon: number;
    tournamentBattleCount: number;
    role?: string;
    donations: number;
    donationsReceived: number;
    totalDonations: number;
    warDayWins: number;
    clanCardsCollected: number;
    clan?: Clan;
    arena: Arena;
    leagueStatistics?: LeagueStatistics;
    badges: Badge[];
    achievements: Achievement[];
    cards: Card[];
    currentDeck: Card[];
    currentFavouriteCard?: CurrentFavouriteCard;
}
