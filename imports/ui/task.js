import './task.html';

import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.task.events({
    'click .delete'(event) {
        event.preventDefault();
        Meteor.call('tasks.remove', this._id);
    },
    'click .toggle-checked'(event) {
        Meteor.call('tasks.toggleChecked', this._id, !this.checked );
    }
});