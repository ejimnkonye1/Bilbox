import MainLayout from "./component/MainLayout";
import TvShow from "./component/allseries";
export default function Tv (){


    return(
        <MainLayout>
        <TvShow isSidebarOpen={false} />
      
     
      </MainLayout>
    )
}