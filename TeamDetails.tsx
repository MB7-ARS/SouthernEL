import React, { useState, useMemo } from 'react';
import { Team, User, Role, Player, PlayerStats, Fixture } from '../types';
import UpcomingFixtures from './UpcomingFixtures';

interface TeamDetailsProps {
  team: Team;
  onBack: () => void;
  currentUser: User | null;
  upcomingFixtures: Fixture[];
  allPastFixtures: Fixture[];
  onSelectPlayer: (playerId: number) => void;
  isManagerView?: boolean;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team, onBack, currentUser, upcomingFixtures, allPastFixtures, onSelectPlayer, isManagerView }) => {

  const teamUpcomingFixtures = useMemo(() => {
    return upcomingFixtures.filter(f => f.teamA === team.name || f.teamB === team.name);
  }, [team.name, upcomingFixtures]);

  return (
    <>
      <div className="space-y-8">
        <div>
          {!isManagerView && (
            <button
              onClick={onBack}
              className="mb-6 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors"
            >
              &larr; Back to Dashboard
            </button>
          )}
          <div className="text-center pt-4">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">{team.name}</h2>
              <p className="text-lg text-gray-400 mt-2">Captain: {team.captain} | Manager: {team.manager}</p>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-white">Player Roster & Stats</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Player Name</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">POS</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">GP</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Goals</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Assists</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/60 divide-y divide-gray-700">
                {team.players.sort((a,b) => b.stats.rating.overall - a.stats.rating.overall).map((player) => (
                  <tr key={player.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      <button onClick={() => onSelectPlayer(player.id)} className="text-left w-full hover:text-blue-400 transition-colors duration-200 focus:outline-none">
                        {player.name} {player.name === team.captain && '(C)'}
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300 font-mono">{player.position.match(/\(([^)]+)\)/)?.[1] || 'N/A'}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300">{player.stats.gamesPlayed}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300">{player.stats.goals}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-300">{player.stats.assists}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-bold text-blue-400">{player.stats.rating.overall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {teamUpcomingFixtures.length > 0 && (
          <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Upcoming Fixtures</h3>
            <UpcomingFixtures fixtures={teamUpcomingFixtures} allPastFixtures={allPastFixtures} currentUser={currentUser} onEditFixture={() => {}}/>
          </div>
        )}

      </div>
    </>
  );
};

export default TeamDetails;