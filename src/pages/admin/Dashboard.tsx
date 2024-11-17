import React from 'react';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import useAdminStore from '../../store/adminStore';

export default function Dashboard() {
  const { users, products, orders } = useAdminStore();

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      label: 'Revenue',
      value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {value}
                </p>
              </div>
              <div className={`${color} p-3 rounded-full`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {order.deliveryDetails.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span
                    className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      {
                        'bg-yellow-100 text-yellow-800':
                          order.status === 'pending',
                        'bg-blue-100 text-blue-800':
                          order.status === 'processing',
                        'bg-green-100 text-green-800':
                          order.status === 'delivered',
                      }
                    )}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Users
          </h2>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}