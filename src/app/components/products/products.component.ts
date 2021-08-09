import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from "rxjs/operators";
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActionEvent, AppDataState, DataStateEnum, GettersActionsOnProducts, SettersActionsOnProducts } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$!: Observable<AppDataState<Product[]>>;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductsService,
    private eventDrivenService: EventDriverService,
    private router: Router) { }

  ngOnInit(): void {
    //TODO  ici il faut faire une subscribe au subject des events 
    // pour recevoir l'action souhaité par le user depuis n'importe ou dans l'app
    // puis faire un appel au methode qui existe selon le type de l'event 
    // exple : faire appel a this.hundleClickGetAllProducts()  si le type de l'event est GET_ALL_PRODUCTS
    this.eventDrivenService.productSubjectObservable.subscribe(
      ($event: ActionEvent) => {
        switch ($event.eventName) {
          case GettersActionsOnProducts.GET_ALL_PRODUCTS: this.hundleClickGetAllProducts(); break;
          case GettersActionsOnProducts.GET_SELECTED_PRODUCTS: this.hundleClickGetSelectedProducts(); break;
          case GettersActionsOnProducts.GET_AVAILABLE_PRODUCTS: this.hundleClickGetAvailableProducts(); break;
          case GettersActionsOnProducts.SEARCH_PRODUCTS: this.onSubmitSearchProduct($event.eventPlayload); break;

          case SettersActionsOnProducts.SELECT_PRODUCT: this.hundleClickSelectProduct($event.eventPlayload); break;
          case SettersActionsOnProducts.DELETE_PRODUCT: this.hundleClickDelete($event.eventPlayload); break;
          case SettersActionsOnProducts.EDIT_PRODUCT: this.hundleClickEdit($event.eventPlayload); break;
          case SettersActionsOnProducts.ADD_PRODUCT: this.hundleClickAddProduct(); break;
        }
      }
    );
  }
  hundleClickGetAllProducts() {
    this.products$ = this.productService.getAllProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  hundleClickGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  hundleClickGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts()
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  onSubmitSearchProduct(f: NgForm) {
    this.products$ = this.productService.searchProducts(f.value['keyword'])
      .pipe(
        map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
        startWith({ dataState: DataStateEnum.LOADING }),
        catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))

      );
  }
  hundleClickSelectProduct(p: Product) {
    this.productService.selectProduct(p)
      .subscribe(
        (data) => {
          p.selected = data.selected;
        }
      )
  }
  hundleClickDelete(p: Product) {
    let v = confirm("Etes vous sûre ? ");
    if (v) {
      this.productService.deleteProduct(p)
        .subscribe(
          data => {
            this.hundleClickGetAllProducts();
          }
        )
    }
  }
  hundleClickAddProduct() {
    this.router.navigate(['/newProduct']);
  }
  hundleClickEdit(p: Product) {
    this.router.navigate(['/editProduct/' + p.id]);

  }
}
