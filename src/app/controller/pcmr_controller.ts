import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { PcmrModel, PcmrPost, PcmrIndex } from '../model/pcmr';
import { Subreddit } from '../services/reddit';


@Route('/pcmr')
@Tags('Pc Master Race')
export class PCMRController extends Controller {
  // Index
  @Get()
  public async getAll(): Promise<PcmrIndex[]> {
    try {
      let items:any = await PcmrModel.find({});
      // mongodb documents have a key of _id instead of id,
      // map the doc items into more friendly objects
      items = items.map( item => {
        return { 
          id: item._id,
          title: item.title,
          link: item.link, 
          img: item.img,
          created_at: item.created_at,
          submissionId: item.submissionId
        }
      })
      return items;
    } catch (err) {
      this.setStatus(500);
      console.error('Caught Error', err)
    }
  }

  // Get One 
  @Get('/{id}')
  public async getOne(id:string):Promise<PcmrPost>{
    try {
      const item:any = await PcmrModel.findById(id);

      const post:any = {
        id: item._id,
        title: item.title,
        link: item.link, 
        img: item.img,
        created_at: item.created_at,
        submissionId: item.submissionId
      }
      const comments = await Subreddit.fetchComments(post.submissionId);
      post.comments = comments;

      return post;
    }
    catch(err){
      console.error('Caught Error', err)
    }
  }

  // UPDATE
  @Put('/{id}')
  public async update(
    id: number,
     @BodyProp() link: string) : Promise<void> {
    // Find document by id and Update
    await PcmrModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  
  // DELETE
  @Delete('/{id}')
  public async remove(id: number) : Promise<void> {
    // Find document by Id and Delete
    await PcmrModel.findByIdAndDelete(id);
  }
 
}