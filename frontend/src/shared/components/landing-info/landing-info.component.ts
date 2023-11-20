import { Component } from '@angular/core';
import { RouterService } from 'src/shared/services/router.service';

@Component({
  selector: 'app-landing-info',
  templateUrl: './landing-info.component.html',
  styleUrls: ['./landing-info.component.scss'],
})
export class LandingInfoComponent {
  constructor(public router: RouterService) {}
}
