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
    // loop through fetched data 
    await Pcmr.posts.forEach( post => {
      // add new reddit posts to db 
      const pcmrPost = new PcmrModel({
          title: post.title,
          link: post.link,
          img: post.img
      });
      pcmrPost.save();
    })

    await BuildPc.posts.forEach( post => {
      const pcBuildPost = new BuildPcModel({
          title: post.title,
          link: post.link
        });
      pcBuildPost.save();
    })

    await PcGaming.posts.forEach( post => { 
      const pcGamingPost = new PcGamingModel({
          title: post.title,
          link: post.link
        });
      pcGamingPost.save();
    })

    await PcSales.posts.forEach( post => {
      // POST new reddit posts to db 
      const pcSalePost = new PcSaleModel({
          title: post.title,
          link: post.link
        });
      pcSalePost.save();
    })
  } catch(err) {
    console.error('Error creating new subreddit documents ', err)
  }

}

const wipeDatabase = async (): Promise<void> => {
  try {
    await PcmrModel.deleteMany({});
    await PcGamingModel.deleteMany({});
    await BuildPcModel.deleteMany({});
    await PcSaleModel.deleteMany({});
  } catch(err) {
    console.error('Error cleaning database', err)
  }
}

// scheduled task 
export const populateDb = async () => {
  console.info('Fetching new subreddit data...');
  await Promise.all([
    wipeDatabase(),
    fetchSubredditData(),
  ])
};

