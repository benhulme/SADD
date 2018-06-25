import { Component, OnInit, AfterViewInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadService } from './downloadables.service';
import { AppGlobals } from './globals';
import { MasonryModule, MasonryOptions } from 'angular2-masonry';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { Gtag, GtagModule } from 'angular-gtag';
import * as Player from "../assets/libraries/player.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private printAssets: { id: string, type: string, size: string, tilePath: string, tileName: string, assetPath: string, assetName: string }[] = [];
  private socialAssets: { id: string, type: string, size: string, tilePath: string, tileName: string, assetPath: string, assetName: string }[] = [];
  public masonryOptions: MasonryOptions = { transitionDuration: '0.3s', columnWidth: 300, gutter: 10 };
  public navState = false;
  private innerHeight: number;
  private innerHeightSmall: number;
  private innerHeightMultiplier: number;
  public sizingClass: string;
  public targetSelf: string;
  public targetBlank: string;
  public gtag: any;
  public vimeoID: any;
  public vimeoOptions: any;
  
  constructor(private dlService: DownloadService, public _appGlobals: AppGlobals, gtag: Gtag, rd: Renderer2) {
    this.innerHeightMultiplier = 0.85;
    this.sizingClass = "";  
    this.targetBlank = "_blank";
    this.targetSelf = "_self";
    this.innerHeight = window.innerHeight;
    this.innerHeightSmall = window.innerHeight * this.innerHeightMultiplier;
    this.gtag = gtag;
    this.vimeoID = "vimeoVideo";
    this.vimeoOptions = {
      id: 270211533,
      loop: false
    }
  }

  ngOnInit() {
    this.printAssets = this.dlService.getPrintDownloads();
    this.socialAssets = this.dlService.getSocialDownloads();
    this.updateSizingClass(window.innerWidth);
    this.gtag.pageview();
  }

  ngAfterViewInit() {
    // Vimeo player needs to be initialised AFTER view has been rendered. NEEDS Renderer2
    var player = new Player(this.vimeoID,this.vimeoOptions);  
    var category = 'Video';
    var action = "click"
    player.on('play', ()=> {
      this.trackGAEvent("Video", "click", "Video Played");
    });
    player.on('pause', ()=> {
      this.trackGAEvent("Video", "click", "Video Paused");
    });
  }
  
  /**
   * Reveals/hides the nav menu on click
   */
  toggleNavMenu() {
    this.navState = !this.navState;
  }
  
  /**
   * Return a single indexed asset from an array
   * @param array of downloadable assets
   * @param id of the asset in the array
   */
  getAssetItem(array,id) {
    for(let item of array) {
      if(item.id == id) {
        return item.assetPath + item.assetName;
      }
    }
  }

  /**
   * Return a single indexed asset tile from an array
   * @param array of asset tiles
   * @param id of the tile in the array
   */
  getTileItem(array,id) {
    for(let item of array) {
      if(item.id == id) {
        return item.tilePath + item.tileName;
      }
    }
  }
  
  /**
   * Resize events
   */
  onResize() {
    this.innerHeight = window.innerHeight;
    this.innerHeightSmall = window.innerHeight * this.innerHeightMultiplier;
    this.updateSizingClass(window.innerWidth);    
  }

  /**
   * Update class sizes for responsive image sources
   * @param w Screen width
   */
  updateSizingClass(w) {
    if(w >= 940)
      this.sizingClass = "3x";
    if(w >= 630 && w < 939)
      this.sizingClass = "2x";
    if(w < 629)
      this.sizingClass = "1x";
  }
  
  /**
   * Opens link in new tab and tracks link
   * @param url external url
   */
  onNavigate(longURL,shortURL,thisCategory,thisAction,thisLabel) { 
    var label = thisLabel + ": " + shortURL; // build url for label 
    this.trackGAEvent(thisCategory,thisAction,label); // track external click
    window.open(longURL,this.targetBlank);
  }
  
  /**
   * Fires Google Tag Event to GA account
   * @param thisCategory Event category
   * @param thisAction Event Action
   * @param thisLabel Event Label
   */
  trackGAEvent(thisCategory,thisAction,thisLabel) {
    this.gtag.event(thisAction, { 
      event_category: thisCategory,
      event_label: thisLabel
    });
  }
}
