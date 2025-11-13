

import React from 'react';
import { Player, Team, Fixture, PlayerPosition } from '../types';
import TopPerformers from './TopPerformers';
import Fixtures from './Fixtures';
import UpcomingFixtures from './UpcomingFixtures';
import CompetitionFormat from './LeagueFormat';
import StandingsTable from './StandingsTable';

interface PlayerDashboardProps {
  player: Player;
  allPlayers: Player[];
  teams: Team[];
  fixtures: Fixture[];
  upcomingFixtures: Fixture[];
}

const StatCard: React.FC<{ label: string; value: string | number, className?: string }> = ({ label, value, className }) => (
    <div className={`bg-gray-700/50 p-4 rounded-lg text-center ${className}`}>
        <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
    </div>
);

const PlayerDashboard: React.FC<PlayerDashboardProps> = ({ player, allPlayers, teams, fixtures, upcomingFixtures }) => {
  const nextGame = upcomingFixtures.find(f => f.teamA === player.team || f.teamB === player.team);
  const opponent = nextGame ? (nextGame.teamA === player.team ? nextGame.teamB : nextGame.teamA) : null;

  const motivationalQuotes = [
      "Keep pushing, your next great moment awaits!",
      "The next game is a new opportunity to shine. Give it your all!",
      "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
      "Believe you can and you're halfway there. See you on the pitch!",
      "The harder the battle, the sweeter the victory.",
      "Champions keep playing until they get it right.",
      "It's not whether you get knocked down; it's whether you get up."
  ];
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">My Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-white">My Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Played" value={player.stats.gamesPlayed} />
                    <StatCard label="Goals" value={player.stats.goals} />
                    <StatCard label="Assists" value={player.stats.assists} />
                    {player.position === PlayerPosition.GK && (
                        <StatCard label="Clean Sheets" value={player.stats.cleanSheets} />
                    )}
                    <StatCard label="Rating" value={player.stats.rating.overall} className="text-blue-400" />
                </div>
            </div>
            
            {nextGame && opponent && (
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold mb-1 text-white">Next Match</h3>
                    <p className="text-gray-400 text-sm mb-3">Get Ready!</p>
                    <p className="text-lg">vs</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">{opponent}</p>
                    <p className="text-md text-gray-400 mt-2">{nextGame.date}</p>
                </div>
            )}
        </div>
        <div className="mt-8 text-center bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <p className="text-lg italic text-teal-300">"{quote}"</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">League Standings</h2>
        <StandingsTable teams={teams} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Top Contributors</h2>
          <TopPerformers players={allPlayers} />
        </div>
        <div>
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Recent Results</h2>
          <Fixtures fixtures={fixtures} currentUser={null} onEditFixture={() => {}} />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Upcoming Fixtures</h2>
        <UpcomingFixtures fixtures={upcomingFixtures} allPastFixtures={fixtures} currentUser={null} onEditFixture={() => {}} />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">Competition Format</h2>
        <CompetitionFormat />
      </div>
    </div>
  );
};

export default PlayerDashboard;