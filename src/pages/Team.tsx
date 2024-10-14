// src/pages/Team.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

type TeamMember = {
  name: string;
  role: string;
  yearOfService: string;
  description: string;
  imageUrl: string;
};

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "teamMembers"));
        const members = querySnapshot.docs.map((doc) => doc.data() as TeamMember);
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members: ", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <h3 className="text-lg text-gray-600 mb-2">{member.role}</h3>
              <p className="text-gray-500 mb-2">Year of Service: {member.yearOfService}</p>
              <p className="text-gray-700">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
