import Simulator1 from "../../components/simulator/Simulator1"
import Simulator2 from "../../components/simulator/Simulator2"
import styles from "./home.module.css"

export default function Home(){
    return <>
    <div className={styles.container} >
       <Simulator1/>
       <Simulator2/>

    </div>

    
    </>
}