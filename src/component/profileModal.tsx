import React from "react";

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
};

type mockProfiles = {
  name: string;
  avatar: string;
  distance: string;
  price: number;
  rating: number;
  jobSuccess: string;
  description: string;
  skillsExperience: string;
  projects: string[];
  reviews: Review[];
};

type Props = {
  mockProfiles: mockProfiles;
  onClose: () => void;
};

const mockProfilesModal: React.FC<Props> = ({ mockProfiles, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={mockProfiles.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {mockProfiles.name}
              </h2>
              <div className="text-sm text-gray-500 flex gap-2 items-center">
                <span>📍 {mockProfiles.distance}</span>
                <span>⭐ {mockProfiles.rating}</span>
                <span>{mockProfiles.jobSuccess} Job Success</span>
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-600">
            €{mockProfiles.price}/hr
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-sm text-gray-600">{mockProfiles.description}</p>
        </div>

        {/* Skills & Experience */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-1">
            Skills & Experience
          </h3>
          <p className="text-sm text-gray-600">{mockProfiles.skillsExperience}</p>
        </div>

        {/* Projects */}
        {mockProfiles.projects.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <img
                src="/images/project-icon.png"
                alt="projects"
                className="w-5 h-5"
              />
              Projects
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {mockProfiles.projects.map((src, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-2 flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`project-${i}`}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        {mockProfiles.reviews.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {mockProfiles.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
                      👤
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-gray-500 text-xs">
                        {review.date} –{" "}
                        <span className="text-pink-500">★ {review.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 flex justify-end">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default mockProfilesModal;
