import { Component } from '@angular/core';
import { PaymentsService } from '../shared/services/payments.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  payments: any;

  constructor(
    private paymentService: PaymentsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.paymentService
      .getPaymentsByUserId(JSON.parse(this.authService.getUserDetails()).userID)
      .subscribe((data) => {
        this.payments = data;
        console.log(data);
      });
  }
}
