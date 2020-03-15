export default {
  log_in: 'https://trello.backend.tests.nekidaem.ru/api/v1/users/login/',
  get_todos: 'https://trello.backend.tests.nekidaem.ru/api/v1/cards/',
  add_todo: 'https://trello.backend.tests.nekidaem.ru/api/v1/cards/',
  update_todo: id => `https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`,
  delete_todo: id => `https://trello.backend.tests.nekidaem.ru/api/v1/cards/${id}/`,
};
