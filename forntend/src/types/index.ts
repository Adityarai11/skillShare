export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  imageUrl: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
}