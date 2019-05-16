import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /*定义搜索事件流*/
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter<ProductSearchParams>();

  constructor(private http: HttpClient) {
  }

  /*得到所有商品*/
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  /*根据ID 得到商品*/
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('/api/product/' + id);
  }

  /*根据商品ID得到商品的评价*/
  getCommentsForProductId(id: number): Observable<Comment []> {
    return this.http.get<Comment[]>('/api/product/' + id + '/comments');
  }

  /*得到所有的商品类别*/
  getAllCategories(): string[] {
    return ['电子产品', '硬件设备', '图书'];
  }

  /*查询方法*/
  search(params: ProductSearchParams): Observable<Product[]> {/* {params: new HttpParams()}*/
    return this.http.get<Product[]>('/api/products'+ this.encodeParams(params));
  }


  /*转换参数------*/

    private encodeParams(params: ProductSearchParams) {
      return Object.keys(params)
        .filter(key => params[key])
        .reduce((sum: string, key: string, index: number) => {
          sum += (`${(index === 0 ? "?" : "&")}${key}=${params[key]}`);
          return sum;
        }, '');
    }

/*  private encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: HttpParams, key: string) => {
        sum.append(key,params[key]);
        return sum;
      }, new HttpParams());
  }*/



}  /*服务结束---------*/


/*声明商品类*/
export class Product{
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ){
  }
}

/*声明评价类*/
export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ){}
}

/*搜索参数类*/
export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ){}
}
