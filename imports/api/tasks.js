import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);
     
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }
     
        Tasks.insert({
          text,
          createdAt: new Date(),
          owner: Meteor.userId(),
          checked: false,
          username: Meteor.user().username,
        });
    },
    'tasks.remove'(id) {
        check(id, String);
        Tasks.remove(id);
    },
    'tasks.toggleChecked'(id, checked) {
        check(id, String);
        check(checked, Boolean);

        Tasks.update(id, {$set: {"checked": checked}})
    }
})