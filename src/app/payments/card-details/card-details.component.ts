import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  editSubmit() {
    console.log('ola');
    this.isSelected = true;
    this.editClicked.emit(true);
  }
}
