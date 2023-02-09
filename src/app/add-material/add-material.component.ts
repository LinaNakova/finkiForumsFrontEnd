import {Component, OnInit} from '@angular/core';
import {ActiveUserInterface} from "../ActiveUserInterface";
import {LoginService} from "../login.service";
import {MaterialsService} from "../materials.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from 'file-saver';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {
  activeUser: ActiveUserInterface | undefined;
  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};
  courseId: number;

  constructor(private loginService: LoginService,
              private materialService: MaterialsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeUser = this.loginService.activeUser;
    if (!this.activeUser) {
      this.router.navigate(['/'])
    }
    this.courseId = this.loginService.currentCourse;
  }

  // define a function to upload files
  onUploadFiles(e): void {
    let files = e.target.files;
    console.log("files", files)
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.materialService.upload(formData, this.activeUser.username, this.loginService.currentCourse).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files
  onDownloadFile(filename: string): void {
    this.materialService.download(filename).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
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
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new Blob([httpEvent.body!],
              {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
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
