import './counter.html'

import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

Template.counter.onCreated(function onCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.counter.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.counter.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
