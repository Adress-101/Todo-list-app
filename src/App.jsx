import { useState , useEffect} from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let saveTodo = JSON.parse(localStorage.getItem("todos"));
      setTodos(saveTodo)
    }
  }, [])
  const saveTols = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
 
  const togleFinished = (e) => { 
    setShowFinished(!showFinished);
   }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id===id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveTols();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    saveTols();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTols();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
    saveTols();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTols();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto w-1/3 bg-cyan-200 rounded-md min-h-[75vh] mt-4 py-1.5">
        <h1 className="text-center font-bold text-lg">Manage Your Todo List</h1>
        <div className="input w-full my-2.5 text-center">
          <input
            type="text"
            className="border-2 w-[69%] mr-1 rounded-sm px-2.5"
            value={todo}
            onChange={handleChange}
          />
          <button
            className="w-[25%] bg-fuchsia-400 p-0.5 rounded-sm cursor-pointer"
            onClick={handleAdd} disabled={todo.length<=3}
          >
            Save
          </button>
        </div>
        <div className="finished pl-3 flex gap-2.5">
          <input onChange={togleFinished} type="checkbox" className="pt-1 cursor-pointer " checked={showFinished} />
          <div className="pb-0.5">
            <span>Show Finished</span>
          </div>
        </div>
        <div className="Todos pl-3">
          <h3 className="font-bold pb-2.5">Your Todos</h3>
          {todos.length === 0 && <div className="ml-1">No Todo Display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) &&  <div className="flex gap-5 mb-1.5 justify-between" key={item.id}>
                <div className="flex justify-between gap-4">
                  <input
                    type="checkbox"
                    name={item.id}
                    id=""
                    className="cursor-pointer"
                    onChange={handleCheckbox}
                    value={item.isCompleted}
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    <p className="pb-1">{item.todo}</p>
                  </div>
                </div>
                <div className="flex gap-2 pr-3">
                  <button
                    className=" cursor-pointer bg-fuchsia-400 px-2.5 rounded-sm"
                    onClick={(e)=>handleEdit(e,item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className=" cursor-pointer bg-fuchsia-400 px-2.5 rounded-sm"
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
