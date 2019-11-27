import './main.html';
import '../imports/ui/body.js';

import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

Template.hello.onCreated(function onCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

// 
// TEMPLATE INFO
//

Template.info.onCreated(function onCreated() {
  // init Class with flurinClass
  this.className = new ReactiveVar("");
});

Template.info.helpers({
  myClass() {
    return Template.instance().className.get();
  },
});

Template.info.events({
  'click h2'(event, instance) {
    console.log("h2 was clicked");
    instance.className.set("flurinClass");
  },
});