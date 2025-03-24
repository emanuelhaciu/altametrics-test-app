import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserProfileAction, loginAction } from '@/api/actions/login';
import { apiService } from '@/api/api-service/apiService';
import { LoginRequest, UserProfileDto } from '@/dtos/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUser } from '@/redux/slices/auth';


interface AuthContextType {
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<UserProfileDto>;
  loading: boolean;
  user: UserProfileDto | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // This function sets up the Axios interceptor to include the auth token in requests
  const setupAxiosInterceptor = (token: string) => {
    apiService.api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  // Fetch the user profile from the server
  const fetchUserProfile = async () => {
    try {
      // Actually fetch the user profile from the server
      const response = await fetchUserProfileAction();
      // const token = localStorage.getItem('auth_token') || '';
      
      // Update Redux state with user info
      dispatch(setUser(response));
      
      return true;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // If token is invalid or expired, clear it
      localStorage.removeItem('auth_token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize authentication on app load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check if token exists in localStorage
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Always set up the interceptor first
        setupAxiosInterceptor(token);
        
        // Then try to fetch the user profile
        await fetchUserProfile();
      } else {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = async (payload: LoginRequest) => {
    try {
      setLoading(true);
      const response = await loginAction(payload);
      const {access_token} = response

      if (!access_token) {
        throw new Error('No access token found');
      }

      // Store token
      localStorage.setItem('auth_token', access_token);
      
      // Setup axios interceptor with token
      setupAxiosInterceptor(access_token);
      
      // Set authenticated state
      dispatch(setUser({
        access_token,
        email: response.email,
        name: response.name
      }));
      
      // Return the data needed for Redux
      return {...response}
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};