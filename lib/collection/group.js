var groupSchema = new SimpleSchema([{
  owner_id: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  image: {
    type: String,
    optional: true
  },


}, baseSchema]);

Group = new Mongo.Collection('group-user');
Group.attachSchema(groupSchema);

DB.group = Group;