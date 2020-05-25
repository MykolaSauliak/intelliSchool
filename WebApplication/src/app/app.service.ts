import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {IQuestion,INotesContent, IUser, IRoom} from './shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  private server = 'http://127.0.0.1:5000/';
  private quizUrl = this.server + 'quiz';
  private notesUrl = this.server + 'notes';
  private roomUrl = this.server + 'room';

  getQuiz():Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(this.quizUrl);
  }

  getNotes():Observable<INotesContent> {
    return this.http.get<INotesContent>(this.notesUrl);
  }

  createRoom(user: IUser, room: IRoom, fileToUpload: File): Observable<IRoom> {

    const formData: FormData = new FormData();
    formData.append('userId',user.id);
    formData.append('title',room.title);
    formData.append('file', fileToUpload);
    return this.http.post(this.roomUrl, formData).pipe(
      tap((newRoom: IRoom) => this.log(`added room w/ id=${newRoom.id}`)),
      catchError(this.handleError<IRoom>('error creating room'))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
}
