import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa'
import Todolist from './Todo-list'
import TodoFooter from './Todo-footer'
import './Todos.css'


export default class Todo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            date: new Date(),
            todoText: '',
            status: 'all'
        }

        this.inputHandler = this.inputHandler.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.activeTodo = this.activeTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.todoFilters = this.todoFilters.bind(this)
        this.setlocalStorage = this.setlocalStorage.bind(this)
    }

    inputHandler(event) {
        this.setState({
            todoText: event.target.value,
        })

    }
    addTodo(event) {
        event.preventDefault()

        let newObjTodo = {
            id: Math.random() * 100000,
            title: this.state.todoText,
            complated: false
        }

        this.setState({
            todos: [...this.state.todos, newObjTodo],
            todoText: ''
        })
        this.setlocalStorage()


    }

    activeTodo(todoID) {
        let newTodos = [...this.state.todos]

        newTodos.forEach(todo => {
            if (todo.id === todoID) {
                todo.complated = !todo.complated
            }
        })
        this.setState({
            todos: newTodos
        })
        this.setlocalStorage()

    }

    removeTodo(todoID) {
        let finalTodos = this.state.todos.filter(todo => {
            return todo.id !== todoID
        })

        this.setState({
            todos: finalTodos
        })
        this.setlocalStorage()
    }


    todoFilters(event) {
        this.setState({
            status: event.target.value
        })
    }

    setlocalStorage() {
        setTimeout(() => {
            localStorage.setItem('todos', JSON.stringify(this.state.todos))
        }, 1);
    }

    render() {

        window.onload = () => {
            let loadTodos = JSON.parse(localStorage.getItem('todos'))
            if (loadTodos) {
                this.setState({
                    todos: loadTodos
                })
            }
        }

        return (
            <>
                <div className='todo-app' >
                    <form className="todo-header" action="form" onSubmit={this.addTodo}>
                        <span className='app-name'>Todo List</span>
                        <div className="todos-selects">
                            <span className='todolist-date'>{this.state.date.toDateString()}</span>

                            <select name="todos-filters" className='todos-filters' onChange={this.todoFilters}>
                                <option className='todos-filter__btn' value='all'>all</option>
                                <option className='todos-filter__btn' value='complated'>complated</option>
                                <option className='todos-filter__btn' value='uncomplated'>uncomplated</option>
                            </select>
                        </div>
                        <div className="todos-add">
                            <input type="text" className='todo-add__input' placeholder='Add your new todo . . ' maxLength={30} value={this.state.todoText} onChange={this.inputHandler} />
                            <button className='todo-add__btn' disabled={!this.state.todoText} ><i className='add-icon'><FaPlus /></i></button>
                        </div>
                    </form>

                    {/* todo list */}

                    <div className="todo-list">
                        <ul className='todo-list__ul'>
                            {this.state.status === 'all' && this.state.todos.map(todo => (
                                <Todolist {...todo} key={todo.id} onActive={this.activeTodo} onRemove={this.removeTodo}></Todolist>
                            ))}

                            {this.state.status === 'complated' && this.state.todos.filter(t => t.complated).map(todo => (
                                <Todolist {...todo} key={todo.id} onActive={this.activeTodo} onRemove={this.removeTodo}></Todolist>
                            ))}

                            {this.state.status === 'uncomplated' && this.state.todos.filter(t => !t.complated).map(todo => (
                                <Todolist {...todo} key={todo.id} onActive={this.activeTodo} onRemove={this.removeTodo}></Todolist>
                            ))}

                        </ul>
                    </div>


                </div>
                <TodoFooter />

            </>
        )
    }
}
