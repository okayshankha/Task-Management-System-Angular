import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serviceApiConfig } from './service-api-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders();
  
  constructor(private http: HttpClient) {
  }

  request(service_name, parameters = null) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    let outData = {
      function_response: 'success',
      server_response: null,
    };
    let request = serviceApiConfig[service_name];
    // console.log(request['token']);


    if (request == null) {
      outData['function_response'] = 'api_config_not_found';
      // console.log(outData);
      return outData;
    }

    if (request['token']) {
      // Add token if needed.
      // console.log('adding token');

      let token = localStorage.getItem('token');
      if (token === null) {
        outData['function_response'] = 'token_not_found';
        // console.log(outData);
        return outData;
      } else {
        // console.log(token);
        this.headers = this.headers.set('Authorization', 'Bearer ' + token);

        // console.log('token added');
      }
    }

    // console.log(this.headers);


    if (request['method'] === 'GET') {
      outData['server_response'] = this.get(request['url'], parameters);
    } else if (request['method'] === 'POST') {
      outData['server_response'] = this.post(request['url'], parameters);
    } else {
      outData['function_response'] = 'undefined_request_type';
    }
    return outData;
  }




  post(path, parameters) {
    return this.http.post(environment.baseUrl + path, parameters, { headers: this.headers });
  }

  get(path, parameters) {
    parameters = this.parseParameters(parameters);
    return this.http.get(environment.baseUrl + path + parameters, { headers: this.headers });
  }

  parseParameters(parameters) {
    let params = '/';
    Object.keys(parameters).forEach(function (key) {
      params += key + '=' + parameters[key] + '&';
    });
    params = params.slice(0, -1);
    return params;
  }
}
