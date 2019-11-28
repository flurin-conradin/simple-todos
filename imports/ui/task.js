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
});