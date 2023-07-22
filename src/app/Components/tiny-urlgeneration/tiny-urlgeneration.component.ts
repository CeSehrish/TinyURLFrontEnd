import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import QRCode from 'qrcode-svg';
import { TinyUrlService } from 'src/app/Services/tiny-url.service';
import { retry } from 'rxjs';
import { TinyURLapiResponse } from 'src/app/Models/tiny-urlapi-response';
import { UrlLink } from 'src/app/Models/url-link';



@Component({
  selector: 'app-tiny-urlgeneration',
  templateUrl: './tiny-urlgeneration.component.html',
  styleUrls: ['./tiny-urlgeneration.component.css']
})
export class TinyURLGenerationComponent implements OnInit {
  @ViewChild('qrcodeContainer', { static: true }) qrcodeContainer!: ElementRef;
  @ViewChild('urlInput') urlInput!: ElementRef;

  disableUrl = false;
  disableTinyUrl = true;
  invalidUrl = false;
  aliasNA= false;
  showAlias = true;
  shortenbtn= true;
  userDatatPopUp= false;
 
  longUrl: string = '';
  alias: string ='';
  tinyUrl: string="";
  qrCodeValue: string = '';
  myLinks: UrlLink[] = [];
  qrcodeElement!: ElementRef;



  constructor(private service: TinyUrlService ,private elementRef: ElementRef) {
    
  }
  closePopup(){
    this.userDatatPopUp = false;
  }
  showMyUrls(){
    this.myLinks = [];
    this.userDatatPopUp = true;
    this.getUserData();
  }
  refreshPage(): void {
    this.hideControls();
    this.showURLgenerationControls();
    this.disableUrl= false;
    this.longUrl="";
    this.tinyUrl = "";
    this.alias="";
  }
  hideControls(){
    const qrControls = document.getElementById("qr-controls");
    if (qrControls) {
      qrControls.style.display = "none";
    }
  }
  copyToClipboard() {
    const tinyUrl = document.getElementById("tinyUrlInput") as HTMLInputElement;
    navigator.clipboard.writeText(tinyUrl.value)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  }
  openUrlInNewTab() {
    console.log(this.tinyUrl);
    const newTab = window.open("https://"+this.tinyUrl, '_blank');
    
  }
  showQRControls(){
    const qrControls = document.getElementById("qr-controls");
    if (qrControls) {
      qrControls.style.display = "block";
    }
  }
  getTinyUrl(): void {
    if (!this.urlInput.nativeElement.validity.valid) {
      this.invalidUrl = true;
    }
    else{
      this.invalidUrl = false;
      this.disableTinyUrl=true;
      this.disableUrl = true;
      this.service.getTinyUrl(this.longUrl, this.alias)
        .subscribe(
          (response: TinyURLapiResponse) => {
            //console.log(response.shortUrl);
            if(response.statusCode==="forbidden"){
              this.aliasNA= true; 
              response.statusCode="";
              return;
            }
            this.tinyUrl= response.shortUrl; 
            this.showQRControls();
            this.hideURLgenerationControls();
            this.showMyUrls();
            this.closePopup();
          },
          (error: any) => {
            console.log("Error: ", error);
          }
        );
    }
  }
  showURLgenerationControls(): void{
    this.alias="";
    this.showAlias= true;
    this.shortenbtn= true;
    this.aliasNA = false;
  }
  hideURLgenerationControls(): void{
    this.alias="";
    this.showAlias= false;
    this.shortenbtn= false;
    this.aliasNA = false;
  }
  ngOnInit(): void {
    this.qrcodeElement = this.qrcodeContainer.nativeElement.querySelector('qrcode');
    this.hideControls();
  }
  generateQRCode(): void {
    if (this.qrcodeContainer) {
      const urlInputElement = document.getElementById('urlInput') as HTMLInputElement;
      this.qrCodeValue = urlInputElement.value;
    }
  }
  getUserData(){
    const userId: number =1;
    this.service.getUserData(userId)
    .subscribe({
      next: (event) => {
        for (let i = 0; i < event.length; i++) {
          //const tinyUrl = event[i];
          const link: UrlLink = new UrlLink();
          link.id= event[i].id;
          link.longUrl = event[i].longUrl;
          link.tinyUrl = event[i].tinyUrl;
          link.alias = event[i].alias;
          this.myLinks.push(link); 
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
  downloadQRCode(format: string) {
      const qrcodeCanvas = this.qrcodeContainer.nativeElement.querySelector('canvas');
    
      if (!qrcodeCanvas) {
        console.error('QR code canvas not found.');
        return;
      }
    
      const link = document.createElement('a');
    
      if (format === 'png1200' ||format === 'png'  ) {
        format ="png";
        qrcodeCanvas.toBlob((blob: Blob) => {
          const url = URL.createObjectURL(blob);
    
          link.href = url;
          link.download = `qrcode.${format}`;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png', 1.0);
      } else {
        link.href = qrcodeCanvas.toDataURL(`image/${format}`);
        link.download = `qrcode.${format}`;
        link.click();
      }    

    
    /*
    var qrcodeSVG = new QRCode({
      content: "http://github.com/",
      container: "svg-viewbox"
    });
    
    const svgElement = qrcodeSVG.svg();
   
    

    const qrcode = this.qrcodeContainer.nativeElement.querySelector('canvas');
  
    if (!qrcode) {
      console.error('QR code canvas not found.');
      return;
    }
    
    const link = document.createElement('a');
    let format = this.selectedFormat;
  
    if (format === 'png-1200') {
      format = 'png'; // Convert to PNG format for PNG-1200
      
      qrcode.toBlob((blob: Blob) => {
        const url = URL.createObjectURL(blob);
        
        console.log(url);
        link.href = url;
        link.download = `qrcode.${format}`;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    } 
    else {
      link.href = qrcode.toDataURL(`image/${format}`);
      link.download = `qrcode.${format}`;
      link.click();
    }  */
  }
  
}
