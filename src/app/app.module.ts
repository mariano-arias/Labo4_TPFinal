import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GestionUsuariosModule } from './gestion-usuarios.module';
import { TurnosGestionModule } from './turnos-gestion/turnos-gestion.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegistroPerfilComponent } from './components/registro-perfil/registro-perfil.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { EspecialidadesComponent } from './pages/especialidades/especialidades.component';
import { MayusculasPipe } from './pipes/mayuscula.pipe';
import { FooterComponent } from './shared/footer/footer.component';
import { NamePipe } from './pipes/name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    RegistroPerfilComponent,
    CarouselComponent,
    EspecialidadesComponent,
    MayusculasPipe,
    NamePipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    GestionUsuariosModule,
    TurnosGestionModule,
    NgxCaptchaModule,
  ],
  exports:[
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
