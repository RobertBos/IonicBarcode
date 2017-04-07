import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import JsBarcode  from 'jsbarcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
public barcodeText : string;
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {
    this.barcodeText = "";
  }
  
  public ngOnInit() {
    this.DisplayBarcodes("QWERTY");
  }

  public DisplayBarcodes(barcode:string){
    this.barcodeText = barcode;
    JsBarcode("#code128", this.barcodeText);
    JsBarcode("#code39", this.barcodeText, {format: "code39"});
  }

  public onBarcodeChange(data) : void 
  {
    if(data=="") 
    {
      return;
    }
    this.DisplayBarcodes(data);
  }

  public scanBarcode($event) : void
  {
    var options = { resultDisplayDuration: 0 };
    this.barcodeScanner.scan(options).then(function(imageData) {
      alert("scanned barcode :" + imageData.text);
    }, function(error) 
    {
      console.log("error " + error);
    });
  }
}
