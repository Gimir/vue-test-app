import actions from './actions';
import mutations from './mutations';

const initialState = [
  {
    id: '0',
    title: 'on hold',
    todos: [],
  },
  {
    id: '1',
    title: 'in progress',
    todos: [],
  },
  {
    id: '2',
    title: 'need review',
    todos: [],
  },
  {
    id: '3',
    title: 'approved',
    todos: [],
  },
];

export default {
  state: {
    updating: {
      sourceIndex: null,
      targetIndex: null,
      targetRow: null,
    },
    rows: initialState,
  },
  actions: { ...actions },
  mutations: { ...mutations },
  getters: {
    allRows(state) {
      return state.rows;
    },
  },
};
