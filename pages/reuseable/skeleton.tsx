import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MovieSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="rounded-lg overflow-hidden relative">
          {/* Image Placeholder with responsive height */}
          <Skeleton  className="w-full h-40 md:h-56 lg:h-64" /> {/* Adjust height for small screens */}
          <div className="p-4">
            {/* Title Placeholder */}
            <Skeleton height={16} width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
}