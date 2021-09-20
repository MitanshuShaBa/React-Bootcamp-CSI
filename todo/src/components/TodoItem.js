import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { Checkbox, IconButton, TextField } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { db } from "../firebase";
import "./TodoItem.css";
import { useState } from "react";

const TodoItem = (props) => {
  const [todo, setTodo] = useState(props.todo);

  const handleCompleted = async () => {
    await setDoc(doc(db, "todos", props.id), {
      completed: !props.completed,
      todo: props.todo,
    });
  };

  //   Original implementation
  //   const handleChangeText = async (e) => {
  //    await setDoc(doc(db, "todos", props.id), {
  //      completed: props.completed,
  //      todo: props.todo,
  //    });
  //   };

  // This alternate implementation updates the text only if your cursor exits the input field
  const handleChangeText = (e) => {
    setTodo(e.target.value);
  };

  const updateTodo = async () => {
    await setDoc(doc(db, "todos", props.id), {
      completed: props.completed,
      todo: todo,
    });
  };

  const handleDeleteDocument = async () => {
    await deleteDoc(doc(db, "todos", props.id));
  };

  return (
    <div className="root">
      <Checkbox
        name="completed"
        checked={props.completed}
        color="primary"
        onClick={handleCompleted}
      />
      <div className={`content ${props.completed && "striked"}`}>
        <TextField
          InputProps={{ disableUnderline: true }}
          onChange={handleChangeText}
          onBlur={updateTodo}
          name="todo"
          value={todo}
          multiline
          style={{ width: "100%" }}
        />
      </div>
      <IconButton onClick={handleDeleteDocument}>
        <DeleteOutline />
      </IconButton>
    </div>
  );
};

export default TodoItem;
