import * as express from 'express';
import { Controller, Route, Get, BodyProp, Put, Delete, Tags } from 'tsoa';
import { PcSaleModel, PcSalePost } from '../model/pc_sales';


@Route('/pc-sales')
@Tags('Pc Sales')
export class PcSalesController extends Controller {
  // GET
  @Get()
  public async getAll(): Promise<PcSalePost[]> {
    // find all documents in the todo collection
    try {
      let items:any = await PcSaleModel.find({});
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
  // make sure function args match path parameters
  public async update(
    id: string,
     @BodyProp() link: string) : Promise<void> {
    // Find document by id and Update
    await PcSaleModel.findByIdAndUpdate(id, {link:link},{new: true});
  }
  

  // DELETE
  @Delete('/{id}')
  public async remove(id: string) : Promise<void> {
    // Find document by Id and Delete
    await PcSaleModel.findByIdAndDelete(id);
  }
 
}