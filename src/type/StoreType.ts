export interface AuthState {
  user: { name: string } | null;
  isLoggedIn: boolean;
  setUser: (user: { name: string }) => void;
  logout: () => void;
}
