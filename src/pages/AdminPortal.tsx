// src/pages/AdminPortal.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";

type TeamMemberForm = {
  name: string;
  role: string;
  yearOfService: string;
  description: string;
  image: FileList;
};

const AdminPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming logged in for simplicity
  const { register, handleSubmit, reset } = useForm<TeamMemberForm>();

  const onSubmit = async (data: TeamMemberForm) => {
    try {
      if (data.image[0]) {
        const imageFile = data.image[0];
        const storageRef = ref(storage, `team-images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);

        // Save Team Member Data in Firestore
        const teamRef = collection(db, "teamMembers");
        await addDoc(teamRef, {
          name: data.name,
          role: data.role,
          yearOfService: data.yearOfService,
          description: data.description,
          imageUrl: imageUrl,
        });

        reset(); // Reset the form after submission
        alert("Team member added successfully!");
      }
    } catch (error) {
      console.error("Error adding team member: ", error);
      alert("Failed to add team member. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoggedIn ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <h2 className="text-2xl font-semibold mb-4">Add Team Member</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Role
              </label>
              <input
                {...register("role", { required: "Role is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                type="text"
                placeholder="Role"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearOfService">
                Year of Service
              </label>
              <input
                {...register("yearOfService", { required: "Year of Service is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="yearOfService"
                type="text"
                placeholder="e.g., 2022 - 2024"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Description"
                rows={4}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Upload Image
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                accept="image/*"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Member
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h2>Please log in to access the Admin Portal.</h2>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
