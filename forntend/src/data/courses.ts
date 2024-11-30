import { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    description: 'Learn full-stack web development from scratch. Cover HTML, CSS, JavaScript, React, Node.js, and more.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Advanced React & Redux Masterclass',
    instructor: 'Michael Chen',
    description: 'Master React.js and Redux with advanced patterns, hooks, and state management techniques.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    duration: '8 weeks',
    level: 'Advanced',
    rating: 4.9
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emma Davis',
    description: 'Learn the principles of user interface and user experience design. Create beautiful and functional designs.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    duration: '10 weeks',
    level: 'Intermediate',
    rating: 4.7
  }
];