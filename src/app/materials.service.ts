import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private path = 'http://localhost:8080/api/materials'

  constructor(private http: HttpClient) {
  }

  upload(formData: FormData, username: string, courseId: number): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.path}/upload/${courseId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.path}/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  findAllMaterialsForCourse(id : number){
    return this.http.get(`${this.path}/all/${id}`)
  }
}
