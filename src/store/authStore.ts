import { create } from 'zustand';
import { deleteCookie, getCookie } from 'cookies-next';
import { AuthState } from '@/type/StoreType';

const authStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,
  setToken: (token) => set({ token, isLoggedIn: true }),
  logout: () => {
    set({ token: null, isLoggedIn: false });
    deleteCookie('accessToken');
  },
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
