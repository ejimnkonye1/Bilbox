import AllMovies from "./component/allmovies";
import MainLayout from "./component/MainLayout";


export default function Movies (){
    return(
        <MainLayout>
            <AllMovies isSidebarOpen={false} />
        </MainLayout>
    )
}