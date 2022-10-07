import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export const AppContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
