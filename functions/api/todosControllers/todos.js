
const admin = require('firebase-admin')

/******************************************************************/

const db = require('../db/db')

/******************************************************************/

class TodosController {

/******************************************************************/

    getAllTodos(req, res) {
        res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos: db
          })
    }

/******************************************************************/

    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        db.map((todo) => {
            if(todo.id === id) {
                return res.status(200).send({
                    success : 'true',
                    message : 'todo retrieved successfully',
                    todo,
                });
            }
        });
        return res.status(404).send({
            success : 'false', 
            message: 'todo does not exist',
        });
    }

/******************************************************************/

    createTodo(req, res) {
        if(!req.body.title) {
            return res.status(400).send({
                success : 'false',
                message : 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success : 'false',
                message : 'title is required'
            });
        }
        const todo = {
            id : db.length + 1,
            title: req.body.title,
            description: req.body.description
        }
        admin.database().ref('/').push(todo)
        return res.status(201).send({
            success : 'true',
            description : 'todo added successfully',
            todo
        });
    }

/******************************************************************/

    updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);

        let todoFound;
        let indexItem;

        db.map((todo, index) => {
            if(todo.id === id) {
                todoFound = todo;
                indexItem = index;
            }
        });

        if(!todoFound) {
            return res.status(404).send({
                success : 'false',
                message : 'todo now found',
            });
        }

        if(!req.body.title) {
            return res.status(400).send({
                success : 'false',
                message : 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success : 'false',
                message : 'title is required'
            });
        }
        
        const updateTodo = {
            id : todoFound.id,
            title : req.body.title || todoFound.title,
            description : req.body.description || todoFound.description
        };

        db.splice(indexItem, 1, updateTodo);

        return res.status(201).send({
            success : 'true',
            message : 'todo updated successfully', 
            updateTodo,
        });
    }

/******************************************************************/

    deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10)
        db.map((todo, index) => {
            if(todo.id === id) {
                db.splice(index, 1);
                return res.status(200).send({
                    success : 'true',
                    message : 'todo deleted successfully',
                });
            }
        });
        return res.status(404).send({
            success : 'false',
            message : 'todo not found',
        });        
    }
}

/******************************************************************/

const todoController = new TodosController();
module.exports = todoController;

/******************************************************************/