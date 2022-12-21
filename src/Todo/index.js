import './index.css'
import {useStore} from "../store";
import {observer} from "mobx-react-lite";
import {useState} from "react";

function Task() {

    const {taskStore} = useStore()

    function changeCheck(e, id) {
        taskStore.alterData(id)
    }

    function deleteData(e, id) {
        taskStore.deleteData(id)
    }

    function selectAll() {
        taskStore.fullData()
    }

    function nothing() {

    }

    const [content, setContent] = useState("")

    function recordContent(e) {
        setContent(e.target.value)
    }

    function addData(e) {
        if(e.keyCode === 13) {
            taskStore.addData(content)
            setContent("")
        }
    }

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    autoFocus
                    autoComplete="off"
                    placeholder="What needs to be done?"
                    onChange={(e) => recordContent(e)}
                    onKeyUp={(e) => addData(e)}
                    value={content}
                />
            </header>
            <section className="main">
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                />
                <label htmlFor="toggle-all" onClick={(e) => selectAll()}></label>
                <ul className="todo-list">
                    {taskStore.list.map(instance => (
                        <li className={instance.isDone ? "todo completed" : "todo"} key={instance.id}>
                            <div className="view">
                                {/* 单选框 */}
                                <input className="toggle" type="checkbox" checked={instance.isDone} onChange={nothing}
                                       onClick={(e) => changeCheck(e, instance.id)}/>
                                <label>{instance.name}</label>
                                <button className="destroy" onClick={(e) => deleteData(e, instance.id)}></button>
                            </div>
                        </li>
                    ))}

                </ul>
            </section>
        </section>
    )
}

export default observer(Task)