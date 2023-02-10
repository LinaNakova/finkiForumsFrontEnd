import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";
import {Query1Interface} from "../Query1Interface";
import {AdminPanelService} from "../admin-panel.service";
import {Query2Interface} from "../Query2Interface";
import {Query3Interface} from "../Query3Interface";
import {Query4Interface} from "../Query4Interface";
import {Query5Interface} from "../Query5Interface";
import {ActiveUserInterface} from "../ActiveUserInterface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  query1: Query1Interface[] | undefined;
  query2: Query2Interface[] | undefined;
  query3: Query3Interface[] | undefined;
  query4: Query4Interface[] | undefined;
  query5: Query5Interface[] | undefined;
  activeUser: ActiveUserInterface | undefined;

  constructor(private http: HttpClient, private service: AdminPanelService, private router: Router) { }

  ngOnInit():void {
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
    forkJoin([
      this.service.getFirstQuery(),
      this.service.getSecondQuery(),
      this.service.getThirdQuery(),
      this.service.getFourthQuery(),
      this.service.getFifthQuery(),
    ]).subscribe(results => {
      this.query1 = results[0];
      this.query2 = results[1];
      this.query3 = results[2];
      this.query4 = results[3];
      this.query5 = results[4];
    });
  }
  formatInterval(interval: string) {
    const match = interval.match(/(\d+) years (\d+) mons (\d+) days (\d+) hours (\d+) mins (\d+\.\d+) secs/);
    if (!match) {
      return interval;
    }
    const [, years, months, days, hours, minutes, seconds] = match;
    const units = [
      { value: years, unit: 'years' },
      { value: months, unit: 'months' },
      { value: days, unit: 'days' },
      { value: hours, unit: 'hours' },
      { value: minutes, unit: 'minutes' },
      { value: seconds, unit: 'seconds' },
    ];
    const result: string[] = [];
    units.forEach(({ value, unit }) => {
      if (value !== '0') {
        result.push(`${value} ${unit}`);
      }
    });
    return result.join(', ');
  }
}
