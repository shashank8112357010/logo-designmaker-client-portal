import {store} from '../store/store';
import { removeToken } from '../store/accountSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const getState = () => {
  return store.getState();
};


export const logout = () => {
  store.dispatch(removeToken());
};


export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(removeToken());
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/auth/sign-in');
  };

  return logout;
};