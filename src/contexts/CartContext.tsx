import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  strap?: string;
  customization?: {
    size: string;
    strap: string;
    strapPrice: number;
  };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.strap === action.payload.strap
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === existingItem.id && 
          item.size === existingItem.size && 
          item.strap === existingItem.strap
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      const total = newItems.reduce((sum, item) => {
        const itemPrice = item.price + (item.customization?.strapPrice || 0);
        return sum + (itemPrice * item.quantity);
      }, 0);

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
        isOpen: true,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => {
        const itemPrice = item.price + (item.customization?.strapPrice || 0);
        return sum + (itemPrice * item.quantity);
      }, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const total = newItems.reduce((sum, item) => {
        const itemPrice = item.price + (item.customization?.strapPrice || 0);
        return sum + (itemPrice * item.quantity);
      }, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
