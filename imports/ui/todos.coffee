import './todos.html';
import './task.coffee';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.coffee';
import { Template } from 'meteor/templating';

Template.todos.onCreated ->
    Meteor.subscribe 'tasks'
    @state = new ReactiveDict
    @error = new ReactiveVar ""


Template.todos.helpers
    tasks: -> 
        instance = Template.instance();
        if instance.state.get 'hideCompleted' 
            return Tasks.find {checked: $ne: true}, sort: createdAt: -1
        console.log "sorting?"
        Tasks.find {}, sort: createdAt: -1

    incompleteCount: -> 
        Tasks.find checked: $ne: true
            .count()
    error: ->
        Template.instance().error.get()

Template.todos.events
    'submit .new-task': (event, instance) ->
        event.preventDefault()
        text = event.target.text.value

        Meteor.call 'tasks.insert', text, Meteor.user().username,
            (err) => 
                if err
                    instance.error.set err.details[0].message
                    setTimeout  (-> instance.error.set ""), 3000
        
        event.target.text.value = '';
    
    'change .hide-completed input': (event, instance) ->
        instance.state.set 'hideCompleted', event.target.checked
