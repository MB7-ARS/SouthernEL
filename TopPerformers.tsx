import React, { useMemo } from 'react';
import { Player, TeamName } from '../types';

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a.75.75 0 01.682.433l1.833 3.666 4.048.588a.75.75 0 01.416 1.28l-2.928 2.854.692 4.032a.75.75 0 01-1.088.791L10 13.182l-3.623 1.905a.75.75 0 01-1.088-.79l.692-4.033-2.928-2.854a.75.75 0 01.416-1.28l4.048-.588L9.318 2.433A.75.75 0 0110 2z" />
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

const TopPerformers: React.FC<{ players: Player[] }> = ({ players }) => {
  const topContributors = useMemo(() => 
    [...players]
      .map(player => ({
        ...player,
        ga: player.stats.goals + player.stats.assists
      }))
      .sort((a, b) => b.ga - a.ga)
      .slice(0, 5),
    [players]
  );
  
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700 h-full">
        <ul className="space-y-3">
            {topContributors.map((player, index) => (
                <li key={player.id} className="flex items-center justify-between p-2 rounded-md bg-gray-700/50">
                    <div className="flex items-center min-w-0">
                        <span className={`font-bold w-6 text-center flex-shrink-0 ${index === 0 ? 'text-yellow-400' : 'text-gray-400'}`}>{index + 1}</span>
                        <div className="ml-3 truncate">
                           <p className="text-sm font-semibold text-white truncate">
                                {player.name} - <span className="font-normal text-gray-400">{getTeamAbbreviation(player.team)}</span>
                           </p>
                           <p className="text-xs text-gray-400">
                               {player.stats.goals}G, {player.stats.assists}A
                           </p>
                        </div>
                    </div>
                     <div className="flex items-center flex-shrink-0">
                        {index === 0 && <CrownIcon />}
                        <span className="text-lg font-bold text-blue-400 ml-2">{player.ga}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default TopPerformers;
