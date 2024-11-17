import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart, LogOut } from 'lucide-react';
import clsx from 'clsx';

export default function AdminLayout() {
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-4 py-2 rounded-md transition-colors',
                      {
                        'bg-indigo-50 text-indigo-600': isActive,
                        'text-gray-600 hover:bg-gray-50': !isActive,
                      }
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}