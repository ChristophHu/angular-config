import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable, tap } from 'rxjs'

import { environment } from 'src/environments/environment' //path to your environment files

@Injectable()
export class ConfigService {
  private _config: any
  private _file: string = 'development'

  constructor(private _httpClient: HttpClient) { }

  load() {
    return new Promise((resolve, reject) => {
      if (environment.production) this._file = 'production'
      console.log(this._file)
      this._httpClient.get('./assets/config/' + this._file + '.json')
        .pipe(
          // tap(res => res.json())
        )
        .subscribe({
          next: (data: any) => {
            this._config = data
            resolve(true)
          },
          error: (error: any) => {
            console.error(error)
            resolve(false)
          }
        })
    })
  }

  isDevmode() {
    return this._file === 'development'
  }

  // Gets API route based on the provided key
  getApi(key: string): string {
    return this._config["API_ENDPOINTS"][key]
  }
  // Gets a value of specified property in the configuration file
  get(key: any) {
    return this._config[key]
  }
}