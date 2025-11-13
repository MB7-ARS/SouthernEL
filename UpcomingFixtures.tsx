import React, { useState, useMemo } from 'react';
import { Fixture, TeamName, User, Role } from '../types';

interface UpcomingFixturesProps {
  fixtures: Fixture[];
  allPastFixtures: Fixture[];
  currentUser: User | null;
  onEditFixture: (fixture: Fixture) => void;
}

const getTeamAbbreviation = (teamName: TeamName): string => {
  switch (teamName) {
    case TeamName.INNERFOOT:
      return 'Innerfoot';
    case TeamName.SOUTHERN_SKILLERS:
      return 'S. Skillers';
    case TeamName.SUPA_STRIKAS:
      return 'S. Strikas';
    case TeamName.TOXIC:
      return 'Toxic';
    default:
      return teamName;
  }
};

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


const UpcomingFixtures: React.FC<UpcomingFixturesProps> = ({ fixtures, allPastFixtures, currentUser, onEditFixture }) => {
    const [expandedFixtureIndex, setExpandedFixtureIndex] = useState<number | null>(null);

    const todayDateStr = useMemo(() => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), []);

    const calculateH2H = (teamA: TeamName, teamB: TeamName) => {
        let teamAWins = 0;
        let teamBWins = 0;
        let draws = 0;

        allPastFixtures.forEach(fixture => {
            const isMatch = (fixture.teamA === teamA && fixture.teamB === teamB) || (fixture.teamA === teamB && fixture.teamB === teamA);
            if (!isMatch) return;

            if (fixture.scoreA === fixture.scoreB) {
                draws++;
            } else if ((fixture.teamA === teamA && (fixture.scoreA ?? 0) > (fixture.scoreB ?? 0)) || (fixture.teamA === teamB && (fixture.scoreB ?? 0) > (fixture.scoreA ?? 0))) {
                teamAWins++;
            } else {
                teamBWins++;
            }
        });

        return { teamAWins, teamBWins, draws };
    };
    
    const handleToggle = (index: number) => {
        setExpandedFixtureIndex(expandedFixtureIndex === index ? null : index);
    };

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700 h-full">
        <ul className="space-y-3">
            {fixtures.map((fixture, index) => {
                const isToday = fixture.date === todayDateStr;
                const h2h = calculateH2H(fixture.teamA, fixture.teamB);
                const isExpanded = expandedFixtureIndex === index;

                return (
                    <li key={index} className="bg-gray-700/50 rounded-md p-3 transition-all duration-300">
                        <div className="flex items-center w-full">
                            <span className="flex-1 text-sm font-medium text-white text-right truncate">{getTeamAbbreviation(fixture.teamA)}</span>
                            <div className="text-center font-bold text-sm mx-4 flex-shrink-0 cursor-pointer" onClick={() => handleToggle(index)} role="button" aria-expanded={isExpanded}>
                                <p className="text-gray-400">VS</p>
                                <p className="text-xs text-gray-500">{fixture.date}</p>
                            </div>
                            <span className="flex-1 text-sm font-medium text-white text-left truncate">{getTeamAbbreviation(fixture.teamB)}</span>
                            <div className="flex items-center justify-end w-20 flex-shrink-0">
                                {isToday && (
                                    <span className="text-xs font-semibold text-green-400 animate-pulse mr-2">
                                       Today
                                    </span>
                                )}
                                {currentUser?.role === Role.ADMIN && (
                                    <button onClick={() => onEditFixture(fixture)} className="p-1 rounded-full hover:bg-gray-600 text-gray-400 hover:text-white mr-1">
                                        <EditIcon />
                                    </button>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 cursor-pointer`} viewBox="0 0 20 20" fill="currentColor" onClick={() => handleToggle(index)}>
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-gray-600 text-center animate-[fadeIn_0.5s_ease-in-out]">
                                <p className="text-sm font-semibold text-gray-300 mb-2">Head-to-Head (League)</p>
                                <div className="flex flex-col sm:flex-row justify-around text-xs text-gray-400 space-y-1 sm:space-y-0">
                                    <p><span className="font-bold text-white">{h2h.teamAWins}</span> {getTeamAbbreviation(fixture.teamA)} Wins</p>
                                    <p><span className="font-bold text-white">{h2h.draws}</span> Draws</p>
                                    <p><span className="font-bold text-white">{h2h.teamBWins}</span> {getTeamAbbreviation(fixture.teamB)} Wins</p>
                                </div>
                            </div>
                        )}
                    </li>
                )
            })}
        </ul>
    </div>
  );
};

export default UpcomingFixtures;