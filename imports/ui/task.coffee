import './task.html';

import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

Template.task.events
    'click .delete': (event) -> 
        event.preventDefault();
        Meteor.call 'tasks.remove', this._id
    
    'click .toggle-checked': ->
        console.log "toggling"
        Meteor.call 'tasks.toggleChecked', this._id, !this.checked
    
    'click .toggle-private': ->
        Meteor.call 'tasks.togglePrivate', this._id


Template.task.helpers
    isOwner: ->
        Meteor.userId() == this.owner