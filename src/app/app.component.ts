import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private loggingService: LoggingService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent NgOnInit');
  }
}
