import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { Tasks } from '../imports/api/tasks'
import assert from "assert"

describe "simple-todos", -> 
  it "package.json has correct name", () -> 
      { name } = await import("../package.json")
      assert.strictEqual name, "simple-todos"

  if Meteor.isClient 
    it "client is not server", ->
      assert.strictEqual Meteor.isServer, false

  if Meteor.isServer
    it "server is not client", -> 
      assert.strictEqual Meteor.isClient, false
  
if Meteor.isServer 
  describe 'Tasks', () => 
    describe 'methods', () =>
      userId = Random.id()
      beforeEach () => 
        Tasks.remove {}
        taskId = Tasks.insert
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday'
      it 'can delete owned task', () => 
        deleteTask = Meteor.server.method_handlers['tasks.remove'];
        taskId = 
          Tasks.findOne { text: 'test task'}
          ._id
        invocation = { userId };
        deleteTask.apply invocation, [taskId]
        assert.equal Tasks.find().count(), 0
      it 'can insert task', () =>
        insertTask = Meteor.server.method_handlers['tasks.insert'];
        invocation = { userId };
        insertTask.apply invocation, ["This is a test task", "super-tester"]
        assert.equal Tasks.find().count(), 2
