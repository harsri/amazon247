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
  
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Successfully logged in.");
      } else {
        await register(name, email, password);
        toast.success("Successfully registered.");
      }
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="login__container">
        <h1>{isLogin ? 'Sign-in' : 'Create account'}</h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <h5>Your name</h5>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </>
          )}
          <h5>E-mail</h5>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" className="login__signInButton btn-primary">
            {isLogin ? 'Sign In' : 'Create your Amazon account'}
          </button>
        </form>

        <p>
          By signing-in you agree to AmazonClone's Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {isLogin && (
          <button onClick={() => setIsLogin(false)} className="login__registerButton">
            Create your Amazon account
          </button>
        )}
        {!isLogin && (
          <div style={{marginTop: '15px'}}>
            Already have an account? <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => setIsLogin(true)}>Sign in</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
