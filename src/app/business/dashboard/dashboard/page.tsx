"use client";

import Navbar from "@/component/Navbar";
import NotificationItem from "@/component/NotificationItem";
import ReviewsChart from "@/component/ReviewsChart";
import ServiceCard from "@/component/ServiceCard";
import ServiceFormModal from "@/component/ServiceFormModal";
// import ServiceFormModal from "@/component/ServiceFormMOdal";
import Sidebar from "@/component/Sidebar";
import StatsCard from "@/component/StatsCard";
import { Calendar, PoundSterling, FileText, Bell, Plus } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [services, setServices] = useState([
    {
      title: "Plumber",
      duration: "1hr 30 mins",
      price: "£50",
      bookings: 4,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "David booked your service Plumber",
      time: "Monday 3:45 PM",
      action: { label: "Accept", onClick: () => console.log("Accepted") },
      secondaryAction: {
        label: "Decline",
        onClick: () => console.log("Declined"),
      },
      read: false,
    },
    {
      id: 2,
      title: "Adams gave a feedback",
      time: "45 minutes ago",
      description: "My kitchen tap has stopped leaking. Great job!",
      read: false,
    },
    {
      id: 3,
      title: "Payment received: £150 from Celine",
      time: "1 day ago",
      action: {
        label: "View payment details",
        onClick: () => console.log("View payment"),
      },
      read: false,
    },
    {
      id: 4,
      title: "New review: 5 star from Adams",
      time: "Sunday 2:46 AM",
      action: { label: "View", onClick: () => console.log("View review") },
      read: false,
    },
    {
      id: 5,
      title: "Precious booked your service Plumber",
      time: "Monday 3:45 PM",
      action: { label: "Accept", onClick: () => console.log("Accepted") },
      secondaryAction: {
        label: "Decline",
        onClick: () => console.log("Declined"),
      },
      read: false,
    },
  ]);

  const handleAddService = (service: {
    title: string;
    duration: string;
    price: string;
    bookings: number;
  }) => {
    setServices([...services, service]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar for Mobile */}
        <Navbar />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 md:hidden">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Manage your services, bookings, and profile from here.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatsCard
              title="Appointments today"
              value="3"
              icon={Calendar}
              color="bg-pink-500"
            />
            <StatsCard
              title="Earnings this month"
              value="£0"
              icon={PoundSterling}
              color="bg-green-500"
            />
            <StatsCard
              title="Total services"
              value={services.length.toString()}
              icon={FileText}
              color="bg-gray-500"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section: Services */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Service posted
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 bg-gray-600 text-white rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              {services.length === 0 ? (
                <div className="p-6 bg-white rounded-lg shadow text-center">
                  <p className="text-gray-500 mb-4">
                    You currently do not have any service posted
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    Add a service
                  </button>
                </div>
              ) : (
                services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    duration={service.duration}
                    price={service.price}
                    bookings={service.bookings}
                    onEdit={() => console.log("Edit service")}
                  />
                ))
              )}
            </div>

            {/* Right Section: Notifications */}
            <div className="md:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h2>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-sm text-gray-500"
                >
                  Mark all read
                </button>
              </div>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  title={notification.title}
                  time={notification.time}
                  description={notification.description}
                  action={notification.action}
                  secondaryAction={notification.secondaryAction}
                  read={notification.read}
                />
              ))}
            </div>
          </div>

          {/* Reviews Chart */}
          <ReviewsChart />
        </div>
      </div>

      {/* Service Form Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddService={handleAddService}
      />
    </div>
  );
}
