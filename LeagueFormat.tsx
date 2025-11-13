import React from 'react';
import { UPCOMING_FIXTURES } from '../constants';

const CompetitionFormat: React.FC = () => {
  const lastGameDateStr = UPCOMING_FIXTURES[UPCOMING_FIXTURES.length - 1].date;
  // Create a date object. Assuming current year.
  const lastGameDate = new Date(`${lastGameDateStr} ${new Date().getFullYear()}`);
  const playoffMonth = lastGameDate.toLocaleString('en-US', { month: 'long' });

  const semiFinalsDate = `${playoffMonth} 9th`;
  const finalDate = `${playoffMonth} 11th`;

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-white">Competition Format</h3>
      <div className="space-y-4 text-gray-300">
        <div>
          <h4 className="font-semibold text-lg text-blue-400">Regular Season</h4>
          <p>Each team plays every other team twice (home and away) in a double round-robin format after all players gain a nice suitable rest. The league table is determined by points, then goal difference.</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg text-blue-400">Championship Playoffs</h4>
          <h5>After the regular season, the top four teams will enter a playoff cup to determine the champion who ends up taking the money </h5>
          <ul className="list-disc list-inside mt-2 pl-4 space-y-2">
             <li>
                <span className="font-semibold">Semi-Finals:</span>
                <span className="ml-2 text-teal-300 font-mono">{semiFinalsDate}</span>
                <ul className="list-['–'] list-inside mt-1 pl-5 text-gray-400">
                    <li>1st Place vs. 3rd Place</li>
                    <li>2nd Place vs. 4th Place</li>
                </ul>
            </li>
            <li>
                <span className="font-semibold">Final:</span>
                <span className="ml-2 text-teal-300 font-mono">{finalDate}</span>
                 <ul className="list-['–'] list-inside mt-1 pl-5 text-gray-400">
                    <li>Winners of the semi-finals</li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetitionFormat;
