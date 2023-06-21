import './App.css';
import React, {useState} from "react";
import {DogPhoto} from "./queries/DogPhoto";
import {Dogs} from "./queries/Dogs";
import {AddTodo} from "./mutations/AddTodo";
import {Todos} from "./mutations/Todos";

function App() {
    // const [selectedDog, setSelectedDog] = useState(null);
    //
    // function onDogSelected({target}) {
    //     setSelectedDog(target.value);
    // }

    return (
        <div className="App">
            <h2>Building Mutation components 🚀</h2>
            <AddTodo />
            <Todos />
        </div>
    );
}

export default App;
