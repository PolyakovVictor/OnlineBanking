import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home-page/home-page';
import AuthPage from '../pages/auth-page/auth-page';
import UserProfile from '../pages/user-profile/user-profile';
import ServicePage from '../pages/service-page/service-page';
import AboutPage from '../pages/about-page/about-page';
import ProtectedRoute from '../components/protected-route/protected-route';
import { AuthService } from '../services/auth.service';

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await AuthService.getCookie('access_token');
        setIsAuthenticated(accessToken !== undefined);
      } catch (error) {
        console.error('Error when checking token:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    checkToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AuthPage />} path="/auth" />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              authenticationPath="/auth"
              outlet={<UserProfile />}
            />
          }
          path="/profile"
        />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              authenticationPath="/auth"
              outlet={<ServicePage />}
            />
          }
          path="/service"
        />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<div>Not found</div>} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
