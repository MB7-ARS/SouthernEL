import React, { useState, useEffect, useMemo } from 'react';
import { Fixture, Team, TeamName, Player, ScorerInfo } from '../types';

interface FixtureFormProps {
  teams: Team[];
  players: Player[];
  onSave: (fixture: Fixture) => void;
  onCancel: () => void;
  fixtureToEdit?: Fixture | null;
}

const BLANK_SCORER: ScorerInfo = { name: '', assist: '', og: false };

const FixtureForm: React.FC<FixtureFormProps> = ({ teams, players, onSave, onCancel, fixtureToEdit }) => {
    const [formData, setFormData] = useState({
        teamA: '' as TeamName | '',
        scoreA: '' as number | string,
        teamB: '' as TeamName | '',
        scoreB: '' as number | string,
        status: 'UPCOMING' as 'FT' | 'UPCOMING',
        date: '',
        motm: '',
        scorersA: [] as ScorerInfo[],
        scorersB: [] as ScorerInfo[],
    });
    
    const convertDateToInputFormat = (dateStr: string): string => {
        if (!dateStr) return '';
        try {
            const date = new Date(`${dateStr} ${new Date().getFullYear()}`);
            if (isNaN(date.getTime())) return ''; // Invalid date
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (e) {
            return '';
        }
    };
    
    const convertInputFormatToDate = (inputDate: string): string => {
        if (!inputDate) return '';
        const [year, month, day] = inputDate.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    useEffect(() => {
        if (fixtureToEdit) {
            setFormData({
                teamA: fixtureToEdit.teamA,
                scoreA: fixtureToEdit.scoreA ?? '',
                teamB: fixtureToEdit.teamB,
                scoreB: fixtureToEdit.scoreB ?? '',
                status: fixtureToEdit.status,
                date: convertDateToInputFormat(fixtureToEdit.date),
                motm: fixtureToEdit.motm ?? '',
                scorersA: fixtureToEdit.scorersA?.map(s => ({...s})) ?? [],
                scorersB: fixtureToEdit.scorersB?.map(s => ({...s})) ?? [],
            });
        }
    }, [fixtureToEdit]);

    const teamAPlayers = useMemo(() => players.filter(p => p.team === formData.teamA), [players, formData.teamA]);
    const teamBPlayers = useMemo(() => players.filter(p => p.team === formData.teamB), [players, formData.teamB]);
    const allMatchPlayers = useMemo(() => [...teamAPlayers, ...teamBPlayers], [teamAPlayers, teamBPlayers]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleScorerChange = (team: 'A' | 'B', index: number, field: keyof ScorerInfo, value: string | boolean) => {
        const key = team === 'A' ? 'scorersA' : 'scorersB';
        setFormData(prev => {
            const newScorers = [...prev[key]];
            (newScorers[index] as any)[field] = value;
            return { ...prev, [key]: newScorers };
        });
    };
    
    const addScorer = (team: 'A' | 'B') => {
        const key = team === 'A' ? 'scorersA' : 'scorersB';
        setFormData(prev => ({ ...prev, [key]: [...prev[key], { ...BLANK_SCORER }] }));
    };

    const removeScorer = (team: 'A' | 'B', index: number) => {
        const key = team === 'A' ? 'scorersA' : 'scorersB';
        setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.teamA || !formData.teamB || formData.teamA === formData.teamB) {
            alert("Please select two different teams.");
            return;
        }

        const scoreA = formData.scoreA === '' ? null : Number(formData.scoreA);
        const scoreB = formData.scoreB === '' ? null : Number(formData.scoreB);
        
        if (formData.status === 'FT' && (scoreA === null || scoreB === null)) {
            alert("Scores must be entered for a 'FT' match.");
            return;
        }
        
        const finalFixture: Fixture = {
            teamA: formData.teamA,
            scoreA,
            teamB: formData.teamB,
            scoreB,
            status: formData.status,
            date: convertInputFormatToDate(formData.date),
            motm: formData.motm || undefined,
            scorersA: formData.scorersA.filter(s => s.name),
            scorersB: formData.scorersB.filter(s => s.name),
        };
        onSave(finalFixture);
    };

    const renderScorerFields = (team: 'A' | 'B') => {
        const scorers = team === 'A' ? formData.scorersA : formData.scorersB;
        const relevantPlayers = team === 'A' ? teamAPlayers : teamBPlayers;
        const allPlayersForAssist = allMatchPlayers;

        return (
            <div>
                <h4 className="font-semibold text-lg text-blue-400 mb-2">
                    {team === 'A' ? formData.teamA || "Team A" : formData.teamB || "Team B"} Scorers
                </h4>
                {scorers.map((scorer, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 mb-2 p-2 bg-gray-700/50 rounded-md items-center">
                        <select
                            value={scorer.name}
                            onChange={e => handleScorerChange(team, index, 'name', e.target.value)}
                            className="col-span-4 bg-gray-600 border border-gray-500 rounded-md text-white px-2 py-1 text-sm"
                        >
                            <option value="">Select Scorer</option>
                            {allMatchPlayers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        <select
                            value={scorer.assist}
                            onChange={e => handleScorerChange(team, index, 'assist', e.target.value)}
                            className="col-span-4 bg-gray-600 border border-gray-500 rounded-md text-white px-2 py-1 text-sm"
                        >
                            <option value="">Select Assist</option>
                            {relevantPlayers.filter(p => p.name !== scorer.name).map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        <label className="col-span-3 flex items-center space-x-2 text-sm justify-center">
                            <input type="checkbox" checked={!!scorer.og} onChange={e => handleScorerChange(team, index, 'og', e.target.checked)} className="form-checkbox bg-gray-600 border-gray-500 rounded text-blue-500" />
                            <span>OG</span>
                        </label>
                        <button type="button" onClick={() => removeScorer(team, index)} className="col-span-1 text-red-400 hover:text-red-300 font-bold text-xl">&times;</button>
                    </div>
                ))}
                <button type="button" onClick={() => addScorer(team)} className="mt-2 text-sm text-blue-400 hover:text-blue-300 font-semibold">+ Add Scorer</button>
            </div>
        );
    };

    return (
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 md:p-8 border border-gray-700 max-w-4xl mx-auto animate-[fadeIn_0.3s_ease-in-out]">
            <h2 className="text-3xl font-bold text-white mb-6">{fixtureToEdit ? "Edit Fixture" : "Add New Fixture"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Team A */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Home Team</label>
                        <select name="teamA" value={formData.teamA} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Team A</option>
                            {teams.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                    {/* Team B */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Away Team</label>
                        <select name="teamB" value={formData.teamB} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                             <option value="">Select Team B</option>
                            {teams.filter(t => t.name !== formData.teamA).map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Scores & Date */}
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Home Score</label>
                        <input type="number" name="scoreA" value={formData.scoreA} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Away Score</label>
                        <input type="number" name="scoreB" value={formData.scoreB} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Status & MOTM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="UPCOMING">Upcoming</option>
                            <option value="FT">Full Time (FT)</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Man of the Match</label>
                        <select name="motm" value={formData.motm} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={allMatchPlayers.length === 0}>
                            <option value="">Select MOTM (Optional)</option>
                            {allMatchPlayers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                </div>
                
                {/* Scorers */}
                {formData.status === 'FT' && (
                    <div className="space-y-6 pt-6 border-t border-gray-700">
                        {renderScorerFields('A')}
                        {renderScorerFields('B')}
                    </div>
                )}
                
                {/* Actions */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500">Cancel</button>
                    <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">Save Fixture</button>
                </div>
            </form>
        </div>
    );
}

export default FixtureForm;
