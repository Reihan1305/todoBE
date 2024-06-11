import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
export class CreateListDto {
    @IsString()    
    @IsNotEmpty()
    content:string

    @IsString()
    @IsNotEmpty()
    userId :number

    @IsBoolean()
    isDone:Boolean

    @IsString()
    @IsNotEmpty()
    categoryId :number

}
