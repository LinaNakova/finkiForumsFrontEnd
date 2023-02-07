import {Component, OnInit} from '@angular/core';
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {MaterialsService} from "../materials.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from "file-saver";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit{

  activeUser: ActiveUserInterface | undefined;
  courseId : number | undefined;
  files: string[] | any = []
  fileStatus = {status: '', requestType: '', percent: 0};

  constructor(private loginService: LoginService,
              private materialService: MaterialsService,
              private _router: ActivatedRoute) {
  }
  ngOnInit() {
    this.activeUser = this.loginService.activeUser;
    this.courseId = +this._router.snapshot.paramMap.get("id");
    this.materialService.findAllMaterialsForCourse(this.courseId)
      .subscribe(response => {
        console.log("files", this.files)
        this.files = response
      })
  }

  onDownloadFile(filename: string): void {
    this.materialService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.files.unshift(filename);
          }
        } else {
          saveAs(new Blob([httpEvent.body!],
              { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
            httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

}
