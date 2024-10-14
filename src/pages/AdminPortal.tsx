import React from "react";
import { useForm } from "react-hook-form";

type TeamMemberForm = {
  name: string;
  role: string;
  yearOfService: string;
  description: string;
  image: FileList;
};

const AdminPortal: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<TeamMemberForm>();

  const onSubmit = async (data: TeamMemberForm) => {
    // Temporarily skip Firebase logic for adding members.
    console.log(data);
    alert("Team member data collected successfully!");
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
        {/* Other form fields */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPortal;

