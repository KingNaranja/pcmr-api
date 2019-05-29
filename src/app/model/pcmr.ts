import * as mongoose from 'mongoose';

interface PcmrPost {
  _id: string, 
  title: string, 
  link: string, 
  img: string
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
  }

})

const PcmrModel = mongoose.model('PCMR', PcmrSchema)

export { PcmrModel, PcmrPost }