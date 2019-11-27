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
    this.fTasks = new ReactiveVar([]);
    this.newTodo = new ReactiveVar("");
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
    'click .addTodo'(event, instance) {
        event.preventDefault();
        let temp = Template.instance().fTasks.get();
        temp.push({ text: instance.newTodo.get(), id: temp.length+1 });
        // let fTasks = temp.map((v, i)=>({text: v.text, id: i}))
        instance.fTasks.set(temp);
        instance.newTodo.set("");
    },
    
    'keyup input'(event, instance) {
        instance.newTodo.set(event.target.value);
    },
    
    'click .removeTodo'(event, instance) {
        console.log("remove item");
        event.preventDefault();
        // target = int(event.target.value);
        let temp = Template.instance().fTasks.get().filter((v)=> v.id != event.target.value);
        // let fTasks = temp.map((v, i)=>({text: v.text, id: i}))
        instance.fTasks.set(temp ? temp : []);
    },
});