import { useContext } from 'react';
import { AuthContext } from '../contexts/JWTContext';

export const useAuth = () => useContext(AuthContext);
