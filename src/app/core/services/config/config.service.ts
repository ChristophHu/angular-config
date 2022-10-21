import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

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
  getApi(key: string): string {
    return this._config["API_ENDPOINTS"][key]
  }
  get(key: any) {
    return this._config[key]
  }
}