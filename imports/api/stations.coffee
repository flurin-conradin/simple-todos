import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export Stations = new Mongo.Collection 'stations'

if Meteor.isServer
  Meteor.publish 'stations', ->  Stations.find {}