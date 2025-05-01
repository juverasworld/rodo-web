"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  MessageSquare,
  PoundSterling,
  FileText as ReviewIcon,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "My services", icon: FileText, path: "/services" },
  { name: "Appointment", icon: Calendar, path: "/appointment" },
  { name: "Messages", icon: MessageSquare, path: "/messages" },
  { name: "Earnings", icon: PoundSterling, path: "/earnings" },
  { name: "Reviews and feedback", icon: ReviewIcon, path: "/reviews" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Help centre", icon: HelpCircle, path: "/help" },
];

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-gray-50 border-r">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">rodo.</h1>
      </div>
      <nav className="flex-1 px-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center p-3 mb-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
