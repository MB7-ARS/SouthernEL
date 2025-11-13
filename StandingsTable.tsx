
import React from 'react';
import { Team } from '../types';

interface StandingsTableProps {
  teams: Team[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ teams }) => {
  return (
    <div className="overflow-x-auto bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-md border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pos</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">P</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">W</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">D</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">L</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">GF</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">GA</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">GD</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pts</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/60 divide-y divide-gray-700">
          {teams.map((team, index) => (
            <tr key={team.name} className="hover:bg-gray-700/50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">{team.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">{team.stats.played}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{team.stats.won}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{team.stats.drawn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{team.stats.lost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">{team.stats.goalsFor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">{team.stats.goalsAgainst}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{team.stats.goalsFor - team.stats.goalsAgainst}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-400">{team.stats.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
