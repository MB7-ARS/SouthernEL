import React, { useState, useMemo } from 'react';
import { Team, TeamName, Player, Fixture, User, Role } from '../types';
import StandingsTable from './StandingsTable';
import TeamCard from './TeamCard';
import TopPerformers from './TopPerformers';
import Fixtures from './Fixtures';
import CompetitionFormat from './LeagueFormat';
import UpcomingFixtures from './UpcomingFixtures';
import CleanSheetLeaders from './CleanSheetLeaders';

interface DashboardProps {
    onSelectTeam: (teamName: TeamName) => void;
    teams: Team[];
    players: Player[];
    fixtures: Fixture[];
    upcomingFixtures: Fixture[];
    currentUser: User | null;
    onRecalculateRatings: () => void;
    onOpenFixtureManager: (fixture?: Fixture) => void;
}

const FixtureFilterControl = ({
  controlId,
  value,
  onChange,
  teams,
}: {
  controlId: string;
  value: TeamName | 'ALL';
  onChange: (value: TeamName | 'ALL') => void;
  teams: Team[];
}) => (
  <div>
    <label htmlFor={controlId} className="sr-only">Filter by team</label>
    <select
      id={controlId}
      value={value}
      onChange={e => onChange(e.target.value as TeamName | 'ALL')}
      className="bg-gray-700 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-1.5 transition-colors"
    >
      <option value="ALL">All Teams</option>
      {teams.map(team => (
        <option key={team.name} value={team.name}>{team.name}</option>
      ))}
    </select>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ onSelectTeam, teams, players, fixtures, upcomingFixtures, currentUser, onRecalculateRatings, onOpenFixtureManager }) => {
  const [resultsFilter, setResultsFilter] = useState<TeamName | 'ALL'>('ALL');
  const [upcomingFilter, setUpcomingFilter] = useState<TeamName | 'ALL'>('ALL');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleRatingUpdate = () => {
    onRecalculateRatings();
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000); // Message disappears after 3 seconds
  };

  const filteredFixtures = useMemo(() => {
    if (resultsFilter === 'ALL') return fixtures;
    return fixtures.filter(f => f.teamA === resultsFilter || f.teamB === resultsFilter);
  }, [resultsFilter, fixtures]);

  const filteredUpcomingFixtures = useMemo(() => {
    if (upcomingFilter === 'ALL') return upcomingFixtures;
    return upcomingFixtures.filter(f => f.teamA === upcomingFilter || f.teamB === upcomingFilter);
  }, [upcomingFilter, upcomingFixtures]);

  return (
    <>
      <div className="space-y-12">

        {currentUser?.role === Role.ADMIN && (
            <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">Admin Controls</h3>
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={handleRatingUpdate}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                    >
                        Run Automatic Rating Update
                    </button>
                    <button
                        onClick={() => onOpenFixtureManager()}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors"
                    >
                        Add New Fixture
                    </button>
                    {updateSuccess && <p className="text-green-400 animate-pulse">Player ratings have been successfully updated!</p>}
                </div>
            </div>
        )}

        <div>
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">League Standings</h2>
          <StandingsTable teams={teams} />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map(team => (
              <TeamCard key={team.name} team={team} teams={teams} onSelectTeam={onSelectTeam} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Top Contributors</h2>
              <TopPerformers players={players} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Clean Sheet Leaders</h2>
              <CleanSheetLeaders players={players} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Recent Results</h2>
              <FixtureFilterControl controlId="recent-results-filter" value={resultsFilter} onChange={setResultsFilter} teams={teams} />
            </div>
            <Fixtures fixtures={filteredFixtures} currentUser={currentUser} onEditFixture={onOpenFixtureManager} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Upcoming Fixtures</h2>
            <FixtureFilterControl controlId="upcoming-fixtures-filter" value={upcomingFilter} onChange={setUpcomingFilter} teams={teams} />
          </div>
          <UpcomingFixtures fixtures={filteredUpcomingFixtures} allPastFixtures={fixtures} currentUser={currentUser} onEditFixture={onOpenFixtureManager} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Competition Format</h2>
          <CompetitionFormat />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
