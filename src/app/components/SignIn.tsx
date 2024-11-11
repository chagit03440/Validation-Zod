"use client"
import React, { useState } from 'react';
import UserSchema from "@/app/types/UserSchema";
import { z } from 'zod';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    isAdmin: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: '',
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    try {
      UserSchema.parse({
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        isAdmin: formData.isAdmin,
      });
      setErrors({ name: '', email: '', age: '' });
      console.log('Form submitted successfully:', formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = { name: '', email: '', age: '' };
        err.errors.forEach((error) => {
          if (error.path[0] === 'name') newErrors.name = error.message;
          if (error.path[0] === 'email') newErrors.email = error.message;
          if (error.path[0] === 'age') newErrors.age = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign In Form</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="Enter your age"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 text-sm font-bold mr-2">Admin:</label>
          <input
            type="checkbox"
            checked={formData.isAdmin}
            onChange={() => handleChange('isAdmin', !formData.isAdmin)}
            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
