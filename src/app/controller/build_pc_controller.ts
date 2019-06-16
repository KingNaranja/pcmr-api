import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { BuildPcModel, BuildPcPost, BuildPcIndex } from '../model/build_pc';
import { Subreddit } from '../services/reddit';


@Route('/build-pc')
@Tags('Build a Pc')
export class BuildPcController extends Controller {
  // Index
  @Get()
  public async getAll(): Promise<BuildPcIndex[]> {
    try {
      let items:any = await BuildPcModel.find({});
      // docs must have key of id instead of _id
      items = items.map( item => {
        return { 
          id: item._id,
          title: item.title,
          link: item.link,
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
  public async getOne(id:string):Promise<BuildPcPost>{
    try {
      const item:any = await BuildPcModel.findById(id);

      const post:any = {
        id: item._id,
        title: item.title,
        link: item.link, 
        submissionId: item.submissionId
      }
      const comments = await Subreddit.fetchComments(post.submissionId);
      post.comments = comments 

      return post 
    }
    catch(err){
      console.error('Caught Error', err)
    }
  }

  // UPDATE
  @Put('/{id}')
  // make sure function args match path parameters
  public async update(
    id: string,
     @BodyProp() link: string) : Promise<void> {
    // Find document by id and Update
    await BuildPcModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  

  // DELETE
  @Delete('/{id}')
  public async remove(id: string) : Promise<void> {
    // Find document by Id and Delete
    await BuildPcModel.findByIdAndDelete(id);
  }
 
}