import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService, Comment} from '../shared/product.service';
import {WebSocketService} from '../shared/web-socket.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  product: Product;
  comments: Comment[];

  newRating: number = 5;
  newComment: string = '';

  isCommentHidden: boolean = true;

  isWatched: boolean = false;
  currentBid: number;

  subscription: Subscription; /*订阅方法返回的值*/

  constructor(private routerInfo: ActivatedRoute,
              private productService: ProductService,
              private wsService: WebSocketService
  ) {
  }

  ngOnInit() {
    let productId: number = this.routerInfo.snapshot.params["productId"];
    /*--------订阅流-------*/
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toISOString(), 'zhou', this.newRating, this.newComment);
    this.comments.unshift(comment);

    /*恢复原有样式*/
    this.newComment = null;
    this.newRating = 5;
    this.isCommentHidden = true;

    /*重新计算商品的最终星级*/
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;

  }

  /*关注商品方法---------*/
  watchProduct(){
    /*----判断是否已经订阅*/
    if (this.subscription) {
      this.subscription.unsubscribe();    //取消订阅
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      /*--------订阅流---------*/
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id)
        .subscribe(
          products => {
            let product = products.find(p => p.productId === this.product.id);
            this.currentBid = product.bid;
          }
        );
    }  //else 结束

  }  //watchProduct  结束


}
