import './task.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.task.events({
    'click .delete'(event) {
        event.preventDefault();
        Meteor.call('tasks.remove', this._id, this.owner);
    },
    'click .toggle-checked'(event) {
        Meteor.call('tasks.toggleChecked', this._id, !this.checked, this.owner);
    },
    'click .toggle-private'(event) {
        Meteor.call('tasks.togglePrivate', this._id);
    }
});

Template.task.helpers({
    isOwner() {
        return Meteor.userId() === this.owner;
    }
})