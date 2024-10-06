import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviseVocabService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'assets'
  getChapterData(chpaterNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/chapter-${chpaterNumber}.json`);
  }

}
