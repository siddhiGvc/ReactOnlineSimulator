import { useEffect } from "react"
import Simulator1 from "../../components/simulator/Simulator1"
import Simulator2 from "../../components/simulator/Simulator2"
import styles from "./home.module.css"
import { useNavigate } from "react-router-dom"
export default function Home(){

    const navigate=useNavigate();
    
    useEffect(()=>{
        const token=sessionStorage.getItem('token');
        if(!token)
        {
            navigate("/");
        }
    })


    return <>
    <div className={styles.container} >
       <Simulator1/>
       <Simulator2/>

    </div>

    
    </>
}