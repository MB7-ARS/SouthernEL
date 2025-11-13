import React from 'react';
import { Team, TeamName } from '../types';

interface TeamCardProps {
  team: Team;
  teams: Team[]; // Full list of teams to determine rank
  onSelectTeam: (teamName: TeamName) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, teams, onSelectTeam }) => {
  const teamPosition = teams.findIndex(t => t.name === team.name) + 1;

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 flex flex-col justify-between border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-bold text-white">{team.name}</h3>
        <p className="text-sm text-gray-400 mt-1">Captain: {team.captain}</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm">
            <span className="text-gray-400">Points</span>
            <span className="font-semibold text-blue-400">{team.stats.points}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Position</span>
            <span className="font-semibold text-white">{teamPosition}</span>
        </div>
      </div>
       <button 
        onClick={() => onSelectTeam(team.name)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold text-sm"
      >
        View Details
      </button>
    </div>
  );
};

export default TeamCard;
