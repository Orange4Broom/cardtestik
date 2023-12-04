import { AppRoute } from './routes/AppRoutes';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Home } from './components/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path={AppRoute.HOME} element={<Home />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
      </Routes>
    </>
  );
}
