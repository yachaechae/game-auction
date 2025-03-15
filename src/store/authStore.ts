import { create } from 'zustand';
import { deleteCookie, getCookie } from 'cookies-next';
import { AuthState } from '@/type/StoreType';
import { jwtDecode } from 'jwt-decode';

const userId = jwtDecode(getCookie('accessToken') as string).sub as string;
const authStore = create<AuthState>((set) => ({
  token: getCookie('accessToken') as string,
  isLoggedIn: false,
  setToken: (token) => set({ token, isLoggedIn: true }),
  logout: () => {
    set({ token: null, isLoggedIn: false });
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
