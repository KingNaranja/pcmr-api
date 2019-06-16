import { PcmrModel } from './../model/pcmr';
import { Subreddit } from './reddit';
import { PcGamingModel } from '../model/pc_gaming';
import { BuildPcModel } from '../model/build_pc';
import { PcSaleModel } from '../model/pc_sales';


const fetchSubredditData = async (): Promise<void> => {
  const Pcmr = new Subreddit('pcmasterrace');
  const BuildPc = new Subreddit('buildapc');
  const PcGaming = new Subreddit('pcgaming');
  const PcSales = new Subreddit('buildapcsales');
  

  try {
    await Pcmr.fetchPosts();
    await Pcmr.posts.forEach( post => {
      const pcmrPost = new PcmrModel({
          title: post.title,
          link: post.link,
          img: post.img,
          submissionId: post.submissionId
      });
      pcmrPost.save();
    })
    await BuildPc.fetchPosts()
    await BuildPc.posts.forEach( post => {
      const pcBuildPost = new BuildPcModel({
          title: post.title,
          link: post.link,
          submissionId: post.submissionId
        });
      pcBuildPost.save();
    })

    await PcGaming.fetchPosts();
    await PcGaming.posts.forEach( post => { 
      const pcGamingPost = new PcGamingModel({
          title: post.title,
          link: post.link,
          submissionId: post.submissionId
        });
      pcGamingPost.save();
    })

    await PcSales.fetchPosts()
    await PcSales.posts.forEach( post => {
      // POST new reddit posts to db 
      const pcSalePost = new PcSaleModel({
          title: post.title,
          link: post.link,
          submissionId: post.submissionId
        });
      pcSalePost.save();
    })
  } catch(err) {
    console.error('Error creating new subreddit documents ', err);
  }

}

const wipeDatabase = async (): Promise<void> => {
  try {
    await PcmrModel.deleteMany({});
    await PcGamingModel.deleteMany({});
    await BuildPcModel.deleteMany({});
    await PcSaleModel.deleteMany({});
  } catch(err) {
    console.error('Error cleaning database', err);
  }
}

// scheduled task 
export const populateDb = async () => {
  console.info('Fetching new subreddit data...');
  
  await Promise.all([
    wipeDatabase(),
    fetchSubredditData(),
  ]);
};

