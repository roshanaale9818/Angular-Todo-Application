import { Pipe, PipeTransform } from '@angular/core';
import { GoogletranslateService } from 'src/app/shared/services/googletranslate.service';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  constructor(private googleService:GoogletranslateService){}
  transform(value: unknown): unknown {
    let result = this.googleService.languages.filter(x=>x.code==value);
    return result !==null?result[0].name:'';
  }

}
