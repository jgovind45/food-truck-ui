import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {retry} from "rxjs/operators";

@Injectable()
export class RestService {

    customHttpDefaultOptions= {
        headers: new HttpHeaders({
             'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {
    }

    getAPICall(apiUrl,data) {
        this.httpClient.get(apiUrl).pipe(retry(1))
            .subscribe(response => {
            data(response);
        }, error => data(this.handleError(error)));
    }
    private handleError(error: any) {
        let description = 'There was an error: ' + error.status;
        return {
            status: error.status,
            //message: error.message,
            errordescription: description
        };
    }

}
