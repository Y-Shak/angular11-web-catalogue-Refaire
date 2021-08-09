import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {


  @Input() products$!: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {

  }

  // TODO verifie ce quoi renvoie data pour compter la taille du tableau 
  testData() {
    this.products$.subscribe(
      (result) => {
        console.log(result);
      }
    )
  }

}
