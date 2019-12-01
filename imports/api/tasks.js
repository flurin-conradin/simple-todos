import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId }
      ]
    })
  });
}


Meteor.methods({
  'tasks.insert'(text, username) {
    check(text, String);
    check(username, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      checked: false,
      username,
      private: true
    });
  },
  'tasks.remove'(id) {
    check(id, String);
    let task = Tasks.findOne(id);
    if (this.userId != task.owner) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(id);
  },
  'tasks.toggleChecked'(id, checked) {
    check(id, String);
    check(checked, Boolean);
    let task = Tasks.findOne(id);
    if (this.userId != task.owner) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(id, { $set: { "checked": checked } })
  },
  'tasks.togglePrivate'(id) {
    check(id, String);
    let task = Tasks.findOne(id);
    if (this.userId != task.owner) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(id, { $set: { "private": !task.private } })
  }
})