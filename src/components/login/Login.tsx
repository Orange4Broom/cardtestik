import { AppRoute } from '../../routes/AppRoutes';
import { useLogin } from '../../hooks/useLogin';
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, login } = useLogin();

  const handleLogin = async () => {
    event?.preventDefault();
    await login({ email, password });
    error === null ? redirect(AppRoute.HOME) : redirect(AppRoute.LOGIN);
  };
  return (
    <div>
      <h1>Login</h1>
      <br />
      <Link to={AppRoute.HOME}>Home</Link>
      <form>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => handleLogin()}>Login</button>
      </form>
    </div>
  );
};
