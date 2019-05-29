import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete } from 'tsoa';
import { PcGamingModel, PcGamingPost } from '../model/pc_gaming';


@Route('/pc-gaming')
export class PCMRController extends Controller {
  // GET
  @Get()
  public async getAll(): Promise<PcGamingPost[]> {
    // find all documents in the todo collection
    try {
      let items:any = await PcGamingModel.find({});
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

  // UPDATE
  @Put('/{id}')
  // make sure function args match path parameters
  public async update(
    id: string,
     @BodyProp() link: string) : Promise<void> {
    // Find document by id and Update
    await PcGamingModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  

  // DELETE
  @Delete('/{id}')
  public async remove(id: string) : Promise<void> {
    // Find document by Id and Delete
    await PcGamingModel.findByIdAndDelete(id);
  }
 
}