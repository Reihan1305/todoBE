import { IsNotEmpty, IsString ,IsNumber} from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    content:string
    
    userId :number

    @IsNumber()
    onDone : number
}
