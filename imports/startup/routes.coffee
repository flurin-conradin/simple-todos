import '../ui/layouts/app-body.coffee';
import '../ui/counter.coffee'
import '../ui/todos.coffee'
# import '../ui/map.coffee'

import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';

# FlowRouter.route('/', {
#     name: 'Root.show',
#     action(params, queryParams) {
#         BlazeLayout.render('App_body', {main: 'Lists_show_page'});
#     }
# });

FlowRouter.route '/',
  name: 'App.home'
  action: ->
    BlazeLayout.render 'App_body', main: 'app_rootRedirector'


# FlowRouter.route('/todos', {
#     name: 'Todos.show',
#     action(params, queryParams) {
#         BlazeLayout.render('todos');
#     }
# });

FlowRouter.route '/todos',
    name: 'Todos.show',
    action: (params, queryParams) -> 
        BlazeLayout.render 'todos'

FlowRouter.route '/counter',
    name: 'Counter.show'
    action: ->
        BlazeLayout.render 'counter'

# FlowRouter.route('/map', {
#     name: 'Map.show',
#     action(params, queryParams) {
#         BlazeLayout.render('map');
#     }
# });

# FlowRouter.route '/map',
#     name: 'Map.show'
#     action: ->
#         BlazeLayout.render 'map'