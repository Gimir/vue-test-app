import axios from 'axios';
import routes from '../../../constants/routes';

export default {
  //GET TODOS FROM SERVER AT FIRST RENDER -----------------------
  async loadTodos(context) {
    const { token } = context.rootState.user;

    axios({
      method: 'get',
      url: routes.get_todos,
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(responce => context.commit('setTodos', responce.data))
      .catch(err => console.log(err));
  },
  //REORDER TODO --------------------------------------------------
  async moveTodo(context, params) {
    const row_id = params[1];
    const { token } = context.rootState.user;
    const { removedIndex, addedIndex, payload } = params[0];
    if (removedIndex === null && addedIndex === null) return;
    if (removedIndex === addedIndex && payload.row_id === row_id) return;
    //FOR OPTIMISING API CALL
    if (addedIndex !== null) {
      const newUpdating = { ...context.state.updating };
      newUpdating.targetIndex = addedIndex;
      newUpdating.targetRow = row_id;
      context.commit('setUpdating', newUpdating);
    }
    if (removedIndex !== null) {
      const newUpdating = { ...context.state.updating };
      newUpdating.sourceIndex = removedIndex;
      context.commit('setUpdating', newUpdating);
    }
    //^^OPTIMISATION END^^
    context.commit('updateTodos', {
      removedIndex,
      addedIndex,
      payload,
      row_id,
    });
    //API CALL
    const { sourceIndex, targetIndex } = context.state.updating;
    if (sourceIndex !== null && targetIndex !== null) {
      axios({
        method: 'patch',
        url: routes.update_todo(payload.id),
        data: {
          row: context.state.updating.targetRow,
          seq_num: targetIndex,
          text: payload.body,
        },
        contentType: 'application/json',
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .then(() => {
          context.commit('setUpdating', {
            sourceIndex: null,
            targetIndex: null,
            targetRow: null,
          });
          console.log('Todo is now reordered!');
        })
        .catch(err => {
          alert('Your chainges was not saved!');
          console.log(err);
        });
    }
  },
  //ADD NEW TODO --------------------------------------------------
  async addTodo(context, params) {
    const { token } = context.rootState.user;
    const { row_id, text } = params;

    axios({
      method: 'post',
      url: routes.add_todo,
      data: {
        row: row_id,
        text: text,
      },
      contentType: 'application/json',
      dataType: 'json',
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(responce => context.commit('addTodo', responce.data))
      .catch(err => console.log(err));
  },
  //REMOVE TODO ----------------------------------------------------
  async removeTodo(context, params) {
    const { token } = context.rootState.user;
    const [row_id, todo_id] = params;
    context.commit('removeTodo', { row_id, todo_id });
    axios({
      method: 'delete',
      url: routes.delete_todo(todo_id),
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(() => console.log('Todo is deleted!'))
      .catch(err => {
        alert('Your chainges was not saved!');
        console.log(err);
      });
  },
};
