// import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { LiteEvent } from 'src/app/models/lite-event';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private readonly onOrientationChange = new LiteEvent<void>();
  public get OrientationChange() { return this.onOrientationChange.expose(); } 

  private _isHandsetPortrait: boolean = false;
  private _isHandsetLandscape: boolean = false;

  private _isTabletPortrait: boolean = false;
  private _isTabletLandscape: boolean = false;

  private _isWebPortrait: boolean = false;
  private _isWebLandscape: boolean = false;

  private _width!: number;
  private _height!: number;

  constructor() { }

  // Size
  public get Width(): number {
    this._width = window.innerWidth;
    return this._width;
  }

  public get Height(): number {
    this._height = window.innerHeight;
    return this._height;
  }

  // Orientation
  public get IsPortrait(): boolean {
    return this._isHandsetPortrait ||
            this._isWebPortrait ||
            this._isTabletPortrait;
  }

  public get IsLandscape(): boolean {
    return this._isHandsetLandscape ||
            this._isWebLandscape ||
            this._isTabletLandscape;
  }

  // Handset
  public get IsHandsetPortrait(): boolean {
    return this._isHandsetPortrait;
  }

  public set IsHandsetPortrait(isHandsetPortrait: boolean) {
    this._isHandsetPortrait = isHandsetPortrait;
    this.onOrientationChange.trigger();
    this.showScreenDetails();
  }

  public get IsHandsetLandscape(): boolean {
    return this._isHandsetLandscape;
  }

  public set IsHandsetLandscape(isHandsetLandscape: boolean) {
    this._isHandsetLandscape = isHandsetLandscape;
    this.onOrientationChange.trigger();
    this.showScreenDetails();
  }
 
  public get IsHandset(): boolean {
    return this._isHandsetLandscape || this._isHandsetPortrait;
  }

  // Tablet
  public get IsTabletPortrait(): boolean {
    return this._isTabletPortrait;
  }

  public set IsTabletPortrait(isTabletPortrait: boolean) {
    this._isTabletPortrait = isTabletPortrait;
    this.onOrientationChange.trigger();
    this.showScreenDetails();
  }

  public get IsTabletLandscape(): boolean {
    return this._isTabletLandscape;
  }

  public set IsTabletLandscape(isTabletLandscape: boolean) {
    this._isTabletLandscape = isTabletLandscape;
    this.onOrientationChange.trigger();
    this.showScreenDetails();
  }
 
  public get IsTablet(): boolean {
    return this._isTabletLandscape || this._isTabletPortrait;
  }

  // Web
  public get IsWebPortrait(): boolean {
    return this._isWebPortrait;
  }

  public set IsWebPortrait(isWebPortrait: boolean) {
    this._isWebPortrait = isWebPortrait;
    this.onOrientationChange.trigger();
    this.showScreenDetails();
  }

  public get IsWebLandscape(): boolean {
    return this._isWebLandscape;
  }

  public set IsWebLandscape(isWebLandscape: boolean) {
    this._isWebLandscape = isWebLandscape;
    this.onOrientationChange.trigger();
    this.showScreenDetails();
  }
 
  public get IsWeb(): boolean {
    return this._isWebLandscape || this._isWebPortrait;
  }

  private showScreenDetails(): void {
    console.log(`_isHandsetPortrait: ${this._isHandsetPortrait}`);
    console.log(`_isHandsetLandscape: ${this._isHandsetLandscape}`);
    console.log(`_isTabletPortrait: ${this._isTabletPortrait}`);
    console.log(`_isTabletLandscape: ${this._isTabletLandscape}`);
    console.log(`_isWebPortrait: ${this._isWebPortrait}`);
    console.log(`_isWebLandscape: ${this._isWebLandscape}`);

    console.log(`Width: ${this.Width}`);
    console.log(`Height: ${this.Height}`);
  }

  /*
  private _isHandsetPortrait: boolean = false;
  private _isHandsetLandscape: boolean = false;

  private _isTabletPortrait: boolean = false;
  private _isTabletLandscape: boolean = false;

  private _isWebPortrait: boolean = false;
  private _isWebLandscape: boolean = false;

  */
}
