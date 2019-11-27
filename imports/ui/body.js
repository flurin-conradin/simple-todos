import './body.html';

import { Template } from 'meteor/templating';

Template.body.helpers({
    tasks: [
        { text: 'This is task 1' },
        { text: 'This is task 2' },
        { text: 'This is task 3' },
    ],
});

//
//  Own implementation of add Todo
//


Template.body.onCreated(function onCreated() {
    this.fTasks = new ReactiveVar([
        { text: 'This is task 7' },
        { text: 'This is task 8' },
        { text: 'This is task 9' },
    ]);
    this.newTodo = new ReactiveVar("Thelk");
});

Template.body.helpers({
    fTasks() {
        return Template.instance().fTasks.get();
    },
    newTodo() {
        return Template.instance().newTodo.get();
    }
});

Template.body.events({
    'click button'(event, instance) {
        event.preventDefault();
        let temp = Template.instance().fTasks.get();
        temp.push({ text: instance.newTodo.get() });
        instance.fTasks.set(temp);
        instance.newTodo.set("");
    },
    'keyup input'(event, instance) {
        instance.newTodo.set(event.target.value)
    }
});