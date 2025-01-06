import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../app/models/product-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  url='http://localhost:3000/products';

  getProducts():Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.url);
  }

  addProduct(prod: ProductModel):Observable<ProductModel>{
    return this.http.post<ProductModel>(this.url, prod);
  }

  modifyProduct(prod: ProductModel):Observable<ProductModel>{
    return this.http.put<ProductModel>(`${this.url}/${prod.id}`, prod);
  }

  deleteProduct(prod: ProductModel):Observable<ProductModel>{
    return this.http.delete<ProductModel>(`${this.url}/${prod.id}`);
  }
}
