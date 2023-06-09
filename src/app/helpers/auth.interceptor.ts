import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioServiceService } from '../services/usuario-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private usuarioService: UsuarioServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.usuarioService.getToken();
  if (token) {
    const cloned=request.clone({
    headers: request.headers.set('Authorization',`Bearer ${token}`)
  });
  return next.handle(cloned);
  }

    return next.handle(request);
  }
}
