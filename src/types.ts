export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  type: 'set' | 'puzzle';
  dimensions: {
    width: number;
    height: number;
  };
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  images: string[];
  price: number;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryDetails: DeliveryDetails;
  createdAt: string;
  updatedAt: string;
}

export interface AdminState {
  users: User[];
  orders: Order[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
}