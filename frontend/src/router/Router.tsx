import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home-page/home-page'
import AuthPage from '../pages/auth-page/auth-page'
import UserProfile from '../pages/user-profile/user-profile'
import ServicePage from '../pages/service-page/service-page'
import AboutPage from '../pages/about-page/about-page'
import ProtectedRoute from '../components/protected-route/protected-route'
import { AuthService } from "../services/auth.service";


const Router = () => {
    const isToken = () => {
        return AuthService.getCookie('access_token') !== null;
      };
    
    const isAuthenticated: boolean = isToken();

  
    return (
      <BrowserRouter>
        <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AuthPage />} path="/auth" />
            <Route 
                element={  
                    <ProtectedRoute
                        isAuthenticated={isAuthenticated}
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