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
  @ViewChild('cardForm') form!: NgForm;
  constructor(
    private authService: AuthService,
    private paymentService: PaymentsService,
    private toastr: ToastrService
  ) {}

  payment = this.setAddPaymentBlank();
  isSelected = true;

  addSubmit() {
    console.log(this.payment);
    const [month, year] = this.payment.validThrough.split('/');
    const formattedValidThrough = `20${year}-${month}-01`;
    this.payment.validThrough = formattedValidThrough;
    this.paymentService.addCard(this.payment).subscribe(
      (result) => {
        this.clearForm();
        this.toastr.success('Card added successfully');
      },
      (error) => {
        this.toastr.error('Error adding payment:');
      }
    );
  }
  editSubmit() {
    const id = this.payment.id;
    const [month, year] = this.payment.validThrough.split('/');
    const formattedValidThrough = `20${year}-${month}-01`;
    this.payment.validThrough = formattedValidThrough;
    console.log(this.payment);
    this.paymentService.updateCard(id, this.payment).subscribe(
      () => {
        this.toastr.success('Card updated successfully');
        this.clearForm();
        this.isSelected = true;
      },
      (error) => {
        this.toastr.error('Error updating payment:');
      }
    );
  }
  deleteCard(payment: Card) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.paymentService.deleteCard(payment.id).subscribe(
        () => {
          this.toastr.success('Card deleted successfully');
        },
        (error) => {
          this.toastr.error('Error deleting card:'); // Use toastr for error
        }
      );
    }
  }
  onEditClick(payment: Card) {
    this.payment = { ...payment };
    this.payment.validThrough = this.formatValidThrough(payment.validThrough);
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

  setAddPaymentBlank(): Card {
    return {
      cardNumber: '',
      cardOwnerName: '',
      id: 0,
      securityCode: '',
      userId: JSON.parse(this.authService.getUserDetails()).userID,
      validThrough: '',
    };
  }
  clearForm() {
    this.form.resetForm();
    this.isSelected = true;
  }
}
