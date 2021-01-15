import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { IonicStorageModule } from '@ionic/storage';
//import { AuthService } from './auth.service';
//import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx/';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: ErrorHandler },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //AuthService,
    //PostService,
    Camera
  ],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule {}
