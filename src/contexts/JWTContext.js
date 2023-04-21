import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import { useNavigate } from 'react-router-dom';
import { PATH_AGENT } from '../routes/paths';
import { isValidToken, setSession } from '../utils/jwt';
import * as api from '../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  role: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, role } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      role
    };
  },
  LOGIN: (state, action) => {
    const { user, role } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      role
    };
  },
  UPDATE: (state, action) => {
    const { user, role } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
      role
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user, role } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      role
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const { data } = await api.account();
          const { user } = data;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              role: user.role
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              role: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            role: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (payload) => {
    const { data } = await api.signin(payload);

    const { token, user } = data;

    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        role: user.role
      }
    });

    if (user.role === 'Host') navigate(PATH_AGENT.root);
  };

  const register = async (payload) => {
    const response = await api.signup(payload);
    const { token, user } = response.data;

    window.localStorage.setItem('accessToken', token);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
        role: user.role
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const forgotPassword = async (payload) => {
    await api.forgotPassword(payload);
  };

  const resetPassword = async (payload, token) => {
    await api.resetPassword(payload, token);
  };

  const changePassword = async (payload) => {
    await api.changePassword(payload);
  };
  const updateProfile = async (payload) => {
    const {
      data: { user }
    } = await api.updateProfile(payload);

    dispatch({
      type: 'UPDATE',
      payload: {
        user,
        role: user.role
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        forgotPassword,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
