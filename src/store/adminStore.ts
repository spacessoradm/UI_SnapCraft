import { create } from 'zustand';
import { AdminState, User, Product, Order } from '../types';

const useAdminStore = create<AdminState & {
  setUsers: (users: User[]) => void;
  setOrders: (orders: Order[]) => void;
  setProducts: (products: Product[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}>((set) => ({
  users: [],
  orders: [],
  products: [],
  isLoading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setOrders: (orders) => set({ orders }),
  setProducts: (products) => set({ products }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) => set((state) => ({
    users: state.users.map((user) =>
      user.id === id ? { ...user, ...updates } : user
    ),
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id),
  })),

  addProduct: (product) => set((state) => ({
    products: [...state.products, product],
  })),
  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map((product) =>
      product.id === id ? { ...product, ...updates } : product
    ),
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((product) => product.id !== id),
  })),

  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === id ? { ...order, status } : order
    ),
  })),
}));

export default useAdminStore;