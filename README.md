# Welcome to @raniel/airtable 👋
[![Version](https://img.shields.io/npm/v/@raniel/airtable.svg)](https://www.npmjs.com/package/@raniel/airtable)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/raniel86/airtable#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/raniel86/airtable/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/raniel86/airtable)](https://github.com/raniel86/airtable/blob/master/LICENSE)
![Publish on npm](https://github.com/raniel86/airtable/workflows/Publish%20on%20npm/badge.svg)

> Simple Airtable service for Angular applications.

## Install in your Angular app
```sh
npm i @raniel/airtable
```

## Setup
Add the HttpClientModule to imports array in your app.module.ts, using the following import:
```ts
import {HttpClientModule} from '@angular/common/http';
```
Injects the AirtableService in a constructor like this:
```ts
constructor(private airtable: AirtableService) {}
```
Set your api key and database id to airtable service variables:
```ts
this.airtable.apiKey = 'YOUR_AIRTABLE_API_KEY';
this.airtable.dbId = 'YOUR_AIRTABLE_DATABASE_ID';
```

## Usage
```ts
// get all rows from your table
this.airtable.getList('your_table_name').subscribe(response => {  
    console.log(response);  
});

// get a table row from a field value
this.airtable.getListByFieldValue('your_table_name', 'field_name', 'field_value').subscribe(response => {  
    console.log(response);  
});

// get a table row from its id
this.airtable.getRecord('your_table_name', 'ROW_ID').subscribe(response => {  
    console.log(response);  
});

// delete rows given their id
this.airtable.doDelete('your_table_name', ['ROW_ID_1', 'ROW_ID_2', 'ROW_ID_3', ..., 'ROW_ID_N']).subscribe(response => {  
    console.log(response);  
});

// insert a row in your table
this.airtable.doInsert('your_table_name', {  
    field1: 'field1 value',  
    field2: 'field2 value',
    ...
    fieldN: 'fieldN value'
}).subscribe(response => {  
    console.log(response);  
});

// alter the values of a row given its id
this.airtable.doUpdate('your_table_name', 'ROW_ID', {  
    fieldName: 'new field value',  
}).subscribe(response => {  
    console.log(response);  
});

// clear the table (be careful!)
this.airtable.doTruncate('your_table_name');
```

## Author

👤 **Daniele Sabre (https://github.com/raniel86)**

* Github: [@raniel86](https://github.com/raniel86)
* Twitter: [@raniel86](https://twitter.com/raniel86)
* LinkedIn: [@danielesabre](https://linkedin.com/in/danielesabre)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/raniel86/airtable/issues).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2020 [Daniele Sabre (https://github.com/raniel86)](https://github.com/raniel86).

This project is [MIT](https://github.com/raniel86/airtable/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
