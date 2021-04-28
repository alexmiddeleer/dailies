export default class ToDo {
  constructor(doneAt, name) {
    this.doneAt = doneAt || new Date(0);
    this.name = name || "Take three deep breaths";
    this.id = `${Date.now()}-${Math.random()}`;
  }
}
