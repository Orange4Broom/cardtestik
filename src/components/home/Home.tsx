import { Link } from 'react-router-dom';
import { AppRoute } from '../../routes/AppRoutes';
import { useFetchFirestore } from '../../hooks/useFetchFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useState } from 'react';
import { useToastify } from '../../hooks/useToastify';

export const Home = () => {
  const { data, isPending, error } = useFetchFirestore('cards');
  const { state } = useAuthContext();
  const { logout } = useLogout();
  const { notify } = useToastify();

  const [nazev, setNazev] = useState('');
  const [popis, setPopis] = useState('');
  const [kvalita, setKvalita] = useState('');

  const handleAddCard = () => {
    event?.preventDefault();
    setNazev('');
    setPopis('');
    setKvalita('');
    notify('success', 'Karta byla přidána');
  };

  const handleDeleteCard = (card_id) => {
    event?.preventDefault();
    notify('success', 'Karta byla smazána');
  };

  return (
    <div>
      <h1>Home</h1>
      {state.user && <p>Vítej {state.user.email}</p>}
      <Link to={AppRoute.LOGIN}>Login</Link>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {state.user && <button onClick={() => logout()}>Logout</button>}
      {data && (
        <table>
          {Object.values(data).map((card) => (
            <>
              <thead key={card.crad_id}>
                <tr>
                  <th>Název</th>
                  <th>{card.nazev}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Popis</td>
                  <td>{card.popis}</td>
                </tr>
                <tr>
                  <td>Kvalita</td>
                  <td>{card.kvalita}</td>
                </tr>
                <tr>
                  <td>
                    <button onClick={() => handleDeleteCard(card.card_id)}>
                      Smazat
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      )}
      {state.user && (
        <div>
          <h1>Přidat kartu</h1>
          <form>
            <input
              type="text"
              placeholder="nazev"
              value={nazev}
              onChange={(e) => setNazev(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="popis"
              value={popis}
              onChange={(e) => setPopis(e.target.value)}
            />
            <br />
            <input
              type="number"
              placeholder="kvalita"
              value={kvalita}
              onChange={(e) => setKvalita(e.target.value)}
            />
            <br />
            <button onClick={() => handleAddCard()}>Přidat</button>
          </form>
        </div>
      )}
    </div>
  );
};
