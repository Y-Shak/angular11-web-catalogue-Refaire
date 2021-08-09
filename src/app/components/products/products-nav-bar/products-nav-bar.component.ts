import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, GettersActionsOnProducts, SettersActionsOnProducts } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
  }

  hundleClickGetAllProducts() {
    this.eventDrivenService.publishGetterEvent({ eventName: GettersActionsOnProducts.GET_ALL_PRODUCTS });
  }

  hundleClickGetSelectedProducts() {
    let $eventToSend = { eventName: GettersActionsOnProducts.GET_SELECTED_PRODUCTS };
    this.eventDrivenService.publishGetterEvent($eventToSend);
  }

  hundleClickGetAvailableProducts() {
    this.eventDrivenService.publishGetterEvent({ eventName: GettersActionsOnProducts.GET_AVAILABLE_PRODUCTS });
  }

  onSubmitSearchProduct(f: NgForm) {
    this.eventDrivenService.publishGetterEvent({ eventName: GettersActionsOnProducts.SEARCH_PRODUCTS, eventPlayload: f });
  }

  hundleClickAddProduct() {
    this.eventDrivenService.publishSetterEvent({ eventName: SettersActionsOnProducts.ADD_PRODUCT });
  }

}
