import './body.html';
import './task.js';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.body.onCreated(function onCreated() {
    this.stateStore = new ReactiveDict({ 'hideCompleted': false });
});


Template.body.helpers({
    tasks() {
        if (Template.instance().stateStore.get('hideCompleted')) {
            return Tasks.find({checked: {$ne: true}}, { sort: { createdAt: -1 } });
        }
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    hideCompleted() {
        return Template.instance().stateStore.get('hideCompleted');
    }
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            checked: false
        });

        // Clear form
        target.text.value = '';
    },
    'change .hide-completed'(event, instance) {
        let stateStore = instance.stateStore.set('hideCompleted',  event.target.checked);
    }
});
