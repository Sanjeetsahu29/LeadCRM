// Sidebar Component

import { 
  LayoutDashboard,
  Users,
  Clock,
  TrendingUp,
  Package,
  Bell,
  Settings,
  Menu,
} from 'lucide-react';
const Sidebar = ({ isCollapsed, onToggle }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false },
    { icon: Users, label: "Leads", active: true },
    { icon: Clock, label: "Follow-Ups", active: false },
    { icon: TrendingUp, label: "Sales Activity", active: false },
    { icon: Package, label: "Products", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: Settings, label: "Settings", active: false }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">LeadCRM</h1>}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;