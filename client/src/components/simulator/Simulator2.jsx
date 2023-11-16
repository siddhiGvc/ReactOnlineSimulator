// import styles from "./Simulator.module.css"
// import Button from '@mui/material/Button';
// import { TextField } from "@mui/material";
// import { useEffect, useState,useReducer } from "react";
// import { Client } from 'paho-mqtt';


// // import mqtt from "mqtt"





// export default function Simulator2(){
//   let Length=20;
//   const [machine_State, setMachine_State] = useState({
//     simulator_Colors: Array.from({ length: Length }, (_, index) => `${'initialColor'}`),
//     machine_Numbers: Array.from({ length: Length }, (_, index) => `${0}`),
//     time_Outs: Array.from({ length: Length }, (_, index) => `${0}`),
//   });
//   //  const [messageArray,setMessageArray]=useState([]);

//   const updateMachine = (i, color, number, timeout) => {
//     setMachine_State((prevState) => ({
//       ...prevState,
//       simulator_Colors: prevState.simulator_Colors.map((prevColor, index) =>
//         index === i ? color : prevColor
//       ),
//       machine_Numbers: prevState.machine_Numbers.map((prevNumber, index) =>
//         index === i ? number : prevNumber
//       ),
//       timeOuts: prevState.time_Outs.map((prevTimeout, index) =>
//         index === i ? timeout : prevTimeout
//       ),
//     }));
//   };
//    useEffect(()=>{
//       mqttConnection();
    
//    },[machine_State.machine_Numbers])
  

  
//    const mqttConnection=()=>{
//     const broker = 'broker.emqx.io'; // Replace with your MQTT broker URL
      
//     // Replace with your MQTT password
 
//      const client = new Client(broker,8083, 'SIDDHI-DH'); // Replace with your MQTT broker details
 
//      client.onConnectionLost = (responseObject) => {
//        if (responseObject.errorCode !== 0) {
//          console.log('Connection lost:', responseObject.errorMessage);
       
//        }
//      };
 
//      client.connect({
//        onSuccess: onConnect,
      
//      });

    
//      client.onMessageArrived = (message) => {
//        console.log('Message received on topic:', message.destinationName);
//        console.log('Payload:', message.payloadString);
//        if ( message.payloadString.includes('*') && message.payloadString.includes('#')) 
//          {
//            console.log(1);
//               var myArray = message.payloadString.split(',');
//                if (myArray.length >1)
//                {
//                  var messageUnit = myArray[0];
//                  messageUnit = messageUnit.replace('*', '');
//                  myArray[1] = myArray[1].replace('#', '');
//                  var Sequence=0;
           
//                  for (let i = 0 ; i < Length ; i++)
//                  {
                 
//                        Sequence = i;
//                        let updatedSimulatorColors;
//                        let updatedTimeouts;
                   
                      
//                             setMachine_State((prevState) => {
                          
//                              console.log(prevState.machine_Numbers[i]);
//                               if (messageUnit == prevState.machine_Numbers[i])
//                               {
                                
//                                 console.log("green");
//                                 updatedSimulatorColors = prevState.simulator_Colors.map((prevColor, index) =>
//                                 index === i ? 'green': prevColor
//                               );
//                                 updatedTimeouts = prevState.time_Outs.map((prevTimeout, index) =>
//                                   index === i ? 0: prevTimeout
//                                 );
                              
//                               }
//                               else{
//                                  updatedSimulatorColors=prevState.simulator_Colors;
//                                  updatedTimeouts=prevState.time_Outs;
                               
//                               }

//                               return {
//                                 ...prevState,
//                                 simulator_Colors:updatedSimulatorColors,
//                                 time_Outs:updatedTimeouts
//                               }; 
                        
                          
//                             });
  

//                         //  console.log(2);
                         
//                           // messageArray[Sequence] = { "payload": (machineNumbers[Sequence]) + '  ' + (timeOuts[Sequence].toString()) , "color":'green' };
//                           // setMessageArray(messageArray);
                          
                    
//                    }
//                }
//          }
//          else{
           
//          }
    
//        // Handle the MQTT message here
//      };

//      function onConnect(){
//        console.log('Connected to MQTT broker');
//        // Subscribe to a topic
//        client.subscribe('GVC/VM/#');
//      //   for (var i = 0; i < Length; i++) {
//      //     if (timeOuts[i] > 0)
//      //     {
//      //         timeOuts[i]--;
//      //         setTimeouts(timeOuts);
//      //         localStorage.setItem("TimeOuts",JSON.stringify(timeOuts));  
//      //     }
//      //     if (machineNumbers[i] == 0)
//      //     {
//      //         simulatorColors[i] = 'black';
//      //         localStorage.setItem("SimulatorColors",JSON.stringify(simulatorColors));    
//      //     }
//      //     // else if (timeOuts[i] == 0)
//      //     // {    
//      //     //     message.payloadString = '*' + machineNumbers[i] + ',SUM,BEN,3,0,0,0,0,0#';
//      //     //     msgArray[i] = {'color':'orange'};
//      //     //     simulatorColors[i] = 'orange';
//      //     //     localStorage.setItem("SimulatorColors",JSON.stringify(simulatorColors));    
//      //     //     timeOuts[i] = WarningTime;   
//      //     //     localStorage.setItem("TimeOuts",JSON.stringify(timeOuts));    
//      //     //     msgArray[i] = { "payload": (machineNumbers[i]) + '  ' + (timeOuts[i].toString()), "color": simulatorColors[i] };    
//      //     //     // return [msg, msgArray[0], msgArray[1], msgArray[2], msgArray[3], msgArray[4], msgArray[5], msgArray[6], msgArray[7], msgArray[8], msgArray[9], msgArray[10], msgArray[11], msgArray[12], msgArray[13], msgArray[14], msgArray[15]];
//      //     // }
           
//      //     msgArray[i] = { "payload": (machineNumbers[i]) + '  '+ (timeOuts[i].toString()) , "color": simulatorColors[i] };    
//      // }
//      }
    
    

//      return () => {
//        // client.disconnect();
//      };

//    }
    
//     const sendMqtt=(machine_number,i)=>{
//       const broker = 'broker.emqx.io'; // Replace with your MQTT broker URL
//        console.log(1);
//       // Replace with your MQTT password
   
//        const client = new Client(broker,8083, 'SIDDHI-DH');
//        const topic = 'GVC/VM/90000'; // Replace with your desired topic
//        const message = `*${machine_number},SUM,BEN,3,0,0,0,0,#`; // Replace with your message
      
       
//        const onConnect = () => {
//         console.log('Connected to MQTT broker');
//               setMachine_State((prevState) => {
//           const updatedSimulatorColors = prevState.simulator_Colors.map((prevColor, index) =>
//             index === i ? 'orange': prevColor
//           );
//             return {
//             ...prevState,
//             simulator_Colors:updatedSimulatorColors,
//           };   });
//         // Publish the message after a successful connection
//         client.publish(topic, message, 0, false);
//       };
    
//       client.onConnectionLost = (responseObject) => {
//         if (responseObject.errorCode !== 0) {
//           console.log('Connection lost:', responseObject.errorMessage);
//         }
//       };
    
//       // Connect to the broker with the onConnect callback
//       client.connect({
//         onSuccess: onConnect,
//       });
      

    
     
//     }

    
//   const Machine1Change = (e,i) => {
  
//     updateMachine(i, 'blue', parseInt(e.target.value), 130);
//     let intervalId1;
 
//     if (e.target.value.length == 4 && machine_State.time_Outs[i]>0) {
//      intervalId1 = setInterval(() => {
    

//         setMachine_State((prevState) => {
//           let updatedTimeouts = prevState.time_Outs.map((prevTimeout, index) =>
//             index === i ? prevTimeout - 1 : prevTimeout
//           );
//           if (!(e.target.value.length === 4 && prevState.time_Outs[i] > 0)) {
//             clearInterval(intervalId1);
//              updatedTimeouts = prevState.time_Outs.map((prevTimeout, index) =>
//             index === i ? 130 : prevTimeout
//           );
//           }

//           else if (updatedTimeouts[i] <= 0) {
//             clearInterval(intervalId1);
            
//             console.log(machine_State.simulator_Colors[i]);
          
//             if(prevState.simulator_Colors[i]!='green')
//             {
//               sendMqtt(e.target.value,i);
            
//             }
            
            
         
//           }
    
//           return {
//             ...prevState,
//             time_Outs: updatedTimeouts,
//           };
//         });
//       }, 1000);
    
    
//     }
//     else
//     {
//       clearInterval(intervalId1)
//     }
//   };
  

   
 
  

// return <>

//     <div className={styles.mainContainer}>
// <div className={styles.container}>
//         <div className={styles.header}>
//           <p>Start Stop</p>

//         </div>
//         {machine_State.simulator_Colors.map((elem,i)=>{
//            return  <div className={styles.buttonBox}>
//         <Button variant="contained" sx={{backgroundColor:`${machine_State.simulator_Colors[i]}`,position:"static",width:"100%",margin:"auto",height:"40px",fontSize:"100%",fontWeight:"400"}} >{`${machine_State.machine_Numbers[i]} ${machine_State.time_Outs[i]}`}</Button>
//         </div>

//         })}
     
      
      
// </div>

      

//     <div className={styles.container}>
//     <div className={styles.header}>
//           <p>Machine Number</p>

//         </div>
     
//         <div className={styles.rowContainer}>
//           {machine_State.simulator_Colors.map((elem,i)=>{
//              return <TextField
//               id="standard-multiline-flexible"
//               label={`Machine ${i+1}`}
//               type="text"
//               multiline
//               maxRows={4}
//               variant="standard"
            
//               onChange={(e)=>Machine1Change(e,i)}
            
//             />

//           })}
      
       
        

//         </div>
      



//     </div>



//     </div>

    
//     </>
// }