import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Stations = new Mongo.Collection('myStations');

if (Meteor.isServer) {
  Meteor.publish('stations', function() {
    return Stations.find({})
  });
}