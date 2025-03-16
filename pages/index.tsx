import MainLayout from "./component/MainLayout";
import MovieCard from "./component/moviecard";
import MovieCardSeries from "./component/series";

export default function Home() {
  return (
    <MainLayout>
      <MovieCard isSidebarOpen={false}  />
      <MovieCardSeries isSidebarOpen={false} />
    </MainLayout>
  );
}