import {Link} from 'react-router-dom';

const Navbar = () =>{
    
    const handleRefresh = () => {
       window.location.reload();
    }
    return(
        <div className="NavBar">
             {!localStorage.getItem('user')?
               (
                <div className="nav-items">
                    <Link to="/"><li>Home</li></Link>
                
                    <Link to="/signIn"><li>LogIn</li></Link>
                
               </div>
               
               ):(
                <div className="nav-items">
                    <Link to="/"><li>Home</li></Link>
                
                    <Link to="/signOut" onClick={handleRefresh}><li>LogOut</li></Link>
               </div>
               )
               
            }
            
        </div>
    )
}

export default Navbar;
