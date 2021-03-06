/******************************************************************/

const express = require('express');
const cors = require('cors');
const db = require('../db/db');
const todoController = require('../todosControllers/todos');

const router = express.Router()

router.use(cors({ origin: true }));

/******************************************************************/

router.get('/api/v1/todos', todoController.getAllTodos);

/******************************************************************/

router.get('/api/v1/todos/:id', todoController.getTodo);

/******************************************************************/

router.post('/api/v1/todos', todoController.createTodo);

/******************************************************************/

router.delete('/api/v1/todos/:id', todoController.deleteTodo);

/******************************************************************/

router.put('/api/v1/todos/:id', todoController.updateTodo);

/******************************************************************/

module.exports = router;

/******************************************************************/