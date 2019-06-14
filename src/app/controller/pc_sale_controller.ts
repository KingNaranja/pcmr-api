import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { PcSaleModel, PcSalePost } from '../model/pc_sales';


@Route('/pc-sales')
@Tags('Pc Sales')
export class PcSalesController extends Controller {
  // GET
  @Get()
  public async getAll(): Promise<PcSalePost[]> {
    try {
      let items:any = await PcSaleModel.find({});
      // docs must have key of id instead of _id
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