import React, { useMemo } from 'react';
import { Player, Fixture, User, Role, PlayerPosition } from '../types';
import RoleExplanation from './RoleExplanation';

interface PlayerDetailsProps {
  player: Player;
  allPastFixtures: Fixture[];
  onBack: () => void;
  currentUser: User | null;
  onEditPlayer: (player: Player) => void;
}

const StatCard: React.FC<{ label: string; value: string | number, className?: string, icon: React.ReactNode }> = ({ label, value, className, icon }) => (
    <div className={`bg-gray-700/50 p-4 rounded-lg text-center flex flex-col items-center justify-center ${className}`}>
        <div className="flex items-center text-gray-400">
            {icon}
            <p className="text-sm uppercase tracking-wider ml-2">{label}</p>
        </div>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
);

const AttributeBar: React.FC<{label: string, value: number}> = ({ label, value }) => {
    const percentage = value;
    const getColor = (val: number) => {
        if (val >= 85) return 'from-green-400 to-teal-400';
        if (val >= 75) return 'from-blue-400 to-cyan-400';
        if (val >= 60) return 'from-yellow-400 to-amber-400';
        return 'from-red-400 to-orange-400';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className={`text-sm font-bold text-white`}>{value}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div
                    className={`bg-gradient-to-r ${getColor(value)} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};


// Icons for stats
const GamesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const GoalIconDetailed = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>;
const AssistIconDetailed = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>;
const RatingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const MotmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a.75.75 0 01.682.433l1.833 3.666 4.048.588a.75.75 0 01.416 1.28l-2.928 2.854.692 4.032a.75.75 0 01-1.088.791L10 13.182l-3.623 1.905a.75.75 0 01-1.088-.79l.692-4.033-2.928-2.854a.75.75 0 01.416-1.28l4.048-.588L9.318 2.433A.75.75 0 0110 2z" /></svg>;
const ShieldIconDetailed = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944L12 22l9-1.056A12.02 12.02 0 0021 7.944a11.955 11.955 0 01-5.382-4.016z" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;


const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player, allPastFixtures, onBack, currentUser, onEditPlayer }) => {
    const playerMatchLog = useMemo(() => {
        return allPastFixtures
            .filter(f => f.teamA === player.team || f.teamB === player.team)
            .map(fixture => {
                let goals = 0;
                let assists = 0;
                const isTeamA = fixture.teamA === player.team;
                const scorers = isTeamA ? fixture.scorersA : fixture.scorersB;

                scorers?.forEach(scorer => {
                    if (scorer.name === player.name && !scorer.og) {
                        goals++;
                    }
                });

                // Check assists from both teams
                fixture.scorersA?.forEach(s => {
                    if (s.assist === player.name) assists++;
                });
                fixture.scorersB?.forEach(s => {
                    if (s.assist === player.name) assists++;
                });

                const opponent = isTeamA ? fixture.teamB : fixture.teamA;
                const score = isTeamA ? `${fixture.scoreA} - ${fixture.scoreB}` : `${fixture.scoreB} - ${fixture.scoreA}`;
                
                let result: 'W' | 'D' | 'L' = 'D';
                if ((isTeamA && fixture.scoreA! > fixture.scoreB!) || (!isTeamA && fixture.scoreB! > fixture.scoreA!)) {
                    result = 'W';
                } else if ((isTeamA && fixture.scoreA! < fixture.scoreB!) || (!isTeamA && fixture.scoreB! < fixture.scoreA!)) {
                    result = 'L';
                }

                return {
                    fixture,
                    opponent,
                    score,
                    result,
                    goals,
                    assists,
                    isMotm: fixture.motm === player.name,
                };
            }).reverse(); // Show most recent games first
    }, [player, allPastFixtures]);

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
        <div>
            <button
                onClick={onBack}
                className="mb-6 px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors"
            >
                &larr; Back to Team
            </button>
            <div className="text-center relative">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">{player.name}</h2>
                {currentUser?.role === Role.ADMIN && (
                    <button 
                        onClick={() => onEditPlayer(player)}
                        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white bg-gray-700/50 rounded-full transition-colors"
                        aria-label="Edit Player"
                    >
                        <EditIcon />
                    </button>
                )}
                <p className="text-lg text-gray-400 mt-2">{player.team} | {player.position}</p>
            </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
             <h3 className="text-2xl font-bold mb-4 text-white">Season Stats</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Played" value={player.stats.gamesPlayed} icon={<GamesIcon/>} />
                <StatCard label="Goals" value={player.stats.goals} icon={<GoalIconDetailed/>} />
                <StatCard label="Assists" value={player.stats.assists} icon={<AssistIconDetailed/>} />
                {player.position === PlayerPosition.GK && (
                    <StatCard label="Clean Sheets" value={player.stats.cleanSheets} icon={<ShieldIconDetailed/>} />
                )}
                <StatCard label="Rating" value={player.stats.rating.overall} className="text-blue-400" icon={<RatingIcon/>} />
            </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Player Attributes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <AttributeBar label="Pace" value={player.stats.rating.pace} />
                <AttributeBar label="Shooting" value={player.stats.rating.shooting} />
                <AttributeBar label="Passing" value={player.stats.rating.passing} />
                <AttributeBar label="Dribbling" value={player.stats.rating.dribbling} />
                <AttributeBar label="Defending" value={player.stats.rating.defending} />
                <AttributeBar label="Physical" value={player.stats.rating.physical} />
            </div>
        </div>

        <RoleExplanation position={player.position} />
        
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Match Log</h3>
            {playerMatchLog.length > 0 ? (
                 <ul className="space-y-3">
                    {playerMatchLog.map((log, index) => (
                        <li key={index} className="bg-gray-700/50 rounded-md p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-400">{log.fixture.date}</p>
                                    <p className="font-semibold text-white">vs {log.opponent}</p>
                                </div>
                                <div className="text-right">
                                     <p className={`font-bold text-lg ${
                                         log.result === 'W' ? 'text-green-400' :
                                         log.result === 'L' ? 'text-red-400' : 'text-gray-300'
                                     }`}>{log.score} <span className="text-sm">({log.result})</span></p>
                                </div>
                            </div>
                            {(log.goals > 0 || log.assists > 0 || log.isMotm) && (
                                <div className="mt-3 pt-3 border-t border-gray-600 flex items-center space-x-4 text-sm text-gray-300">
                                    {log.goals > 0 && <span className="flex items-center">⚽<span className="ml-1">{log.goals} Goal{log.goals > 1 && 's'}</span></span>}
                                    {log.assists > 0 && <span className="flex items-center">👟<span className="ml-1">{log.assists} Assist{log.assists > 1 && 's'}</span></span>}
                                    {log.isMotm && <span className="flex items-center font-bold text-yellow-400"><MotmIcon/> <span className="ml-1">MOTM</span></span>}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-400">No match data available for this player yet.</p>
            )}
        </div>
    </div>
  );
};

export default PlayerDetails;