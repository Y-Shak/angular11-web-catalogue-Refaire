import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionEvent } from '../state/product.state';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {

  //TODO si tu veux faire un subject pour chaque type d'event 
  // il faut dans state declarer 
  productSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  productSubjectObservable = this.productSubject.asObservable();

  publishGetterEvent($event: ActionEvent) {
    this.productSubject.next($event);
  }
  publishSetterEvent($event: ActionEvent) {
    this.productSubject.next($event);
  }
  publishStatisticsEvent($event: ActionEvent) {
    this.productSubject.next($event);
  }

  constructor() { }
}
