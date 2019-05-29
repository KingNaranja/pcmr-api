import * as mongoose from 'mongoose';

interface PcGamingPost {
  _id: string, 
  title: string, 
  link: string, 
}

const PcGamingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  link: {
    type: String ,
    required: true
  }

})

const PcGamingModel = mongoose.model('PcGaming', PcGamingSchema)

export { PcGamingModel, PcGamingPost }