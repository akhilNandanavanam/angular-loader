# PreLoader

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## HOW TO USE
This Application can be used as a base application and additional functionality can be built on top

Use BaseApiService implementation for making API calls to external resources. 

## For integration into other applications 
Copy the contents of loader, services and base implementation of AppComponent into desired project. 

1. Loader Component provides the skeleton of loader. 
2. Loader Service maintains track of all API calls and disables the loader only after the execution of all the API calls is completed. 
3. Base API Service gives the implementation of All types of API calls and calls the loader service to show and disable the loader
4. base-url-provider provides the config values in a Map. To use the config values, make a dependency injection and use it like this. 
```js
  constructor(
      @Inject('BASE_URL_VALUE_PROVIDER') private config: BaseConfigValues,
  ) {
    this._url = this.config.value.get('BASE_URL')!;
    console.log({
      "BASE_URL": this._url
    }); 
   }
}
```

Provider needs to be defined in app.module.ts in following way 
```js 
providers: [BaseApiService,
    { provide: 'BASE_URL_VALUE_PROVIDER', useClass: BaseConfigValues}
  ],
```

## To run this Demo Project

1. Clone the project
2. Run 
```shell
yarn install

ng serve
``` 