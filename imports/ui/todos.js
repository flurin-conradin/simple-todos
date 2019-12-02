import './todos.html';
import './task.js';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.todos.onCreated(function() {
    Meteor.subscribe('tasks');
    this.state = new ReactiveDict();
    this.error = new ReactiveVar("");
});


Template.todos.helpers({
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        return Tasks.find({}, { sort: { createdAt: -1 } });

    },
    hideCompleted() {
        return Template.instance().store.get('hideCompleted');
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
    },
    error() {
        return Template.instance().error.get();
    }
});

Template.todos.events({
    'submit .new-task'(event, instance) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const text = event.target.text.value;

        // Insert a task into the collection
        Meteor.call('tasks.insert', text, Meteor.user().username, (err) => {
            if (err) {
                instance.error.set(err.details[0].message);
            }
        });

        // Clear form
        event.target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    },
});
