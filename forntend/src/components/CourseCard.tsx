import React from 'react';
import { api } from '../services/api';

interface CourseProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const CourseCard: React.FC<CourseProps> = ({ id, title, description, price, imageUrl }) => {
  const handlePurchase = async () => {
    try {
      await api.post('/course/purchase', { courseId: id });
      alert('Course purchased successfully!');
    } catch (error) {
      alert('Failed to purchase course');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">${price}</span>
          <button 
            onClick={handlePurchase}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;