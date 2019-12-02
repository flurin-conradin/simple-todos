import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = 'validation-error';
  ddpError.details = error.details;
  return ddpError;
});

Tasks.schema = new SimpleSchema({
  text: {type: String, min: 3},
  username: {type: String},
  createdAt: {type: Date, defaultValue: new Date()},
  checked: {type: Boolean, defaultValue: false},
  private: {type: Boolean, defaultValue: true},
  owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});



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
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const newTask = {
      text,
      owner: this.userId,
      username,
    }

    let cleaned = Tasks.schema.clean(newTask);
    Tasks.schema.validate(cleaned);
    Tasks.insert(newTask);
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