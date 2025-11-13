import React, { useState, useMemo, useEffect } from 'react';
import { User, Role, TeamName } from '../types';
import { USERS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const STORAGE_KEY = 'sel_users_passwords';

const getUsersWithStoredPasswords = (): User[] => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return USERS.map(user => storedUsers[user.id] ? { ...user, password: storedUsers[user.id] } : user);
};

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

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [users, setUsers] = useState<User[]>(getUsersWithStoredPasswords);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.PLAYER);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const filteredUsers = useMemo(() => {
    return users.filter(user => user.role === selectedRole);
  }, [selectedRole, users]);

  const selectedUser = useMemo(() => {
      return users.find(u => u.id === parseInt(selectedUserId, 10));
  }, [selectedUserId, users]);

  const loginMode = useMemo(() => {
      if (!selectedUser) return null;
      return selectedUser.password ? 'login' : 'create';
  }, [selectedUser]);
  
  useEffect(() => {
    if (filteredUsers.length > 0) {
      setSelectedUserId(filteredUsers[0].id.toString());
    } else {
      setSelectedUserId('');
    }
  }, [selectedRole, filteredUsers]);

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
    setError('');
  }, [selectedUserId, selectedRole]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (loginMode === 'create') {
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        storedUsers[selectedUser.id] = password;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUsers));
        setUsers(getUsersWithStoredPasswords());
        onLogin({ ...selectedUser, password });

    } else if (loginMode === 'login') {
        if (password === selectedUser.password) {
            onLogin(selectedUser);
        } else {
            setError('Who The Hell Do you Think You are.');
        }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-2xl shadow-blue-500/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Summit Elite Football Showcase
          </h1>
          <p className="mt-2 text-gray-400">Welcome! Please sign in to continue.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300">
              Select your role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.values(Role).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-300">
              Select your name
            </label>
            <select
              id="user"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={filteredUsers.length === 0}
            >
              {filteredUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.team ? `${user.name} - ${getTeamAbbreviation(user.team)}` : user.name}
                </option>
              ))}
            </select>
          </div>
          
          {loginMode === 'login' && (
            <div>
                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                 <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          )}

          {loginMode === 'create' && (
              <>
                 <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-300">Create Password</label>
                    <input type="password" id="new-password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                 <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </>
          )}

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={!selectedUserId || (loginMode !== 'create' && !password) || (loginMode === 'create' && (!password || !confirmPassword)) }
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {loginMode === 'create' ? 'Create Password & Sign In' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;