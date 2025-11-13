export enum TeamName {
  INNERFOOT = 'Innerfoot',
  SOUTHERN_SKILLERS = 'Southern Skillers',
  SUPA_STRIKAS = 'Supa Strikas',
  TOXIC = 'Toxic'
}

export enum PlayerPosition {
  GK = 'GK',
  DF = 'DF',
  MF = 'MF',
  FW = 'FW'
}

export enum Role {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
  VIEWER = 'VIEWER'
}

export interface Team {
  name: TeamName
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string[]
  rating: number
}

export interface Player {
  id: string
  name: string
  team: TeamName
  position: PlayerPosition
  stats: {
    gamesPlayed: number
    goals: number
    assists: number
    cleanSheets: number
    rating: {
      overall: number
    }
  }
}

export interface ScorerInfo {
  name: string
  assist: string
  og: boolean
}

export interface Fixture {
  teamA: TeamName
  scoreA: number | null
  teamB: TeamName
  scoreB: number | null
  status: 'FT' | 'UPCOMING'
  date: string
  motm?: string
  scorersA: ScorerInfo[]
  scorersB: ScorerInfo[]
}

export interface User {
  id: string
  name: string
  role: Role
}