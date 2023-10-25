import React, {useContext, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import styles from "./navbar.module.css"
import {SlMenu} from 'react-icons/sl'
import {FiLogOut} from 'react-icons/fi'
// import {UserContext} from "../../context/AuthContext";
// import {
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
//     PopoverHeader,
//     PopoverBody,
//     PopoverFooter,
//     PopoverArrow,
//     PopoverCloseButton,
//     PopoverAnchor,
//     Button,
//     useDisclosure,
// } from '@chakra-ui/react'


const Navbar = () => {
    // const {user} = useContext(UserContext);
    // const {onOpen, onClose, isOpen} = useDisclosure()
    const firstFieldRef = React.useRef(null)


    const [activeDropdown, setActiveDropdown] = useState(false);


    return <>
     <div className={styles.navbar}>
        <div>
          <SlMenu/>
          <p>Online Simulator</p>
          </div>
          <div >
           {/* <Link to={"/login"} style={{color:'#ffffff'}}>  <FiLogOut/></Link> */}
          </div>


     </div>
    
    
    </>
};

export default Navbar;