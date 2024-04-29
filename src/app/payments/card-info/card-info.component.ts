import { Component, Input, ViewChild } from '@angular/core';
import { Card, CardDetails } from '../../type/card';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentsService } from '../../shared/services/payments.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.css',
})
export class CardInfoComponent {
  @Input() payments!: any[];
  @ViewChild('addCardForm') addCardForm!: NgForm;
  @ViewChild('editCardForm') editCardForm!: NgForm;
  constructor(
    private authService: AuthService,
    private paymentService: PaymentsService,
    private toastr: ToastrService // Inject the toastr service
  ) {}

  editPayment!: Card;
  addPayment = this.setAddPaymentBlank();
  isSelected = true;

  addSubmit() {
    const [month, year] = this.addPayment.validThrough.split('/');
    const formattedValidThrough = `20${year}-${month}-01`;
    this.addPayment.validThrough = formattedValidThrough;
    this.paymentService.addCard(this.addPayment).subscribe(
      (result) => {
        this.addCardForm.resetForm();
        this.toastr.success('Card added successfully'); // Use toastr for success
      },
      (error) => {
        this.toastr.error('Error adding payment:'); // Use toastr for error
      }
    );
  }
  editSubmit() {
    const { id, ...editedPayment } = this.editPayment;
    console.log(this.editPayment);
    const [month, year] = editedPayment.validThrough.split('/');
    const formattedValidThrough = `20${year}-${month}-01`;
    editedPayment.validThrough = formattedValidThrough;

    this.paymentService.updateCard(id, editedPayment).subscribe(
      () => {
        this.toastr.success('Card updated successfully'); // Use toastr for success
        this.editCardForm.resetForm();
        this.isSelected = true;
      },
      (error) => {
        this.toastr.error('Error updating payment:'); // Use toastr for error
      }
    );
  }
  deleteCard(payment: Card) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.paymentService.deleteCard(payment.id).subscribe(
        () => {
          this.toastr.success('Card deleted successfully'); // Use toastr for success
        },
        (error) => {
          this.toastr.error('Error deleting card:'); // Use toastr for error
        }
      );
    }
  }
  onEditClick(payment: Card) {
    this.editPayment = { ...payment };
    this.editPayment.validThrough = this.formatValidThrough(
      payment.validThrough
    );
    this.isSelected = false;
  }
  private formatValidThrough(validThrough: string): string {
    const date = new Date(validThrough);
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    return `${month.toString().padStart(2, '0')}/${year
      .toString()
      .padStart(2, '0')}`;
  }

  setAddPaymentBlank(): CardDetails {
    return {
      cardOwnerName: '',
      cardNumber: '',
      securityCode: '',
      validThrough: '',
      userId: JSON.parse(this.authService.getUserDetails()).userID,
    };
  }
}
