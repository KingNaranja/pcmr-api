import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { PcGamingModel, PcGamingPost, PcGamingIndex } from '../model/pc_gaming';
import { Subreddit } from '../services/reddit';


@Route('/pc-gaming')
@Tags('Pc Gaming')
export class PcGamingController extends Controller {
  // Index
  @Get()
  public async getAll(): Promise<PcGamingIndex[]> {
    try {
      let items:any = await PcGamingModel.find({});
      items = items.map( item => {
        return { 
          id: item._id,
          title: item.title,
          link: item.link,
          submissionId: item.submissionId
        }
      });
      return items;
    } catch (err) {
      this.setStatus(500);
      console.error('Caught Error', err);
    }
  }

  // Get One 
  @Get('/{id}')
  public async getOne(id:string):Promise<PcGamingPost>{
    try {
      const item:any = await PcGamingModel.findById(id);

      const post:any = {
        id: item._id,
        title: item.title,
        link: item.link, 
        submissionId: item.submissionId
      }
      const comments = await Subreddit.fetchComments(post.submissionId);
      post.comments = comments 

      return post;
    }
    catch(err){
      console.error('Caught Error', err)
    }
  }

  // UPDATE
  @Put('/{id}')
  public async update(
    id: string,
     @BodyProp() link: string) : Promise<void> {
    await PcGamingModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  

  // DELETE
  @Delete('/{id}')
  public async remove(id: string) : Promise<void> {
    await PcGamingModel.findByIdAndDelete(id);
  }
 
}