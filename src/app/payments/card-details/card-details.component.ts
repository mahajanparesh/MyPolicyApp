import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Card } from '../../type/card';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css',
})
export class CardDetailsComponent {
  @Input() isSelected: boolean = false;
  @Input() payment!: Card;
  @Output() editClicked: EventEmitter<any> = new EventEmitter<boolean>();
  @Output() paymentChange: EventEmitter<Card> = new EventEmitter<Card>();
  validateForm: boolean = true;
  localPayment: Card = {
    cardNumber: '',
    cardOwnerName: '',
    id: 0,
    securityCode: '',
    userId: 0,
    validThrough: '',
  };

  editSubmit() {
    console.log('ola');
    this.isSelected = true;
    console.log(this.localPayment);
    this.localPayment = this.setBlank();
    this.paymentChange.emit(this.payment);
    this.validateForm = false;
    this.editClicked.emit(true);
    this.validateForm = true;
  }
  addSubmit() {
    console.log('Add Button Called');
    console.log(this.localPayment);
  }
  setBlank(): Card {
    return {
      cardNumber: '',
      cardOwnerName: '',
      id: 0,
      securityCode: '',
      userId: 0,
      validThrough: '',
    };
  }
}
