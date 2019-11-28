import './body.html';

import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.body.helpers({
    tasks() {
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
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
        });

        // Clear form
        target.text.value = '';
    },
});

Template.task.events({
    'click .removeTodo'(event) {
        event.preventDefault();
        let id = event.target.id;
        console.log(id);
        console.log("Delete stuff", id);
        Tasks.remove(this._id);
    },
});