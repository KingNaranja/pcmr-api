import * as mongoose from 'mongoose';

interface PcSalePost {
  _id: string, 
  title: string, 
  link: string
}

const PcSaleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  } ,
  link: {
    type: String ,
    required: true
  }
})

const PcSaleModel = mongoose.model('pc-sales', PcSaleSchema)

export { PcSaleModel, PcSalePost }