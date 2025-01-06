import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModel } from './models/product-model';
import { DataService } from '../services/data.service';
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products:ProductModel[]=[];

  modify: ProductModel |undefined=undefined; 
  new: ProductModel |undefined=undefined; 


  constructor(private dataService: DataService){ }

  ngOnInit(){
    this.dataService.getProducts().subscribe({
      next: (data: ProductModel[]) => {this.products = data;},

      error: (err) =>console.log(err)
    });
  }


  newProduct(){
    this.new={
      id:undefined, 
      name:"", 
      price:1, 
      category:"", 
      stock:1, 
      description:""
    };
  }

  saveNew(prod:ProductModel){
    this.dataService.addProduct(prod).subscribe({
      next: (data: ProductModel) => {
        const index = this.products.findIndex((p) => p.id === data.id);
        this.products.push(data);
        this.new = undefined;
      
      },
      
      error: (err) => console.log(err)
    })
  }

  modifyProduct(prod: ProductModel)
  {
    this.modify=JSON.parse(JSON.stringify(prod));
  }

  saveModify(prod:ProductModel)
  {
    this.dataService.modifyProduct(prod).subscribe({
      next: (data: ProductModel) => {
        const index = this.products.findIndex((p) => p.id === data.id);
        this.products[index] = data;
        this.modify = undefined;
      
      },
      
      error: (err) => console.log(err)
    })
  }

  deleteProduct(prod:ProductModel){
    this.dataService.deleteProduct(prod).subscribe({
      next: (data: ProductModel) => {
        const index = this.products.findIndex((p) => p.id === data.id);
        this.products.splice(index, 1);
        this.modify = undefined;
      },
      
      error: (err) => console.log(err)
    })
  }

 

}
