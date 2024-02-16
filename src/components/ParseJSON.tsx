import React from 'react'
import { jsonProps, action } from '../interface'
import { useState } from 'react'
import Action from './action'

const ParseJSON:React.FC<jsonProps> = ({config}) => {

  const[name, setName] = useState<string>(config.name);
  const[version, setVersion] = useState<string>(config.version);
  const[action, setActions] = useState<action[]>(config.actions);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVersion(e.target.value);
  }

  const handleAction = (ind:number, target:string, val:string) => {
    setActions((prevActions) => {
      return prevActions.map((item, i) => {
        if (i === ind &&  (target !== "type" || val === "SubmitBotInstruction")) {
          return {
            ...item,
            [target]: val,
          };
        } else if(i === ind) {
          return {
            name: item.name,
            type: val
          };
        } 
        return item;

      });
    });
  }

  const addAction = () => {
    setActions((prevActions) => [...prevActions, { name: "", type: "AcceptOffer" }]);
  }

  const deleteAction = (ind: number) => {
    setActions((prevActions) => {
      return prevActions.filter((_, i) => i !== ind);
    });
  };

  const validName = (name: string, ind:number) => {
    for(let a = 0; a< action.length; a++){
      if(action[a].name === name && a !== ind){
        return false;
      }
    }
    return true;
  }

  const canSubmit = () => {
    for(let a = 0; a < action.length; a++){
      if(!validName(action[a].name, a)){
        return false;
      }
    }
    return true;
  }

  const submit = () => {
    if(canSubmit()){
      console.log(JSON.stringify({
        "name": name,
        "version": version,
        "actions": action
      }))
    }
  }




  return (
    <div className = "flex md:flex-row flex-col ml-3 pb-8">
      <div className = "flex-1">
        <div className = "uppercase text-3xl tracking-widest text-center p-5">
          Config File 
        </div>
        <div className = "flex flex-row justify-around">
          <div className='inputBox'>
            <input type = "text" id = "configName" onChange = {handleName} value={name} required/>
            <span> name </span>
            <i className = "valid"/>
          </div>
          <div className='inputBox'>
            <input type = "text" id = "version" onChange = {handleVersion} value={version} required/>
            <span> version </span>
            <i className = "valid"/>
          </div>
        </div>
        <div className = "uppercase text-xl tracking-widest text-center p-5 mt-8"> Actions </div>
        <div>
          {action.map((item, index) => (
            <Action ind={index} act = {item} change ={handleAction} del={deleteAction} validName={validName(item.name, index)}  />
          ))}
        </div>
        <div className='flex justify-around'>
          <div className = "text-white px-5 py-3 uppercase tracking-widest rounded-md bg-green-500 hover:bg-green-700 duration-300 cursor pointer border-transparent hover:border-black border-[1px] cursor-pointer text-xl"onClick = {addAction}>
            Add
          </div>
          <div className = {`${canSubmit() ? " hover:bg-black cursor-pointer" : "opacity-30"} text-white px-5 py-3 bg-gray-800 uppercase tracking-widest rounded-md  duration-300 cursor pointer   text-xl`}onClick = {submit}>
            Submit
          </div>
        </div>
      </div>
      <div className = "flex-1 tracking-wider p-10 pt-20 md:max-w-[40%]">
        {"{"}
        <div className='ml-5'>
         {"\"name\": \"" + name +"\","}
        </div>
        <div className = 'ml-5'>
          {"\"version\": \"" + version +"\","}
        </div>
        <div className = 'ml-5'>
          {"\"actions\": [" }
        </div>
        <div className = 'ml-5'>
        {action.map((item, index) => (
            <div>
               {"{"}
              <div className = 'ml-5'>
                 {"\"name\": \"" + item.name +"\","} 
              </div>  
              <div className = 'ml-5'> {"\"type\": \"" + item.type + "\""} 
                {!item.instruction ? "" : ","}
              </div>

              {item.instruction && <div className = 'ml-5'> {"\"instruction\": \"" + item.instruction +"\""} </div>}
              {index !== action.length -1 ? <span> {"},"} </span> : <span>{"}"}</span>}
            </div>
          ))}

        </div>
        <span> {"]}"} </span> 
      </div>
    </div>

  )
}

export default ParseJSON