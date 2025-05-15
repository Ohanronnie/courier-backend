import { IsIn, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

class PercelItemDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(["document", "percel"])
  type: "document" | "percel";

  @IsNotEmpty()
  
  currency: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  value: number;
}
export class PercelDto {  
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  packagingId: string;

}