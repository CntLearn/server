const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
  // id that will be by default
  title: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'todo', // todos, inProgress, codeReview, deployedForTesting, testing, done
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  due_date: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    default: 'low', // low, high, medium
  },
  // tags/labels
  tags: {
    type: String,
    default: ''// categorize the task
  },
  assingedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: ''
  },
  //notes/comments
  comments: {
    type: String,
    default: '',
  },
  attachments: {
    type: [],
    default: []
  },

  // reminder/notification date for the task due date
  reminder: {
    type: Date,
    default: ''
  },
  isArchice: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Number,
    default: 0
  },
  completeStatus: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    default: '',
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Users',
    default: '',
    required:true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  subTasks: {
    type: [],
    default: []
  }
})

const Todos = mongoose.model('todos', TodosSchema);

module.exports = Todos;