import React, { useState, useEffect } from 'react';
import { Player, Team, TeamName, PlayerPosition } from '../types';

interface EditPlayerModalProps {
  player: Player;
  teams: Team[];
  onClose: () => void;
  onSave: (player: Player) => void;
}

const EditPlayerModal: React.FC<EditPlayerModalProps> = ({ player, teams, onClose, onSave }) => {
  const [formData, setFormData] = useState<Player>(player);

  useEffect(() => {
    setFormData(player);
  }, [player]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          rating: {
            ...prev.stats.rating,
            [name]: numValue,
          },
        },
      }));
    }
  };
  
  const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [name]: value === '' ? 0 : numValue,
        },
      }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const ratingAttributes: (keyof typeof player.stats.rating)[] = [
    'pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Player</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Player Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
             <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-300">Team</label>
              <select
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {teams.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="position" className="block text-sm font-medium text-gray-300">Position</label>
                 <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {Object.values(PlayerPosition).map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2">Player Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                  <label htmlFor="gamesPlayed" className="block text-sm font-medium text-gray-300">Games</label>
                  <input type="number" id="gamesPlayed" name="gamesPlayed" min="0" value={formData.stats.gamesPlayed} onChange={handleStatChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-300">Goals</label>
                  <input type="number" id="goals" name="goals" min="0" value={formData.stats.goals} onChange={handleStatChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                  <label htmlFor="assists" className="block text-sm font-medium text-gray-300">Assists</label>
                  <input type="number" id="assists" name="assists" min="0" value={formData.stats.assists} onChange={handleStatChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              {formData.position === PlayerPosition.GK && (
              <div>
                  <label htmlFor="cleanSheets" className="block text-sm font-medium text-gray-300">Clean Sheets</label>
                  <input type="number" id="cleanSheets" name="cleanSheets" min="0" value={formData.stats.cleanSheets} onChange={handleStatChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2">Base Attributes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ratingAttributes.map(attr => (
                <div key={attr}>
                  <label htmlFor={attr} className="block text-sm font-medium text-gray-300 capitalize">{attr}</label>
                  <input
                    type="number"
                    id={attr}
                    name={attr}
                    min="1"
                    max="99"
                    value={formData.stats.rating[attr]}
                    onChange={handleRatingChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlayerModal;