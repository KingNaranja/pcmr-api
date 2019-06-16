import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { PcSaleModel, PcSalePost, PcSaleIndex } from '../model/pc_sales';
import { Subreddit } from '../services/reddit';


@Route('/pc-sales')
@Tags('Pc Sales')
export class PcSalesController extends Controller {
  // Index
  @Get()
  public async getAll(): Promise<PcSaleIndex[]> {
    try {
      let items:any = await PcSaleModel.find({});
      // docs must have key of id instead of _id
      items = items.map( item => {
        return { 
          id: item._id,
          title: item.title,
          link: item.link,
          created_at: item.created_at,
          submissionId: item.submissionId
        };
      });
      return items;
    } catch (err) {
      this.setStatus(500);
      console.error('Caught Error', err);
    }
  }

  // Get One 
  @Get('/{id}')
  public async getOne(id:string):Promise<PcSalePost>{
    try {
      const item:any = await PcSaleModel.findById(id);

      const post:any = {
        id: item._id,
        title: item.title,
        link: item.link,
        created_at: item.created_at, 
        submissionId: item.submissionId
      };
      const comments = await Subreddit.fetchComments(post.submissionId);
      post.comments = comments;

      return post;
    }
    catch(err){
      console.error('Caught Error', err);
    }
  }

  // UPDATE
  @Put('/{id}')
  public async update(
    id: string,
     @BodyProp() link: string) : Promise<void> {
    await PcSaleModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  

  // DELETE
  @Delete('/{id}')
  public async remove(id: string) : Promise<void> {
    await PcSaleModel.findByIdAndDelete(id);
  }
 
}