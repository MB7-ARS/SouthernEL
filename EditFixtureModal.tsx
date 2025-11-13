import React, { useState } from 'react';
import { Fixture } from '../types';

interface EditFixtureModalProps {
  fixture: Fixture;
  onClose: () => void;
  onSave: (newScores: { scoreA: number | null; scoreB: number | null }) => void;
}

const EditFixtureModal: React.FC<EditFixtureModalProps> = ({ fixture, onClose, onSave }) => {
  const [scoreA, setScoreA] = useState<string>(fixture.scoreA?.toString() ?? '');
  const [scoreB, setScoreB] = useState<string>(fixture.scoreB?.toString() ?? '');

  const handleSave = () => {
    const finalScoreA = scoreA === '' ? null : parseInt(scoreA, 10);
    const finalScoreB = scoreB === '' ? null : parseInt(scoreB, 10);
    onSave({
      scoreA: isNaN(finalScoreA!) ? null : finalScoreA,
      scoreB: isNaN(finalScoreB!) ? null : finalScoreB,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-2">Edit Fixture Score</h2>
        <p className="text-gray-400 mb-6">{fixture.teamA} vs {fixture.teamB}</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="scoreA" className="block text-sm font-medium text-gray-300">{fixture.teamA}</label>
            <input
              type="number"
              id="scoreA"
              value={scoreA}
              onChange={(e) => setScoreA(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="-"
            />
          </div>
          <div>
            <label htmlFor="scoreB" className="block text-sm font-medium text-gray-300">{fixture.teamB}</label>
            <input
              type="number"
              id="scoreB"
              value={scoreB}
              onChange={(e) => setScoreB(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="-"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFixtureModal;
