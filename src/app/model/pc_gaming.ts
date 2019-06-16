import * as mongoose from 'mongoose';

interface PcGamingIndex {
  _id: string, 
  title: string, 
  link: string,
  submissionId: string
}

interface PcGamingPost extends PcGamingIndex {
  comments?: Comment
}

const PcGamingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  link: {
    type: String ,
    required: true
  },
  submissionId: {
    type: String,
    required: true
  }

})

const PcGamingModel = mongoose.model('pc-gaming', PcGamingSchema)

export { PcGamingModel, PcGamingIndex, PcGamingPost }