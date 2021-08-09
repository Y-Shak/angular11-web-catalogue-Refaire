import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { GettersActionsOnProducts, SettersActionsOnProducts } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
  }

  hundleClickSelectProduct(product: Product) {
    this.eventDrivenService.publishSetterEvent({ eventName: SettersActionsOnProducts.SELECT_PRODUCT, eventPlayload: product });
  }

  hundleClickDelete(product: Product) {
    this.eventDrivenService.publishSetterEvent({ eventName: SettersActionsOnProducts.DELETE_PRODUCT, eventPlayload: product });
  }
  hundleClickEdit(product: Product) {
    this.eventDrivenService.publishSetterEvent({ eventName: SettersActionsOnProducts.EDIT_PRODUCT, eventPlayload: product });
  }

}
