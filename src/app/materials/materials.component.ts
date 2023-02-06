import {Component, OnInit} from '@angular/core';
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {MaterialsService} from "../materials.service";

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit{

  activeUser: ActiveUserInterface | undefined;

  constructor(private loginService: LoginService,
              private materialService: MaterialsService) {
  }
  ngOnInit() {
    this.activeUser = this.loginService.activeUser;
  }

}
