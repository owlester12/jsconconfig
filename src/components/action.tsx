import React from 'react'
import { actionProps } from '../interface'
import DeleteIcon from '@mui/icons-material/Delete';


const Action:React.FC<actionProps> = ({act, change, del, ind, validName}) => {

 
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(validName);
        change(ind, "name", e.target.value);
      }
    const handleType = (e: string) => {
        change(ind, "type", e);
    }
    const handleInstruction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        change(ind,"instruction", e.target.value);
    }




 


  return (
    <div className = 'pb-9 flex flex-row items-center '>
        <div className = 'flex-1'>
          <div className = "flex flex-row justify-around">
            <div>
              <div className='inputBox'>
                <input type = "text" onChange = {handleName} value={act.name} required/>
                <span>Name</span>
                <i  className = {`${!validName ? "invalid" : "valid"}`}/>
              </div>
              <div className = {`${act.type === "SubmitBotInstruction" ? "" : "opacity-0"} flex justify-around mt-1`}>
                <div className='inputBox '>
                  {act.type === "SubmitBotInstruction" ?
                  <textarea  className='mt-2' onChange = {handleInstruction} value = {act.instruction} required rows = {2}  /> :
                  <textarea  rows = {2} readOnly />
                  }
                  <span>Instruction</span>
                  <i className = "valid"/>
               </div>
              </div>
            </div>

            <div className='' >
              <span className = "selector uppercase">Type</span>
                <div>
                  <div className = {`${act.type === "AcceptOffer" ? "selected" : "unselected"} tracking-widest duration-300 font-semibold cursor-pointer hover:underline m-2`} onClick = {() => handleType("AcceptOffer")}> AcceptOffer </div>
                  <div className = {`${act.type === "RejectOffer" ? "selected" : "unselected"} tracking-widest duration-300 font-semibold cursor-pointer hover:underline m-2`} onClick = {() => handleType("RejectOffer")}> RejectOffer </div>
                  <div className = {`${act.type === "SubmitBotInstruction" ? "selected" : "unselected"} tracking-widest duration-300 font-semibold cursor-pointer hover:underline m-2`} onClick = {() => handleType("SubmitBotInstruction")}> SubmitBotInstruction </div>
                </div>

        
            </div>
          </div>
        </div>
        <DeleteIcon className='text-red-700 cursor-pointer text-3xl' onClick = {() => del(ind)}/>
    </div>
  )
}

export default Action