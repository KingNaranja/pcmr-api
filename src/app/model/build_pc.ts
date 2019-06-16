import * as mongoose from 'mongoose';

interface BuildPcIndex {
  _id: string, 
  title: string, 
  link: string,
  created_at: string,
  submissionId: string
}

interface BuildPcPost extends BuildPcIndex {
  comments?: Comment
}

const BuildPcSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  link: {
    type: String ,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  submissionId: {
    type: String,
    required: true
  }
})

const BuildPcModel = mongoose.model('build-a-pc', BuildPcSchema)

export { BuildPcModel, BuildPcIndex, BuildPcPost }