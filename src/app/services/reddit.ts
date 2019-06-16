import * as snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';
import * as moment from 'moment';
dotenv.config();

const r = new snoowrap({
  userAgent: 'Node.js api client by /u/kledaa',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET, 
  refreshToken: process.env.REFRESH_TOKEN 
});


export class Subreddit {
  private name: string;
  posts: any[];

  constructor(subName:string) {
    this.name = subName;
    this.posts = [];    
  }
 
  fetchPosts = async ():Promise<void> => {
    try {
      // grab submissions using `name` param
      const posts:any[] = await r.getHot(this.name, {limit: 30}).slice(2);
      
      const subredditData:any[] = await posts.map( post => {
        return {
          title: post.title,
          link: post.permalink,
          img: post.url,
          submissionId: post.id
        };
      })
      this.posts = subredditData;
    
    } catch(err) {
      console.error('Error fetching submissions from Reddit', err);
    }

  }

  static fetchComments = async (id:string) => {
    try{
      const req = r.getSubmission(id).comments.fetchMore({amount:1});
      
      const comments =  req.map(comment => {
        return {
          body : comment.body,
          author : comment.author_fullname,
          created_at : moment.unix(comment.created_utc).fromNow()
        }
      });
      Promise.all([req,comments]);
      return comments;
    } 
    catch(err) {
      console.error('Error fetching submission comments from Reddit', err);
    }
  }
}
