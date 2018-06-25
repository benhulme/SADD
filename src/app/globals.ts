import { Injectable } from "@angular/core";

@Injectable()
export class AppGlobals {

  printArray(a) {
    var count = 1;
    for(let item of a) {
      console.log('  Items in array:');      
      console.log('  -- ' + count + ': ' + item);
      count++;
    }
  }
  
}