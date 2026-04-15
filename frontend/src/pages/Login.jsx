import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Login.scss';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back!');
      } else {
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setLoading(false);
          return;
        }
        await register(name, email, password);
        toast.success('Account created successfully!');
      }
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(v => !v);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="login">
      <Link to="/">
        <div className="login__logo">🛒 AmazonClone</div>
      </Link>

      <div className="login__container">
        <h1>{isLogin ? 'Sign in' : 'Create account'}</h1>

        {error && (
          <div className="login__error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="login__field">
              <label>Your name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="First and last name"
                autoComplete="name"
              />
            </div>
          )}

          <div className="login__field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="login__field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder={isLogin ? 'Enter your password' : 'At least 6 characters'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            className="login__signInButton"
            disabled={loading}
          >
            {loading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create your Amazon account')}
          </button>
        </form>

        <p className="login__terms">
          By continuing, you agree to AmazonClone's Conditions of Use and Privacy Notice.
        </p>

        <div className="login__divider"><span>New to AmazonClone?</span></div>

        <button className="login__registerButton" onClick={switchMode} type="button">
          {isLogin ? 'Create your Amazon account' : '← Back to Sign In'}
        </button>
      </div>
    </div>
  );
};

export default Login;
