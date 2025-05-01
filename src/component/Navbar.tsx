"use client";

import { Menu, Bell } from "lucide-react";
import { useState } from "react";
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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-white shadow relative">
      <h1 className="text-xl font-semibold text-gray-800">rodo.</h1>
      <div className="flex items-center space-x-3">
        <Bell className="h-6 w-6 text-gray-600" />
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-10">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
