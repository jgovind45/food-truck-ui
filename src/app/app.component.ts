import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { NgxSpinnerService } from "ngx-spinner";
import { AgmMap } from '@agm/core';
import {RestService} from "./service/rest.service";
import {apiSearchURL,googleMapApiKey,apiFetchAllURL} from "./common";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RestService]
})
export class AppComponent implements OnInit {
  title = 'Food Truck';
  filterData:any;

  @ViewChild(AgmMap)
  public agmMap: AgmMap
  
  private searchTerms = new Subject<string>();
  
  fetchAllData:any;

  constructor(private restService: RestService,private spinner: NgxSpinnerService){
	  this.searchTerms.debounceTime(1500)
	    .distinctUntilChanged()
	    .subscribe(filterterm => {
	    	this.spinner.show();
	    	this.restService.getAPICall(apiSearchURL+filterterm, data => {
	              if (data) {
	                  if (data.length > 0) {
	                	  this.spinner.hide();
	                      this.filterData = data;
	                  }
	                  else{
	                      alert("no data fund");
	                      this.filterData = [];
	                	  this.spinner.hide();
	                  }
	              }
	              else{
	            	  alert("no data fund");
	            	  this.filterData = [];
	            	  this.spinner.hide();
				  }
	          });  
	    });
	  
	  this.spinner.show();
  	this.restService.getAPICall(apiFetchAllURL, data => {
            if (data) {
                if (data.length > 0) {
              	  this.spinner.hide();
                    this.fetchAllData = data;
                }
                else{
                    alert("no data fund");
                    this.filterData = [];
              	  this.spinner.hide();
                }
            }
            else{
          	  alert("no data fund");
          	  this.filterData = [];
          	  this.spinner.hide();
			  }
        });  
  	
  }
  onMouseOver(infoWindow, gm) {

      if (gm.lastOpen != null) {
          gm.lastOpen.close();
      }

      gm.lastOpen = infoWindow;

      infoWindow.open();
  }	  
  // Push a search term into the observable stream.
  search(term: string): void {
	  this.searchTerms.next(term);
  }
  getFilterData(filter){
	  alert(filter);
  }
  
  ngAfterViewInit() {
	  this.agmMap.triggerResize();
  }
  ngOnInit(): void {
  }
  
}

