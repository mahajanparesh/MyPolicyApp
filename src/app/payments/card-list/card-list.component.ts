import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  @Input() payments!: any[];
  @Output() editClicked: EventEmitter<any> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();

  emitEditClicked(payment: any) {
    this.editClicked.emit(payment);
  }

  emitDeleteClicked(payment: any) {
    this.deleteClicked.emit(payment);
  }
}
