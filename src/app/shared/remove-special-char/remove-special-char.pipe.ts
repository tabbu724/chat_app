import { PipeTransform,Pipe } from "@angular/core";
@Pipe({
    name:'removeSpecialChar'
})

export class removeSpecialChar implements PipeTransform{
    transform(value:string,specialCharacter:string):string{
        return value.replace(specialCharacter,'');
    }
}