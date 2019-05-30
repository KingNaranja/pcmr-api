import * as snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';
dotenv.config();

const r = new snoowrap({
  userAgent: 'Node.js api client by /u/kledaa',
  clientId: process.env.CLIENT_ID, // ENV
  clientSecret: process.env.CLIENT_SECRET, // ENV
  refreshToken: process.env.REFRESH_TOKEN // ENV
});


export class Subreddit {
  name: string;
  posts: any[];

  constructor(subName:string) {
    this.name = subName;
    this.posts = [];
    this.fetchPosts();
    
  }

  // Fetch subreddit submissions from Reddit 
  private fetchPosts = async ():Promise<void> => {
    try {
      // grab submissions using `name` param
      const posts:any[] = await r.getHot(this.name, {limit: 25});
      
      const subredditData:any[] = await posts.map( post => {
        return {
          title: post.title,
          link: post.permalink,
          img: post.url
        };
      })
      // store fetched data 
      this.posts = subredditData;
    
    } catch(err) {
      console.error('Error fetching submissions from Reddit', err)
    }

  }
}
