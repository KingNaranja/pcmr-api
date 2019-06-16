import * as mongoose from 'mongoose';

interface PcSaleIndex {
  _id: string, 
  title: string, 
  link: string,
  created_at: string,
  submissionId: string
}

interface PcSalePost extends PcSaleIndex {
  comments? : Comment
}

const PcSaleSchema = new mongoose.Schema({
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

const PcSaleModel = mongoose.model('pc-sales', PcSaleSchema)

export { PcSaleModel, PcSaleIndex, PcSalePost }