Meteor.publish(null, function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      'services.google.email': 1,
      'services.google.picture': 1,
      groups: 1
    }
  });
});

Meteor.publish('getUserById', function (userId) {
  if (!this.userId) return this.ready();
  return Meteor.users.find({_id: userId}, {
    fields: {
      'services.google.email': 1,
      'services.google.picture': 1,
      groups: 1,
      'profile.name': 1,
      'profile.age': 1,
      'profile.title': 1
    }
  });
});

Meteor.publish('userByIdsList', function(ids){
  if (!this.userId) return this.ready();
  return Meteor.users.find({_id: {$in: ids}},{
    fields: {
      'services.google.email': 1,
      'services.google.picture': 1,
      groups: 1,
      'profile.name': 1,
      'profile.age': 1,
      'profile.title': 1
    }});
});
Meteor.publish('eventNGroupByUser', function () {
  if (!this.userId) return this.ready();
  var user = Meteor.users.findOne(this.userId);
  var groupList = user.groups;
  return [EventData.find({group_id: {$in: groupList}}), Group.find({_id: {$in: groupList}})]
});
Meteor.publish('allGroups', function () {
  if (!this.userId) return this.ready();
  return Group.find({});
});
Meteor.publish('allUpComingEventOfUser', function () {
  if (!this.userId) return this.ready();
  var user = Meteor.users.findOne(this.userId);
  var groupList = user.groups;
  return EventData.find({group_id: {$in: groupList}, date: {$gte: new Date()}});
});
Meteor.publish('eventNMemberByGroup', function (groupId) {
  if (!this.userId) return this.ready();
  return [EventData.find({group_id: groupId}), Meteor.users.find({groups: groupId})]
});
Meteor.publish('eventById', function (eventId) {
  if (!this.userId) return this.ready();
  return EventData.find({_id: eventId})
});
Meteor.publish('groupById', function (groupId) {
  if (!this.userId) return this.ready();
  return Group.find({_id: groupId})
});
Meteor.publish('topicsHold', function (eventId) {
  if (!this.userId) return this.ready();
  return Topic.find({event_id: eventId})
});
Meteor.publish('voteTopics', function (_type) {
  if (!this.userId) return this.ready();
  return Vote.find({type: _type})
});
Meteor.publish('voteByTypeNId', function (type, id) {
  if (!this.userId) return this.ready();
  return Vote.find({type: type, reference_id: id, byUser: this.userId})
});

Meteor.publish('voteComingForEvent', function(id){
  if (!this.userId) return this.ready();
  return Vote.find({type: 'event', reference_id: id, is_here: true},{
    fields: {
      'type': 1,
      'reference_id': 1,
      'byUser': 1,
      'is_here': 1
    }})
});

Meteor.publish('loadAllBeacons',function(){
  if (!this.userId) return this.ready();
  return EstBeacon.find({})
});