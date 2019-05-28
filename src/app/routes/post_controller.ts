import * as express from 'express';
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import { PostModel, RedditPost } from '../model/post';


@Route('/pcmr')
export class PostController extends Controller {
  // GET
  @Get()
  public async getAll(): Promise<RedditPost[]> {
    // find all documents in the todo collection
    try {
      let items:any = await PostModel.find({});
      // mongodb documents have a key of _id instead of id,
      // map the doc items into more friendly objects
      items = items.map( item => {
        return { 
          id: item._id,
          title: item.title,
          link: item.link, 
          img: item.img
        }
      })
      return items;
    } catch (err) {
      this.setStatus(500);
      console.error('Caught Error', err)
    }
  }

  

  // CREATE
  @Post()
  public async create(
    // pull params from request body
    @BodyProp() title:string, link:string, img: string) : 
    Promise<void> {
      // insert new document into db
      const document = new PostModel({ 
        title: title,
        link: link, 
        img: img
      });
      await document.save();
  }



  // UPDATE
  @Put('/{id}')
  // make sure function args match path parameters
  public async update(
    id: string,
     @BodyProp() link: string) : Promise<void> {
    // Find document by id and Update
    await PostModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  

  // DELETE
  @Delete('/{id}')
  public async remove(id: string) : Promise<void> {
    // Find document by Id and Delete
    await PostModel.findByIdAndDelete(id);
  }
 
}