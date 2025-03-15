import { create } from 'zustand';
import { deleteCookie, getCookie } from 'cookies-next';
import { AuthState } from '@/type/StoreType';
import { jwtDecode } from 'jwt-decode';

const token = getCookie('accessToken') as string | undefined;
let userId = '';
if (token) {
  try {
    userId = jwtDecode(token).sub as string;
  } catch (error) {
    console.error('Invalid token', error);
  }
}

const authStore = create<AuthState>((set) => ({
  token: token ?? '',
  isLoggedIn: token !== undefined,
  setToken: (token) => set({ token, isLoggedIn: true }),
  logout: () => {
    set({ token: '', isLoggedIn: false });
    deleteCookie('accessToken');
  },
  userId: userId,
}));

const initializeUser = () => {
  const token = getCookie('accessToken') as string | undefined;
  if (token) {
    authStore.getState().setToken(token);
  }

  const isLoggedIn = token !== undefined;
  authStore.setState({ isLoggedIn });
};

const logout = () => {
  deleteCookie('accessToken');
  authStore.getState().logout();
};

export { authStore, initializeUser, logout };
