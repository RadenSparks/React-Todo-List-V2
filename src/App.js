import {useState} from 'react'
import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import React from "react";
import { Meteors } from "../ui/meteors";

export function MeteorsDemo() {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-2 w-2 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            Meteors because they&apos;re cool
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            I don&apos;t know what to write so I&apos;ll just paste something
            cool here. One more sentence because lorem ipsum is just
            unacceptable. Won&apos;t ChatGPT the shit out of this.
          </p>

          <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
            Explore
          </button>

          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}


function App() {

  // Tasks (ToDo List) State

  const [toDo, setToDo] = useState([
    {id: 1, title: 'Task 1', status: false},
    {id: 2, title: 'Task 2', status: false}
  ])

  // Temp State

  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')

  // Add task 

  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1 

      setToDo([
        ...toDo, 
        { id: num, title: newTask, status: false }
      ])

      setNewTask('')

    }
  }

  // Delete task 

  const deleteTask = (id) => {
    

    setToDo(toDo.filter(task => task.id !== id))

  }

  // Mark task as done or completed
 
  const markDone = (id) => {

    setToDo(toDo.map(
      task => task.id === id 
      ? ({ ...task, status: !task.status }) 
      : (task) 
    ))

  }

  // Cancel update

  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update

  const changeHolder = (e) => {

    setUpdateData({...updateData, title: e.target.value})

  }

  // Update task

  const updateTask = () => {

    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
    setToDo([
      ...removeOldRecord, 
      updateData
    ])
    
    setUpdateData('')

  }

  return (
    <div className="container App">

    <br /><br />
    <h2>To Do List App (ReactJS)</h2>
    <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {toDo && toDo.length ? '' : 'No Tasks...'}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default App;
