import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { PcGamingModel, PcGamingPost } from '../model/pc_gaming';


@Route('/pc-gaming')
@Tags('Pc Gaming')
export class PcGamingController extends Controller {
  // GET
  @Get()
  public async getAll(): Promise<PcGamingPost[]> {
    try {
      let items:any = await PcGamingModel.find({});
      items = items.map( item => {
        return { 
          id: item._id,
          title: item.title,
          link: item.link
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