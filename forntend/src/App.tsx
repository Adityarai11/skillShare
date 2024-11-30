import React from 'react';
import { Header } from './components/Header';
import { CourseGrid } from './components/CourseGrid';
import { courses } from './data/courses';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Featured Courses</h1>
          <p className="mt-2 text-gray-600">Expand your skills with our expert-led courses</p>
        </div>
        <CourseGrid courses={courses} />
      </main>
    </div>
  );
}

export default App;