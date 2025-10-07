import { IsNotEmpty, IsInt, Min, Max,  } from 'class-validator';
export class CreateCatDto {
    @IsNotEmpty()
    name: string;
    @IsInt()
    @Min(0)
    @Max(30)
    age: number;
}

