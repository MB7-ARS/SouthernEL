import React, { useState } from 'react';
import { Fixture, TeamName, User, Role } from '../types';

interface FixturesProps {
  fixtures: Fixture[];
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

const MedalIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a.75.75 0 01.682.433l1.833 3.666 4.048.588a.75.75 0 01.416 1.28l-2.928 2.854.692 4.032a.75.75 0 01-1.088.791L10 13.182l-3.623 1.905a.75.75 0 01-1.088-.79l.692-4.033-2.928-2.854a.75.75 0 01.416-1.28l4.048-.588L9.318 2.433A.75.75 0 0110 2z" />
    </svg>
);

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


const Fixtures: React.FC<FixturesProps> = ({ fixtures, currentUser, onEditFixture }) => {
    const [expandedFixtureIndex, setExpandedFixtureIndex] = useState<number | null>(null);
    
    const handleToggle = (index: number) => {
        setExpandedFixtureIndex(expandedFixtureIndex === index ? null : index);
    };

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700 h-full">
        <ul className="space-y-3">
            {fixtures.slice().reverse().map((fixture, index) => {
                const isExpanded = expandedFixtureIndex === index;
                return (
                    <li key={index} className="bg-gray-700/50 rounded-md p-3 transition-all duration-300">
                         <div className="flex items-center w-full">
                           <div className="flex-1 text-right">
                                <span className="text-sm font-medium text-white truncate">{getTeamAbbreviation(fixture.teamA)}</span>
                           </div>
                            <div className="text-center mx-2 flex-shrink-0 cursor-pointer" onClick={() => handleToggle(index)} role="button" aria-expanded={isExpanded}>
                                <div className="font-bold text-lg">
                                    <span className="text-white px-2 py-1 bg-gray-600 rounded">{fixture.scoreA}</span>
                                    <span className="text-gray-400 mx-1">-</span>
                                    <span className="text-white px-2 py-1 bg-gray-600 rounded">{fixture.scoreB}</span>
                                </div>
                                <span className="text-xs text-gray-500">{fixture.date}</span>
                            </div>
                            <div className="flex-1 text-left">
                               <span className="text-sm font-medium text-white truncate">{getTeamAbbreviation(fixture.teamB)}</span>
                            </div>
                             <div className="flex items-center justify-end w-10 flex-shrink-0">
                                {currentUser?.role === Role.ADMIN && (
                                    <button onClick={() => onEditFixture(fixture)} className="p-1 rounded-full hover:bg-gray-600 text-gray-400 hover:text-white mr-1">
                                        <EditIcon />
                                    </button>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 cursor-pointer ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" onClick={() => handleToggle(index)}>
                                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-600 space-y-4 animate-[fadeIn_0.5s_ease-in-out]">
                                {fixture.motm && (
                                    <div className="flex items-center justify-center bg-gray-600/50 p-2 rounded-md">
                                        <MedalIcon />
                                        <span className="text-sm font-semibold text-gray-300">Man of the Match:</span>
                                        <span className="ml-2 font-bold text-white">{fixture.motm}</span>
                                    </div>
                                )}
                                
                                {(fixture.scorersA?.length > 0 || fixture.scorersB?.length > 0) && (
                                    <div>
                                        <p className="text-sm font-semibold text-center text-gray-300 mb-2">Goalscorers</p>
                                        <div className="grid grid-cols-2 gap-x-4 text-xs text-gray-400">
                                            <div className="text-right border-r border-gray-600 pr-4 space-y-1">
                                                {fixture.scorersA?.map((scorer, i) => (
                                                    <p key={i} className="truncate">{scorer.name} {scorer.og && '(OG)'} {scorer.assist && `(assist: ${scorer.assist})`}</p>
                                                ))}
                                            </div>
                                            <div className="text-left pl-4 space-y-1">
                                                {fixture.scorersB?.map((scorer, i) => (
                                                    <p key={i} className="truncate">{scorer.name} {scorer.og && '(OG)'} {scorer.assist && `(assist: ${scorer.assist})`}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                )
            })}
        </ul>
    </div>
  );
};

export default Fixtures;