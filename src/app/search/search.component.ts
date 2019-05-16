import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModel: FormGroup;
  categories: string[];

  constructor(fb: FormBuilder, private productService: ProductService) {
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  onSearch() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
      /*发射流*/
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }


  /*自定义校验器*/
  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    let price = parseInt(control.value);
    if (price > 0) {
      return null;
    }else {
      return {positiveNumber: true};
    }

  }


}
