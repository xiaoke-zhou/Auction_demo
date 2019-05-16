import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

   /* 声明数据*/
  private products: Observable<Product[]>;

/*  /!*响应式编程*!/
  private keyword: string;
  private titleFilter: FormControl = new FormControl();*/

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    /*订阅搜索提交事件流*/
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    )

  }
}


