import './task.html';

import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.task.events({
    'click .delete'(event) {
        event.preventDefault();
        Tasks.remove(this._id);
    },
    'click .toggle-checked'(event) {
        Tasks.update(this._id, {$set: {"checked": !this.checked}})
    }
});