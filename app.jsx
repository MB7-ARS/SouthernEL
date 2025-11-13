import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import PlayerDashboard from './components/PlayerDashboard'
import { Team, TeamName, Player, Fixture, User, Role, PlayerPosition } from './types'

// Mock data - replace with your actual data
const mockTeams: Team[] = [
  {
    name: TeamName.INNERFOOT,
    played: 0, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0,
    form: [], rating: 85
  },
  {
    name: TeamName.SOUTHERN_SKILLERS,
    played: 0, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0,
    form: [], rating: 87
  },
  {
    name: TeamName.SUPA_STRIKAS,
    played: 0, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0,
    form: [], rating: 82
  },
  {
    name: TeamName.TOXIC,
    played: 0, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0,
    form: [], rating: 80
  }
]

const mockPlayers: Player[] = [
  {
    id: '1', name: 'John Smith', team: TeamName.INNERFOOT,
    position: PlayerPosition.GK,
    stats: { gamesPlayed: 0, goals: 0, assists: 0, cleanSheets: 0, rating: { overall: 85 } }
  },
  {
    id: '2', name: 'Mike Johnson', team: TeamName.SOUTHERN_SKILLERS,
    position: PlayerPosition.FW,
    stats: { gamesPlayed: 0, goals: 0, assists: 0, cleanSheets: 0, rating: { overall: 87 } }
  }
]

const mockFixtures: Fixture[] = []
const mockUpcomingFixtures: Fixture[] = []

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedTeam, setSelectedTeam] = useState<TeamName | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1', name: 'Admin', role: Role.ADMIN
  })

  const handleSelectTeam = (teamName: TeamName) => {
    setSelectedTeam(teamName)
    setCurrentView('team')
  }

  const handleRecalculateRatings = () => {
    // Implement rating calculation logic
    console.log('Recalculating ratings...')
  }

  const handleOpenFixtureManager = (fixture?: Fixture) => {
    // Implement fixture manager logic
    console.log('Opening fixture manager...')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {currentView === 'dashboard' && (
        <Dashboard
          onSelectTeam={handleSelectTeam}
          teams={mockTeams}
          players={mockPlayers}
          fixtures={mockFixtures}
          upcomingFixtures={mockUpcomingFixtures}
          currentUser={currentUser}
          onRecalculateRatings={handleRecalculateRatings}
          onOpenFixtureManager={handleOpenFixtureManager}
        />
      )}
      
      {currentView === 'player' && currentUser && (
        <PlayerDashboard
          player={mockPlayers[0]}
          allPlayers={mockPlayers}
          teams={mockTeams}
          fixtures={mockFixtures}
          upcomingFixtures={mockUpcomingFixtures}
        />
      )}
    </div>
  )
}

export default App