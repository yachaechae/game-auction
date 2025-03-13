import { create } from 'zustand';
import { deleteCookie, getCookie } from 'cookies-next';
import { AuthState } from '@/type/StoreType';

const authStore = create<AuthState>((set) => {
  return {
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: true }),
    logout: () => set({ user: null, isLoggedIn: false }),
  };
});

const initializeUser = () => {
  const cookies = { user: getCookie('user') as string | undefined };
  const userFromCookie = cookies.user ? JSON.parse(cookies.user) : null;
  const isLoggedIn = userFromCookie !== null;

  authStore.setState({ user: userFromCookie, isLoggedIn });
};

const logout = () => {
  deleteCookie('accessToken');

  authStore.getState().logout();
};

export { authStore, initializeUser, logout };
