import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: Meteor.userId() }
      ]
    })
  });
}


Meteor.methods({
  'tasks.insert'(text, private) {
    check(text, String);
    check(private, Boolean);

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      checked: false,
      username: Meteor.user().username,
      private: private
    });
  },
  'tasks.remove'(id, owner) {
    check(id, String);
    check(owner, String);
    if (Meteor.userId() != owner) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(id);
  },
  'tasks.toggleChecked'(id, checked, owner) {
    check(id, String);
    check(checked, Boolean);
    if (Meteor.userId() != owner) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(id, { $set: { "checked": checked } })
  },
  'tasks.togglePrivate'(id) {
    let task = Tasks.findOne(id);
    check(id, String);
    if (Meteor.userId() != task.owner) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(id, { $set: { "private": !task.private } })
  }
})