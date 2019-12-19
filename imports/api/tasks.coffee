import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
# import { ValidatedMethod } from 'meteor/mdg:validated-method';

export Tasks = new Mongo.Collection 'tasks'

SimpleSchema.defineValidationErrorTransform (error) => 
  ddpError = new Meteor.Error error.message
  ddpError.error = 'validation-error'
  ddpError.details = error.details
  ddpError


Tasks.schema = new SimpleSchema
  text:
    type: String, min: 3
  username:
    type: String
  createdAt:
    type: Date
  checked: 
    type: Boolean
    defaultValue: false
  private: 
    type: Boolean
    defaultValue: true
  owner:
    type: String
    regEx: SimpleSchema.RegEx.Id


if Meteor.isServer
  Meteor.publish 'tasks', ->
    Tasks.find $or: [
      {private: {$ne: true}},
      owner: this.userId
    ]
  

# export newTasksInsert = new ValidatedMethod
#   name: 'todos.updateText',
#   validate: Tasks.schema.validator(),
#   run: (cleaned) -> Tasks.insert(cleaned)


Meteor.methods
  'tasks.insert': (text, username) ->
    if !this.userId 
      throw new Meteor.Error 'not-authorized'
    
    if Meteor.isServer
      console.log "I am Server"
    
    if Meteor.isClient
      console.log "I am Client"

    newTask = 
      text: text,
      owner: this.userId,
      username: username,
      createdAt: new Date()

    cleaned = Tasks.schema.clean newTask
    Tasks.schema.validate(cleaned);
    Tasks.insert(cleaned)
  ,
  'tasks.remove': (id) -> 
    check id, String
    task = Tasks.findOne id
    if this.userId != task.owner 
      throw new Meteor.Error 'not-authorized'
    Tasks.remove(id);
  ,
  'tasks.toggleChecked': (id, checked) -> 
    check id, String
    check checked, Boolean
    task = Tasks.findOne id
    if this.userId != task.owner 
      throw new Meteor.Error 'not-authorized'
    Tasks.update id, $set: "checked": checked
  ,
  'tasks.togglePrivate': (id) -> 
    check id, String
    task = Tasks.findOne id
    if this.userId != task.owner
      throw new Meteor.Error 'not-authorized'
    Tasks.update id, $set: "private": !task.private