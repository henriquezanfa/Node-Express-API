
const admin = require('firebase-admin')

/******************************************************************/

const db = require('../db/db')

/******************************************************************/

class TodosController {

    /******************************************************************/

    async getAllTodos(req, res) {
        await admin.database().ref('/').once('value')
        .then(snap => {
            return res.status(200).send({
                success: 'true',
                description: 'all data values',
                data: [snap.val()],
            });
        })
        .catch(e => {
            console.log("Erro", e);
        })
    }

    /******************************************************************/

    async getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        await admin.database().ref('/').once('value')
            .then(snap => {
                return snap.forEach(getById)
            })
            .catch(e => {
                console.log("Erro", e);
            })

        function getById(data) {
            if (id === parseInt(data.key)) {
                return res.status(200).send({
                    success: 'true',
                    message: 'todo found successfully',
                    data,
                })
            }
            return false;
        }

        return res.status(404).send({
            success: 'false',
            message: 'todo does not exist',
        });
    }

    /******************************************************************/

    createTodo(req, res) {
        let dbSize;
        admin.database().ref('/').once('value')
            .then(snap => {
                dbSize = snap.numChildren();
                if (!req.body.title) {
                    return res.status(400).send({
                        success: 'false',
                        message: 'title is required'
                    });
                } else if (!req.body.description) {
                    return res.status(400).send({
                        success: 'false',
                        message: 'title is required'
                    });
                }
                const todo = {
                    [dbSize + 1] : {
                        title: req.body.title,
                        description: req.body.description
                    }
            }
            admin.database().ref('/').update(todo)
            return res.status(201).send({
                success: 'true',
                description: 'todo added successfully',
                todo
            });
    })
        .catch(e => {
        console.log("Erro", e);
        })

        
    }

/******************************************************************/

updateTodo(req, res) {
    const id = parseInt(req.params.id, 10);

    let todoFound;
    let indexItem;

    db.map((todo, index) => {
        if (todo.id === id) {
            todoFound = todo;
            indexItem = index;
        }
    });

    if (!todoFound) {
        return res.status(404).send({
            success: 'false',
            message: 'todo now found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }

    const updateTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description
    };

    db.splice(indexItem, 1, updateTodo);

    return res.status(201).send({
        success: 'true',
        message: 'todo updated successfully',
        updateTodo,
    });
}

/******************************************************************/

deleteTodo(req, res) {
    const id = parseInt(req.params.id, 10)
    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'todo deleted successfully',
            });
        }
    });
    return res.status(404).send({
        success: 'false',
        message: 'todo not found',
    });
}
}

/******************************************************************/

const todoController = new TodosController();
module.exports = todoController;

/******************************************************************/