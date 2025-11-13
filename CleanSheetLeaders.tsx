import React, { useMemo } from 'react';
import { Player, TeamName, PlayerPosition } from '../types';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const getTeamAbbreviation = (teamName: TeamName): string => {
  switch (teamName) {
    case TeamName.INNERFOOT:
      return 'Innerfoot';
    case TeamName.SOUTHERN_SKILLERS:
      return 'S.Skillers';
    case TeamName.SUPA_STRIKAS:
      return 'S.Strikas';
    case TeamName.TOXIC:
      return 'Toxic';
    default:
      return teamName;
  }
};

const CleanSheetLeaders: React.FC<{ players: Player[] }> = ({ players }) => {
  const topGoalkeepers = useMemo(() => 
    [...players]
      .filter(player => player.position === PlayerPosition.GK)
      .sort((a, b) => (b.stats.cleanSheets || 0) - (a.stats.cleanSheets || 0))
      .slice(0, 5),
    [players]
  );
  
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700 h-full">
        {topGoalkeepers.length > 0 ? (
            <ul className="space-y-3">
                {topGoalkeepers.map((player, index) => (
                    <li key={player.id} className="flex items-center justify-between p-2 rounded-md bg-gray-700/50">
                        <div className="flex items-center min-w-0">
                            <span className={`font-bold w-6 text-center flex-shrink-0 ${index === 0 ? 'text-yellow-400' : 'text-gray-400'}`}>{index + 1}</span>
                            <div className="ml-3 truncate">
                               <p className="text-sm font-semibold text-white truncate">
                                    {player.name} - <span className="font-normal text-gray-400">{getTeamAbbreviation(player.team)}</span>
                               </p>
                               <p className="text-xs text-gray-400">
                                   {player.stats.gamesPlayed} Games Played
                               </p>
                            </div>
                        </div>
                         <div className="flex items-center flex-shrink-0">
                            <ShieldIcon />
                            <span className="text-lg font-bold text-green-400 ml-2">{player.stats.cleanSheets || 0}</span>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-center text-gray-400">No goalkeeper data available.</p>
        )}
    </div>
  );
};

export default CleanSheetLeaders;