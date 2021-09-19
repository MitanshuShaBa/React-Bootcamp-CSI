import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import {db} from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"

const Todos = () => {
    const [todos, setTodos] = useState([])

    useEffect(async () => {
        const todosCol = collection(db,'todos')
        const unsubscribe = await onSnapshot(todosCol, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id});
        })
        setTodos(docs)
        })
          
        return () => {
            unsubscribe()
        }
    }, [])
    
    return (
        <div>
            {todos.map((todoItem)=>{
                return <TodoItem completed={todoItem.completed} todo={todoItem.todo} id={todoItem.id} />
            })}
        </div>
    )
}

export default Todos
