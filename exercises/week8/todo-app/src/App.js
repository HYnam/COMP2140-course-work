import { useState } from "react";

const initialTodos = [
    { task: "Take out the trash", completed: false },
    { task: "Walk the dog", completed: true },
    { task: "Do the weekly quizzes", completed: false },
];

function App() {
    
    const [todos, setTodos] = useState(initialTodos);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    
    const toggleCompleted = (todo) => {
        let result = todos.filter((_todo) => _todo.task !== todo.task);
        setTodos([...result, { ...todo, completed: !todo.completed }]);
    };
    
    const sortTodos = (todo, otherTodo) => {
        if (todo.task < otherTodo.task) {
            return -1;
        }
        if (todo.task > otherTodo.task) {
            return 1;
        }
        return 0;
    };
    
    return (
        <>
            <header>
                <h1>Todo App</h1>
            </header>
            <TodoCreator addTodo={addTodo} /> 
            <hr />
            <main>
                <h2>List of Todos</h2>
                {todos.sort(sortTodos).map((todo) => (
                    <Todo
                    key={todo.task}
                    {...todo}
                    toggleCompleted={() => toggleCompleted(todo)}
                    />
                ))}
            </main>
        </>
    );

}

function TodoCreator({ addTodo }) {
    const [todo, setTodo] = useState({ task: "", completed:false});

    const handleChangeTask = (event) => {
        setTodo({ ...todo, task: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo(todo);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Todo</h2>
            <label>
                Task: 
                <input 
                type="text" 
                name="task"
                value={todo.task}
                onChange={handleChangeTask}
                />
            </label>
            <button type="submit">Create</button>
        </form>
    );
}

function Todo({ task, completed, toggleCompleted }) {
    
    const taskStyle = () => {
        let result = { display: "inline-block" };
        if (completed) {
            result["text-decoration"] = "line-through";
        }
        return result;
    };
    
    return (
        <section>
            <input type="checkbox" checked={completed} onChange={toggleCompleted} />
            <p style={taskStyle()}>
                {task}
            </p>
        </section>
    );

}

export default App;