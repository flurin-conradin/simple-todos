import './task.html';

import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.task.events({
    'click .removeTodo'(event) {
        event.preventDefault();
        let id = event.target.id;
        console.log(id);
        console.log("Delete stuff", id);
        Tasks.remove(this._id);
    },
    'click .checkbox'(event) {
        console.log("clicked checkbox");
        let checked = !event.target.checked;
        let toggleChecked = !checked
        Tasks.update(this._id, {$set: {"checked": toggleChecked}})
    }
});