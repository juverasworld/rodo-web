
"use client";

import { useState, useMemo, useEffect } from "react";
import { Star } from "lucide-react";
import { Menu, X, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import Cookies from "universal-cookie";
import md5 from "crypto-js/md5"; // For Gravatar



const mockProfiles = [
  {
    id: 1,
    name: "Paul Volt",
    avatar: "https://i.pravatar.cc/150?img=7",

    distance: "30 miles away",
    price: 30,
    rating: 4.9,
    jobSuccess: "80%",
    description:
      "Experienced electrician with over 10 years in residential and commercial wiring, maintenance, and smart home installations.",
    skillsExperience:
      "Skilled in electrical systems, safety compliance, blueprint reading, and energy-efficient solutions. Proficient in diagnosing and repairing electrical issues efficiently.",
    projects: [
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=2",
      "https://i.pravatar.cc/150?img=3",
      "https://i.pravatar.cc/150?img=4",
    ],
    reviews: [
      {
        id: 1,
        name: "John F.",
        date: "Mar 29, 2025",
        rating: 5,
        comment:
          "Paul did a fantastic job rewiring our entire kitchen. Very professional and quick service!",
      },
      {
        id: 2,
        name: "Sarah L.",
        date: "Feb 20, 2025",
        rating: 5,
        comment:
          "Highly recommend! He explained everything clearly and fixed our panel issue in no time.",
      },
    ],
  },
  {
    id: 2,
    name: "Anna Sparks",
    avatar: "https://i.pravatar.cc/150?img=7",

    distance: "15 miles away",
    price: 25,
    rating: 4.8,
    jobSuccess: "92%",
    description:
      "Licensed electrician with a strong focus on eco-friendly solutions and home automation systems.",
    skillsExperience:
      "Expert in solar installations, LED retrofits, EV charger setups, and smart home devices.",
    projects: [
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=8",
      "https://i.pravatar.cc/150?img=9",
      "https://i.pravatar.cc/150?img=10",
    ],
    reviews: [
      {
        id: 1,
        name: "Carlos M.",
        date: "Jan 15, 2025",
        rating: 5,
        comment:
          "Anna installed our solar panels perfectly. Very knowledgeable.",
      },
    ],
  },
  {
    id: 3,
    name: "Mike Currents",
    avatar: "https://i.pravatar.cc/150?img=7",

    distance: "10 miles away",
    price: 40,
    rating: 5.0,
    jobSuccess: "100%",
    description:
      "Commercial electrician experienced in high-voltage systems and safety-critical environments.",
    skillsExperience:
      "Specialist in transformer installation, emergency lighting, and circuit protection systems.",
    projects: [
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=13",
    ],
    reviews: [],
  },
  {
    id: 4,
    name: "Lisa Wires",
    avatar: "https://i.pravatar.cc/150?img=9",
    distance: "8 miles away",
    price: 28,
    rating: 4.7,
    jobSuccess: "85%",
    description:
      "Reliable residential electrician known for clean, timely, and tidy work.",
    skillsExperience:
      "Great with lighting upgrades, fuse box replacements, and outlet installation.",
    projects: [
      "https://i.pravatar.cc/150?img=15",
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=5",
    ],
    reviews: [
      {
        id: 1,
        name: "Emily K.",
        date: "Dec 10, 2024",
        rating: 4.5,
        comment: "Lisa was friendly and fast. Clean install.",
      },
    ],
  },
  {
    id: 5,
    name: "Tom Charger",
    avatar: "https://i.pravatar.cc/150?img=7",

    distance: "22 miles away",
    price: 35,
    rating: 4.6,
    jobSuccess: "75%",
    description:
      "Focused on EV charger installations and energy upgrades for smart homes.",
    skillsExperience:
      "Capable of installing Level 2 chargers, smart thermostats, and energy meters.",
    projects: [],
    reviews: [],
  },
  {
    id: 6,
    name: "Nina Volt",
    avatar: "https://i.pravatar.cc/150?img=7",

    distance: "12 miles away",
    price: 32,
    rating: 4.9,
    jobSuccess: "95%",
    description:
      "Electrical engineer turned electrician delivering precision and neat wiring jobs.",
    skillsExperience:
      "Strong background in technical schematics, structured wiring, and cable management.",
    projects: ["https://i.pravatar.cc/150?img=1"],
    reviews: [
      {
        id: 1,
        name: "Mark Z.",
        date: "Nov 5, 2024",
        rating: 5,
        comment:
          "She solved a long-standing issue others couldn’t fix. Impressive.",
      },
    ],
  },
  {
    id: 7,
    name: "Leo Arc",
    avatar: "https://i.pravatar.cc/150?img=7",

    distance: "5 miles away",
    price: 26,
    rating: 4.4,
    jobSuccess: "70%",
    description:
      "Young and passionate, bringing energy and speed to basic electrical services.",
    skillsExperience:
      "Handles fixture replacements, appliance hookups, and quick diagnostics.",
    projects: [],
    reviews: [],
  },
];
const levels = ["Beginner", "Intermediate", "Expert"];
const languages = ["English", "Estonian", "Russian"];

export default function ProfessionalProfilePage() {
    const cookies = new Cookies();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [durationFilter, setDurationFilter] = useState<number[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);


    useEffect(() => {
      const metadata = cookies.get("session_metadata");
      if (metadata) {
        setCurrentUser(metadata);
      } else {
        setCurrentUser(null);
      }
    }, []);
      // Generate Gravatar URL based on email
      const getGravatarUrl = (email: string) => {
        const trimmedEmail = email.trim().toLowerCase();
        const hash = md5(trimmedEmail).toString();
        return `https://www.gravatar.com/avatar/${hash}?s=24&d=mp`; // s=24 for size, d=mp for default mystery person
      };
  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter((profile) => {
      return (
        (priceFilter.length === 0 || priceFilter.includes(profile.price)) &&
        (durationFilter.length === 0 ||
          durationFilter.length === 0) &&
        (languageFilter.length === 0 ||
          true) &&
        (levelFilter.length === 0) &&
        (ratingFilter === null || profile.rating >= ratingFilter)
      );
    });
  }, [priceFilter, durationFilter, languageFilter, levelFilter, ratingFilter]);

  const toggle = (value: any, setter: any, multiple = true) => {
    setter((prev: any[]) =>
      multiple
        ? prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
        : prev === value
        ? null
        : value
    );
  };

  const closeModal = () => setSelectedProfile(null);
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <>
      <header className="bg-[#f3f5f9] shadow-sm text-[#6D758F]">
              <div className="max-w-[1500px] mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-3xl font-bold text-gray-700">
                  <Image
                    src="/logo.svg"
                    width={100}
                    height={100}
                    alt="logo"
                    className="w-auto"
                  />
                </div>
    
                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-8 text-[#6D758F] font-medium">
                  <a href="#" className="hover:text-[#6D758F] transition">
                    Home
                  </a>
                  <a href="#" className="hover:text-[#6D758F] transition">
                    About
                  </a>
                  <a href="#" className="hover:text-[#6D758F] transition">
                    Services
                  </a>
                </nav>
    
                {/* Right Side */}
                <div className="flex items-center space-x-4">
                  {/* Profile */}
                  <div className="hidden md:flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm">
                    {currentUser ? (
                      <>
                        <img
                          src={getGravatarUrl(currentUser.email)}
                          // width={24}
                          // height={24}
                          alt="Profile"
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {currentUser.email || currentUser.email.split("@")[0]}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <span role="img" aria-label="user">
                            👤
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Guest
                        </span>
                      </>
                    )}
                    <ChevronDown size={14} className="text-gray-500" />
                  </div>
    
                  {/* Notification Icon */}
                  <div className="bg-white p-2 rounded-full shadow-sm hidden md:block">
                    <Bell className="text-blue-600 relative" size={18} />
                    <span className="absolute top-[10px] right-[90px] w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
    
                  {/* Hamburger Button */}
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-gray-200 p-2 rounded-full md:hidden"
                  >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>
    
              {/* Mobile Menu */}
              {menuOpen && (
                <div className="md:hidden px-4 pb-4">
                  <nav className="flex flex-col space-y-2 text-gray-700">
                    <a href="#" className="hover:text-gray-900">
                      Home
                    </a>
                    <a href="#" className="hover:text-gray-900">
                      About
                    </a>
                    <a href="#" className="hover:text-gray-900">
                      Services
                    </a>
                  </nav>
                </div>
              )}
            </header>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-[#6D758F]">
        {/* Sidebar */}
        {/* ... Filters remain unchanged ... */}
        <aside className="w-full md:w-72 border-r p-6 bg-white">
          <h2 className="text-lg font-bold mb-4">Filter</h2>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Price</h3>
            {[20, 25, 30, 35, 40].map((price) => (
              <label key={price} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={priceFilter.includes(price)}
                  onChange={() => toggle(price, setPriceFilter)}
                  className="mr-2"
                />
                €{price}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Duration</h3>
            {[1, 6, 17, 72].map((d) => (
              <label key={d} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={durationFilter.includes(d)}
                  onChange={() => toggle(d, setDurationFilter)}
                  className="mr-2"
                />
                {d}+ Hours
              </label>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Language</h3>
            {languages.map((lang) => (
              <label key={lang} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={languageFilter.includes(lang)}
                  onChange={() => toggle(lang, setLanguageFilter)}
                  className="mr-2"
                />
                {lang}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Service level</h3>
            {levels.map((lvl) => (
              <label key={lvl} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={levelFilter.includes(lvl)}
                  onChange={() => toggle(lvl, setLevelFilter)}
                  className="mr-2"
                />
                {lvl}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Review Rating</h3>
            {[5, 4, 3].map((r) => (
              <label key={r} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="rating"
                  checked={ratingFilter === r}
                  onChange={() => setRatingFilter(r)}
                  className="mr-2"
                />
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < r ? "text-purple-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </label>
            ))}
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Professional picks for you</h2>
            <div>
              <label className="mr-2 font-medium">Sorted by:</label>
              <select className="border rounded px-3 py-1 text-sm">
                <option>Recommended</option>
                <option>Price</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="border rounded-lg p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                    <div className="text-sm text-[#6D758F]">
                      {profile.distance}
                    </div>

                    <div className="flex items-center text-sm text-[#6D758F]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(profile.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2">
                        {profile.jobSuccess} Job Success
                      </span>
                    </div>
                    <div className="text-sm text-[#6D758F]">
                      {profile.description}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProfile(profile)}
                  className="bg-[#6D758F] text-white px-4 py-2 rounded-md text-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}

          {/* Modal */}
          {selectedProfile && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white rounded-2xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh] relative shadow-lg">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-6 text-xl font-bold text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProfile.avatar}
                      alt="avatar"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-[#6D758F]">
                        {selectedProfile.name}
                      </h2>
                      <div className="text-sm text-gray-500 flex gap-2 items-center">
                        <span>📍 {selectedProfile.distance}</span>
                        <span>⭐ {selectedProfile.rating}</span>
                        <span>{selectedProfile.jobSuccess} Job Success</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-blue-600">
                    €{selectedProfile.price}/hr
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Description
                  </h3>
                  <p className="text-sm text-[#6D758F]">
                    {selectedProfile.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Skills & Experience
                  </h3>
                  <p className="text-sm text-[#6D758F]">
                    {selectedProfile.skillsExperience}
                  </p>
                </div>

                {Array.isArray(selectedProfile.projects) &&
                  selectedProfile.projects.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Projects
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedProfile.projects.map(
                          (img: string, idx: number) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Project ${idx + 1}`}
                              className="rounded-lg w-full h-32 object-cover"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                {Array.isArray(selectedProfile.reviews) &&
                  selectedProfile.reviews.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Reviews
                      </h3>
                      <div className="space-y-4">
                        {selectedProfile.reviews.map((review: any) => (
                          <div
                            key={review.id}
                            className="border p-3 rounded-lg bg-gray-50"
                          >
                            <div className="flex justify-between text-sm text-[#6D758F]">
                              <span className="font-medium">{review.name}</span>
                              <span>{review.date}</span>
                            </div>
                            <div className="flex items-center mt-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-700">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
