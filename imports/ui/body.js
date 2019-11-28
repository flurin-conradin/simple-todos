import './body.html';

import { Tasks } from '../api/tasks.js';
import { Template } from 'meteor/templating';

Template.body.helpers({
    tasks() {
        return Tasks.find({});
      },
});
