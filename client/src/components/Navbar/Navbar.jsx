import React, {useContext, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import styles from "./navbar.module.css"
import {SlMenu} from 'react-icons/sl'
import {FiLogOut} from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import gvc from "../../assets/GVC corp logo.png";


const Navbar = () => {
  
    const firstFieldRef = React.useRef(null)
    const navigate=useNavigate();

    const [activeDropdown, setActiveDropdown] = useState(false);
    const logout=()=>{
       sessionStorage.removeItem('token');
        navigate("/");
    }

    return <>
     <div className={styles.navbar}>
        <div>
          <SlMenu/>
          {/* <div>
          <img style={{width:'150px',height:'50px'}} src={gvc} />
         </div> */}
          <p>Online Simulator</p>
          </div>
          <div style={{cursor:'pointer'}} onClick={logout}>
            <FiLogOut/>
          </div>


     </div>
    
    
    </>
};

export default Navbar;