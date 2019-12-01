import '../ui/layouts/app-body';
import '../ui/counter'
import '../ui/todos'

import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

FlowRouter.route('/', {
    name: 'Root.show',
    action(params, queryParams) {
        console.log("Nothing should be rendered");
        BlazeLayout.render('App_body', {main: 'Lists_show_page'});
    }
});

FlowRouter.route('/counter', {
    name: 'Counter.show',
    action(params, queryParams) {
        BlazeLayout.render('counter');
    }
});

FlowRouter.route('/todos', {
    name: 'Todos.show',
    action(params, queryParams) {
        console.log("Todos should be shown");
        BlazeLayout.render('todos');
    }
});