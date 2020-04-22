import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SharedServices {

      private baseURL = "https://covid19.mathdro.id"; // environment.baseURL;

    constructor(private http: HttpClient) {}

    getInternalHttpRequest(url: any): Observable<any> {
        return this.http.get<any>(this.baseURL);
    }

    getHttpRequest(url: any): Observable<any> {
        return this.http.get<any>(this.baseURL + '/' + url)
               .pipe(
                   catchError(this.handleError)
               );
    }

    postHttpRequest(url: string, body: any): Observable<any> {
       // let headers = new HttpHeaders();
        const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
        // tslint:disable-next-line:object-literal-shorthand
        return this.http.post<any>(this.baseURL + '/' + url, body, {headers: headers})
                .pipe(
                    catchError(this.handleError)
                );
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

}

