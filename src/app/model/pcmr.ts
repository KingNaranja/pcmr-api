import * as mongoose from 'mongoose';

interface Comment {
  body: string,
  author: string,
  created_at: string
}

interface PcmrIndex {
  _id: string, 
  title: string, 
  link: string, 
  img?: string,
  submissionId: string
}

interface PcmrPost extends PcmrIndex {
  comments?: Comment
}


const PcmrSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  link: {
    type: String ,
    required: true
  },
  img: {
    type: String
  },
  submissionId: {
    type: String,
    required: true
  }

})

const PcmrModel = mongoose.model('pcmr', PcmrSchema)

export { PcmrModel, PcmrPost, PcmrIndex }