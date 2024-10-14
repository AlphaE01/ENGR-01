import React, { useEffect, useState } from 'react';

type TeamMember = {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
};

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Replace with the actual API endpoint to fetch team members
    fetch('/api/team-members')
      .then(response => response.json())
      .then(data => setTeamMembers(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-full h-64 object-cover" 
              onError={(e) => {
                e.currentTarget.src = '/images/default.jpg'; // Optional: Fallback image if the original image fails to load.
              }}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <h3 className="text-lg text-gray-600 mb-2">{member.role}</h3>
              <p className="text-gray-700">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
