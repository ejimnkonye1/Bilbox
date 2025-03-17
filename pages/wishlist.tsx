
import MainLayout from "./component/MainLayout";
import Wishlist from "./component/wishlist";


export default function AllWishlist (){
    return(
        <MainLayout>
            <Wishlist isSidebarOpen={false} />
        </MainLayout>
    )
}