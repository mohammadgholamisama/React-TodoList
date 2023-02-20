import react from "react";
import { FaTrashAlt, FaCheck } from 'react-icons/fa'


export default class Todolist extends react.Component {


    activeTodo(id) {
        this.props.onActive(id)
    }
    removeTodo(id) {
        this.props.onRemove(id)
    }



    render() {
        let { id, title, complated } = this.props
        return (
            <>

                {/* <li className="todo-list__li actived">
                            <span>todo1</span>
                            <i className={`remove-todo__icon todo-icon__handler`}><FaTrashAlt /></i>
                            <i className='complate-todo__icon todo-icon__handler'><FaCheck /></i>
                        </li> */}
                <li className={`todo-list__li  ${complated && 'actived'}`}>
                    <span className="todo-text">{title}</span>
                    <i className={`remove-todo__icon todo-icon__handler`} onClick={this.removeTodo.bind(this, id)}><FaTrashAlt /></i>
                    <i className={`complate-todo__icon todo-icon__handler`} onClick={this.activeTodo.bind(this, id)}><FaCheck /></i>
                </li>

            </>
        )
    }
} 