import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('비밀번호가 올바르지 않습니다. (admin123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-black/5">
        <h1 className="text-3xl font-serif mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/5"
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-stone-800 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-stone-400">
          Hint: admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
