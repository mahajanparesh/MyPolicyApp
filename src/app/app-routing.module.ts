import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PaymentsComponent } from './payments/payments.component';
import { HomeGaurd } from './home/home.guard';
import { PaymentsGaurd } from './payments/payments.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: HomeComponent, canActivate: [HomeGaurd] },
  {
    path: 'payments',
    component: PaymentsComponent,
    canActivate: [PaymentsGaurd],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
