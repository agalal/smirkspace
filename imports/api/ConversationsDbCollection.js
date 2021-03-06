import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Conversations = new Mongo.Collection('conversations');

export function spaceGen() {

  //Assign the db items to a variable
  var test = Conversations.find().fetch();

  for (var i = 0; i < test.length; i++) {
    if (test[i].NumberInRoom == 1) {
      Conversations.update({ _id: test[i]._id }, {$set:{NumberInRoom: 2, Available: false}});
      return test[i].Id;
    }
  }
  //Create random room Id number
  var instance = Math.floor(Math.random() * 1000000);

  //go through db items to make sure Id is unique
  for (var i = 0; i < test.length; i++) {
    if (test[i].Id == instance) {
      instance = Math.floor(Math.random() * 1000000);
      continue;
    }
  }

  Conversations.insert({
    Category: "Travel",
    NumberInRoom: 1,
    Id: instance,
    Available: true,
  });

  return instance;
};
