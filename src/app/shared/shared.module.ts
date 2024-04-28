import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MonthYearPipe } from './pipes/month-year.pipe';

@NgModule({
  declarations: [MonthYearPipe],
  imports: [CommonModule],
  providers: [AuthService],
  exports: [MonthYearPipe],
})
export class SharedModule {}
