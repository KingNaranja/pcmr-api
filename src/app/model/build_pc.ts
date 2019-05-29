import * as mongoose from 'mongoose';

interface BuildPcPost {
  _id: string, 
  title: string, 
  link: string
}

const BuildPcSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  link: {
    type: String ,
    required: true
  }
})

const BuildPcModel = mongoose.model('build-a-pc', BuildPcSchema)

export { BuildPcModel, BuildPcPost }