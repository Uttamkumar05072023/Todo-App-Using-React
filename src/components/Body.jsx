import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Body = () => {
    const [todo,setTodo] = useState("");
    const [todos, setTodos] = useState([]);  // Master List
    const [displayedTodos, setDisplayedTodos] = useState([]); // Filter view
    const [isLoaded,setIsLoaded] = useState(false);
    const [isEmpty,setIsEmpty] = useState(true);
    const [showFinished,setShowFinished] = useState(true);

    useEffect(()=>{
        let savedTodos = localStorage.getItem("todos");
        if(savedTodos){
            try{
                let data = JSON.parse(savedTodos);
                setTodos(data);
                setDisplayedTodos(data);
            }catch(err){
                setTodos([])
                setDisplayedTodos([])
            }
        }
        setIsLoaded(true);
    },[])

    useEffect(()=>{
        if(isLoaded){
            localStorage.setItem("todos",JSON.stringify(todos))
        }
    },[todos,isLoaded])

    useEffect(()=>{
        // todo.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setIsEmpty(todo.trim().length === 0);
    },[todo])

    useEffect(()=>{
        if(showFinished){
            setDisplayedTodos(todos);
        }else{
            setDisplayedTodos(todos.filter((todo)=>!todo.isComplete));
        }
    },[showFinished,todos])

    const handleAdd = () => {
        if(todo.trim()){
            setTodos([...todos,{id:uuidv4(),todo:todo.trim(),isComplete:false}]);
            setTodo("")
        }else{
            // alert("Input is empty!!!");
            setIsEmpty(true);
        }
    }
    const handleEdit = (id) => {
        const found = todos.find((todo)=> todo.id === id);
        if (found){
            setTodo(found.todo);
            setTodos(todos.filter((todo)=> todo.id !== id));
        }
    }
    const handleDelete = (id) => {
        if(confirm("Are you sure ?")){
            setTodos(todos.filter((todo)=>todo.id !== id));
        }
    }
    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    const handleCheckbox = (id) => {
        setTodos(todos.map((todo)=> todo.id === id ? {...todo,isComplete: !todo.isComplete} : todo));
    }
    const toggleFinished = (e) => {
        setShowFinished(prev => !prev);
    }

  return (
    <div className='w-[90vw] min-h-[80vh] mx-auto my-5 rounded-xl p-5 bg-violet-200'>
        <div className="text-center mb-4">
            <h2 className='text-xl font-bold mb-4'>Add a Todo</h2>
            <div className="flex justify-center gap-4">
            <input type="text" className={`${isEmpty?"border-red-500":"border-green-500"} lg:w-1/2 w-3/4 bg-white rounded-md border-2 outline-none py-0.5 px-1`} value={todo} onChange={handleChange}/>
            <button onClick={handleAdd} className='px-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer bg-violet-500 hover:bg-violet-800'>Save</button>
            </div>
        </div>
        <label htmlFor="showFinished">
            <input type="checkbox" id="showFinished" checked={showFinished} onChange={toggleFinished}/>Show Finished
        </label>
        <hr className='my-2'/>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
            {displayedTodos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {displayedTodos.map((todo)=>{
                return <div key={todo.id} className="todo flex my-3 justify-between bg-white p-2 rounded-xl">
                    <div className='flex gap-2'>
                        <input type="checkbox" checked={todo.isComplete} onChange={()=>handleCheckbox(todo.id)} />
                        <div className={`${todo.isComplete?"line-through":""}`}>{todo.todo}</div>
                    </div>
                    <div className="buttons flex h-full">
                        <button onClick={()=>handleEdit(todo.id)} className='px-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer bg-green-500 hover:bg-green-800 mr-2'><MdEdit /></button>
                        <button onClick={()=>handleDelete(todo.id)} className='px-2 py-1 text-sm font-bold text-white rounded-md cursor-pointer bg-red-500 hover:bg-red-800'><MdDelete /></button>
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Body