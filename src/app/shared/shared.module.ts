import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MonthYearPipe } from './pipes/month-year.pipe';
import { DateFormatPipePipe } from './date-format-pipe.pipe';
import { DateFormatPipe } from './pipes/date-format-pipe.pipe';

@NgModule({
  declarations: [MonthYearPipe, DateFormatPipe],
  imports: [CommonModule],
  providers: [AuthService],
  exports: [MonthYearPipe, DateFormatPipe],
})
export class SharedModule {}
