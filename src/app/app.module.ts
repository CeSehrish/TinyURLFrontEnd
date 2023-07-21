import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TinyURLGenerationComponent } from './Components/tiny-urlgeneration/tiny-urlgeneration.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QrCodePopupComponent } from './qr-code-popup/qr-code-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    TinyURLGenerationComponent,
    QrCodePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
