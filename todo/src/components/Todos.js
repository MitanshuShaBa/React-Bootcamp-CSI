import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import {db} from "../firebase"
import { collection, onSnapshot, addDoc } from "firebase/firestore"
import { Fab } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import "./Todos.css"

const Todos = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const todosCol = collection(db,'todos')
        const unsubscribe = onSnapshot(todosCol, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setTodos(docs)
        }, (err) => console.log(err))
          
        return () => {
            unsubscribe()
        }
    }, [])

    const addTodo = async ()=>{
        await addDoc(collection(db, "todos"), {
            completed:false,
            todo:""
        });
    }
    
    return (
        <div className="todos">
            <ul>
                {todos.map((todoItem)=>{
                    return (
                        <li key={todoItem.id}>
                            <TodoItem completed={todoItem.completed} todo={todoItem.todo} id={todoItem.id} />
                        </li>
                    )
                })}
            </ul>
            <div className="add-button">
                <Fab onClick={addTodo} color="primary">
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}

export default Todos
