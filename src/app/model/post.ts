import * as mongoose from 'mongoose';

interface RedditPost {
  _id: string, 
  title: string, 
  link: string, 
  img: string
}

const PostSchema = new mongoose.Schema({
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

const PostModel = mongoose.model('Post', PostSchema)

export { PostModel, RedditPost }