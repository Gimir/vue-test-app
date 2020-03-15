export default {
  //SET TODOS AT THE FIRST RENDER ----------------------------------
  setTodos(state, payload) {
    state.rows = state.rows.map(row => {
      return {
        ...row,
        todos: payload
          .filter(todo => todo.row === row.id)
          .map(todo => ({
            id: todo.id,
            row_id: todo.row,
            body: todo.text,
          })),
      };
    });
  },
  //REORDER TODO ------------------------------------------------------
  updateTodos(state, payload) {
    const { removedIndex, addedIndex, payload: todo, row_id } = payload;
    //REMOVE OLD INDEX
    if (removedIndex !== null) {
      const resultTodos = state.rows.find(row => row.id === todo.row_id).todos;

      resultTodos.splice(removedIndex, 1);

      state.rows = state.rows.map(row => {
        if (row.id === todo.row_id) {
          return {
            ...row,
            todos: resultTodos,
          };
        }
        return row;
      });
    }
    //ADD NEW INDEX
    if (addedIndex !== null) {
      const resultTodos = state.rows.find(row => row.id === row_id).todos;

      resultTodos.splice(addedIndex, 0, {
        ...todo,
        row_id,
      });

      state.rows = state.rows.map(row => {
        if (row.id === row_id) {
          return {
            ...row,
            todos: resultTodos,
          };
        }
        return row;
      });
    }
  },
  //ADD NEW TODO --------------------------------------------------------
  addTodo(state, payload) {
    state.rows = state.rows.map(row => {
      if (row.id === payload.row) {
        const newTodos = Array.from(row.todos);
        newTodos.push({
          id: payload.id,
          row_id: payload.row,
          body: payload.text,
        });
        return {
          ...row,
          todos: newTodos,
        };
      }
      return row;
    });
  },
  //REMOVE TODO --------------------------------------------------------
  removeTodo(state, payload) {
    const { row_id, todo_id } = payload;
    state.rows = state.rows.map(row => {
      if (row.id === row_id) {
        return {
          ...row,
          todos: row.todos.filter(todo => todo.id !== todo_id),
        };
      }
      return row;
    });
  },
  //SET UPDATING STATE, THIS MADE FOR API CALL OPTIMISATION -------------
  setUpdating(state, payload) {
    state.updating = payload;
  },
};
