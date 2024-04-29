import { Component } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';
import { AuthService } from '../shared/services/auth.service';
import { EmployeeDetail } from '../type/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userId!: number;
  employeeDetail: EmployeeDetail = {
    empId: 0,
    name: '',
    companyName: '',
    phone: '',
    joinDate: new Date(),
  };
  policies!: any[];
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userId = JSON.parse(this.authService.getUserDetails()).userID;
    this.loadUserDashboard();
  }
  loadUserDashboard(): void {
    this.dashboardService.getUserDashboard(this.userId).subscribe(
      (data) => {
        this.employeeDetail = data.employeeDetail;
        this.policies = data.policies;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
