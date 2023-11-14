import styles from "./Simulator.module.css"
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { useEffect, useState,useReducer } from "react";
import { Client } from 'paho-mqtt';


// import mqtt from "mqtt"





export default function Simulator(){
  const [machineState, setMachineState] = useState({
    simulatorColors: ['initialColor1', 'initialColor2'],
    machineNumbers: [0, 0],
    timeOuts: [0, 0],
  });
  //  const [messageArray,setMessageArray]=useState([]);

  const updateMachine = (i, color, number, timeout) => {
    setMachineState((prevState) => ({
      ...prevState,
      simulatorColors: prevState.simulatorColors.map((prevColor, index) =>
        index === i ? color : prevColor
      ),
      machineNumbers: prevState.machineNumbers.map((prevNumber, index) =>
        index === i ? number : prevNumber
      ),
      timeOuts: prevState.timeOuts.map((prevTimeout, index) =>
        index === i ? timeout : prevTimeout
      ),
    }));
  };
   useEffect(()=>{
      mqttConnection();
    
   },[machineState.machineNumbers])
  

   useEffect(()=>{
  
      LoadingMqtt();
   },[])

   const mqttConnection=()=>{
    const broker = 'broker.emqx.io'; // Replace with your MQTT broker URL
      
    // Replace with your MQTT password
 
     const client = new Client(broker,8083, 'SIDDHI-DH'); // Replace with your MQTT broker details
 
     client.onConnectionLost = (responseObject) => {
       if (responseObject.errorCode !== 0) {
         console.log('Connection lost:', responseObject.errorMessage);
       
       }
     };
 
     client.connect({
       onSuccess: onConnect,
      
     });
 
     client.onMessageArrived = (message) => {
       console.log('Message received on topic:', message.destinationName);
       console.log('Payload:', message.payloadString);
       if ( message.payloadString.includes('*') && message.payloadString.includes('#')) 
         {
           console.log(1);
              var myArray = message.payloadString.split(',');
               if (myArray.length >1)
               {
                 var messageUnit = myArray[0];
                 messageUnit = messageUnit.replace('*', '');
                 myArray[1] = myArray[1].replace('#', '');
                 var Sequence=0;
           
                 for (var i = 0 ; i < 2 ; i++)
                 {
                   console.log(messageUnit,machineState.machineNumbers[i]);
                   if (messageUnit == machineState.machineNumbers[i])
                     {
                       Sequence = i;
                       
                       if (machineState.timeOuts[Sequence] > 0)
                       {    
                        console.log("green");
                        updateMachine(i, 'green',machineState.machineNumbers[i], 130);
  

                         console.log(2);
                         
                          // messageArray[Sequence] = { "payload": (machineNumbers[Sequence]) + '  ' + (timeOuts[Sequence].toString()) , "color":'green' };
                          // setMessageArray(messageArray);
                        }    
                      }
                        else{
            
                         }   
                   }
               }
         }
         else{
           
         }
    
       // Handle the MQTT message here
     };

     function onConnect(){
       console.log('Connected to MQTT broker');
       // Subscribe to a topic
       client.subscribe('GVC/VM/#');
     //   for (var i = 0; i < Length; i++) {
     //     if (timeOuts[i] > 0)
     //     {
     //         timeOuts[i]--;
     //         setTimeouts(timeOuts);
     //         localStorage.setItem("TimeOuts",JSON.stringify(timeOuts));  
     //     }
     //     if (machineNumbers[i] == 0)
     //     {
     //         simulatorColors[i] = 'black';
     //         localStorage.setItem("SimulatorColors",JSON.stringify(simulatorColors));    
     //     }
     //     // else if (timeOuts[i] == 0)
     //     // {    
     //     //     message.payloadString = '*' + machineNumbers[i] + ',SUM,BEN,3,0,0,0,0,0#';
     //     //     msgArray[i] = {'color':'orange'};
     //     //     simulatorColors[i] = 'orange';
     //     //     localStorage.setItem("SimulatorColors",JSON.stringify(simulatorColors));    
     //     //     timeOuts[i] = WarningTime;   
     //     //     localStorage.setItem("TimeOuts",JSON.stringify(timeOuts));    
     //     //     msgArray[i] = { "payload": (machineNumbers[i]) + '  ' + (timeOuts[i].toString()), "color": simulatorColors[i] };    
     //     //     // return [msg, msgArray[0], msgArray[1], msgArray[2], msgArray[3], msgArray[4], msgArray[5], msgArray[6], msgArray[7], msgArray[8], msgArray[9], msgArray[10], msgArray[11], msgArray[12], msgArray[13], msgArray[14], msgArray[15]];
     //     // }
           
     //     msgArray[i] = { "payload": (machineNumbers[i]) + '  '+ (timeOuts[i].toString()) , "color": simulatorColors[i] };    
     // }
     }

     return () => {
       // client.disconnect();
     };

   }
    
    const LoadingMqtt=()=>{
     
    
        // localStorage.setItem("WarningTime",130);
   
        // var MachineNumbers=JSON.parse(localStorage.getItem("MachineNumbers")) || machineNumbers;
        // console.log(MachineNumbers);
        // setMachineNumber(MachineNumbers);
     
        // var simulator_colors=JSON.parse(localStorage.getItem("SimulatorColors")) || simulatorColors;
        // console.log(simulator_colors);
        // setSimulatorColors(simulator_colors);
      
        // var timeouts=JSON.parse(localStorage.getItem("TimeOuts")) || timeOuts;
        // setTimeouts(timeouts);
      
  }
 let intervalId;
  useEffect(() => {
    // Check the condition and clear the interval if necessary
    if (machineState.timeOuts[0] < 0) {
      clearInterval(intervalId);
    }
  }, [machineState.timeOuts[0]]); 
    

  const Machine1Change = (e) => {
    let i=0;
    updateMachine(i, 'blue', parseInt(e.target.value), 130);

    if (e.target.value.length >= 4) {
       intervalId = setInterval(() => {
        setMachineState((prevState) => ({
          ...prevState,
          timeOuts: prevState.timeOuts.map((prevTimeout, index) =>
            index === i ? prevTimeout - 1 : prevTimeout
          ),
        }));
      }, 1000);
     
      // Clear the interval when the countdown is done
    
    }
  };
  

   
  const Machine2Change = (e) => {
    let i=1;
    updateMachine(i, 'blue', parseInt(e.target.value), 130);

    if (e.target.value.length >= 4) {
       intervalId = setInterval(() => {
        setMachineState((prevState) => ({
          ...prevState,
          timeOuts: prevState.timeOuts.map((prevTimeout, index) =>
            index === i ? prevTimeout - 1 : prevTimeout
          ),
        }));
      }, 1000);
    
   
    }
   
    
  };
  

return <>

    <div className={styles.mainContainer}>
<div className={styles.container}>
        <div className={styles.header}>
          <p>Start Stop</p>

        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machineState.simulatorColors[0]}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}} >{`${machineState.machineNumbers[0]} ${machineState.timeOuts[0]}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machineState.simulatorColors[1]}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machineState.machineNumbers[1]} ${machineState.timeOuts[1]}`}</Button>
        </div>
        {/* <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine3.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine3.machine_number}${machine3.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine4.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine4.machine_number}${machine4.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine5.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine5.machine_number}${machine5.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine6.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine6.machine_number}${machine6.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine7.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine7.machine_number}${machine7.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine8.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine8.machine_number}${machine8.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine9.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine9.machine_number}${machine9.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine10.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine10.machine_number}${machine10.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine11.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine11.machine_number}${machine11.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine12.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine12.machine_number}${machine12.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine13.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine13.machine_number}${machine13.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine14.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine14.machine_number}${machine14.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine15.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine15.machine_number}${machine15.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine16.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine16.machine_number}${machine16.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine17.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine17.machine_number}${machine17.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine18.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine18.machine_number}${machine18.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine19.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine19.machine_number}${machine19.value}`}</Button>
        </div>
        <div className={styles.buttonBox}>
        <Button variant="contained" sx={{backgroundColor:`${machine20.bgColor}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}}>{`${machine20.machine_number}${machine20.value}`}</Button>
        </div> */}
      
      
</div>

      

    <div className={styles.container}>
    <div className={styles.header}>
          <p>Machine Number</p>

        </div>
     
        <div className={styles.rowContainer}>
        <TextField
          id="standard-multiline-flexible"
          label="Machine 1"
          type="text"
          multiline
          maxRows={4}
          variant="standard"
        
          onChange={(e)=>Machine1Change(e)}
        
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 2"
          type="text"
          multiline
          maxRows={4}
    
          onChange={(e)=>Machine2Change(e)}
          variant="standard"
        />
           {/* <TextField
          id="standard-multiline-flexible"
          label="Machine 3"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 4"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 5"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 6"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 7"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 8"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 9"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 10"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 11"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 12"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 13"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 14"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 15"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 16"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 17"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 18"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 19"
          multiline
          maxRows={4}
          variant="standard"
        />
           <TextField
          id="standard-multiline-flexible"
          label="Machine 20"
          multiline
          maxRows={4}
          variant="standard"
        /> */}
         

        </div>
      



    </div>



    </div>

    
    </>
}