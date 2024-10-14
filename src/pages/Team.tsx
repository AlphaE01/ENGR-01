// src/pages/AdminPortal.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";

const AdminPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    // Handle Image Upload
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
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Add Team Member</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="Name" required />
            <input {...register("role")} placeholder="Role" required />
            <input {...register("yearOfService")} placeholder="Year of Service" required />
            <textarea {...register("description")} placeholder="Description" required />
            <input {...register("image")} type="file" accept="image/*" required />
            <button type="submit">Add Member</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Admin Login</h2>
          {/* Add login form here */}
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
