const MS_IN_DAY = 86400000;

export default class ToDo {
  constructor(doneAt, name) {
    this.doneAt = doneAt || new Date(0);
    this.name = name || "Take three deep breaths";
    this.id = `${Date.now()}-${Math.random()}`;
    this.isNew = true;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this.isNew = false;
    this._name = name;
  }

  get doneAt() {
    return this._doneAt instanceof Date ? this._doneAt : new Date(0);
  }

  get isDone() {
    return (
      this.doneAt >= new Date().getDate() &&
      new Date() - this.doneAt < MS_IN_DAY
    );
  }

  set doneAt(d) {
    this.isNew = false;
    if (d instanceof Date) {
      this._doneAt = d;
    }
  }

  set done(isDone) {
    this._doneAt = isDone ? new Date() : new Date(0);
  }
}

export function deserializeTodoPojo(pojo) {
  const todo = new ToDo(new Date(pojo._doneAt), pojo._name);
  todo.isNew = false;
  return todo;
}
