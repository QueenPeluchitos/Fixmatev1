import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout=()=>{
    return (
        <>  
            <Sidebar/>         
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}
export default Layout;