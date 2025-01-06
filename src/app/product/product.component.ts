import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
@Input() model:ProductModel|undefined=undefined;
@Output() saved= new EventEmitter<ProductModel>();


getValue(event: any):string {
  return event.target.value;
}

getNumberValue(event: any):number {
  return Number(event.target.value);
}

save() {
  this.saved.emit(this.model);
}


}
