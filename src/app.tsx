import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import PageTitle from './components/PageTitle';
import { routes } from './routesConfig';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!token) {
      navigate('/auth/signin');
    }
    setTimeout(() => setLoading(false), 1000);
  }, [token, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              {routes.find((r) => r.path === '/auth/signin')?.component}
            </>
          }
        />
      </Routes>
      {token && (
        <DefaultLayout>
          <Routes>
            {routes.map(({ path, title, component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <PageTitle title={title} />
                    {component}
                  </>
                }
              />
            ))}
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
