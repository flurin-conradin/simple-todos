import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Tasks } from '../imports/api/tasks';
import assert from "assert";

describe("simple-todos", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "simple-todos");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
  
if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;
            console.log("this passes");

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'tmeasday',
                });
            });
            it('can delete owned task', () => {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };
                deleteTask.apply(invocation, [taskId]);
                assert.equal(Tasks.find().count(), 0);
            });
            it('can insert task', () => {
              const insertTask = Meteor.server.method_handlers['tasks.insert'];
              const invocation = { userId };
              insertTask.apply(invocation, ["This is a test task", "super-tester"]);
              assert.equal(Tasks.find().count(), 2);
          });
        });
    });
}