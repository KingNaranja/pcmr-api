import * as snoowrap from 'snoowrap';
import * as dotenv from 'dotenv';

dotenv.config();

const r = new snoowrap({
  userAgent: 'PCMR node api by /u/kledaa',
  clientId: process.env.CLIENT_ID, // ENV
  clientSecret: process.env.CLIENT_SECRET, // ENV
  refreshToken: process.env.REFRESH_TOKEN // ENV
});


class Subreddit {
  // pcmr: [object];
  // pcGaming: [object];
  // buildPc: [object];
  // sales: [object];
  name: string;
  posts: any[];

  constructor(subName:string) {
    this.name = subName;
    this.posts = [];
    
  }


  // Fetch submissions from subreddit
  fetchPosts = async ():Promise<void> => {
    // grab submissions using `name` param
    const posts:any[] = await r.getHot(this.name, {limit: 25});
    
    // map submission data into post objects 
    const subredditData:any[] = await posts.map( post => {
      return {
        title: post.title,
        link: post.permalink,
        img: post.url
      };
    })
    // update the array of Subreddit posts
    this.posts = subredditData;
    
  }
}


export { Subreddit }  