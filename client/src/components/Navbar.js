import {Link} from 'react-router-dom';

const Navbar = () =>{
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
                
                    <Link to="/signOut"><li>LogOut</li></Link>
               </div>
               )
               
            }
            
        </div>
    )
}

export default Navbar;