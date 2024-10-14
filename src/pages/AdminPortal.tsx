import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  year: string;
};

type LoginForm = {
  username: string;
  password: string;
};

const AdminPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { register, handleSubmit, reset } = useForm<TeamMember>();
  const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm<LoginForm>();

  useEffect(() => {
    // Fetch initial team member data (replace with an actual API call)
    fetch('/api/team-members')
      .then(response => response.json())
      .then(data => setTeamMembers(data));
  }, []);

  // Login handler to check username and password
  const onLoginSubmit = (data: LoginForm) => {
    if (data.username === 'admin' && data.password === 'password123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  // Form submission handler for adding/editing team members
  const onSubmit = (data: TeamMember) => {
    if (editingMember) {
      // Update an existing member (replace with an actual API call)
      setTeamMembers(prevMembers =>
        prevMembers.map(member => (member.id === editingMember.id ? data : member))
      );
    } else {
      // Add a new member (replace with an actual API call)
      setTeamMembers([...teamMembers, { ...data, id: Date.now().toString() }]);
    }
    reset();
    setEditingMember(null);
  };

  // Handle editing of a team member
  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    reset(member);
  };

  // Handle deleting of a team member
  const handleDelete = (id: string) => {
    // Delete a member (replace with an actual API call)
    setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              {...registerLogin('username', { required: 'Username is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...registerLogin('password', { required: 'Password is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      <h3 className="text-2xl font-bold mb-4">{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            {...register('role', { required: 'Role is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
            Year of Service
          </label>
          <input
            {...register('year', { required: 'Year of service is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="year"
            type="text"
            placeholder="e.g., 2022 - 2024"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            {...register('imageUrl', { required: 'Image URL is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {editingMember ? 'Update Member' : 'Add Member'}
        </button>
        {editingMember && (
          <button
            type="button"
            onClick={() => setEditingMember(null)}
            className="ml-4 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h3 className="text-2xl font-bold mb-4">Team Members</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map(member => (
          <div key={member.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-64 object-cover mb-4"
              onError={(e) => {
                e.currentTarget.src = '/images/default.jpg'; // Optional fallback image
              }}
            />
            <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
            <h3 className="text-lg text-gray-600 mb-2">{member.role}</h3>
            <p className="text-gray-700 mb-2">Year of Service: {member.year}</p>
            <p className="text-gray-700 mb-4">{member.description}</p>
            <button
              onClick={() => handleEdit(member)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(member.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortal;
