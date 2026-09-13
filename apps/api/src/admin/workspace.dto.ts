import { IsString, Length, IsInt, Min, Max, IsIn, IsOptional, IsUUID } from 'class-validator';
export class CategorySettingsDto {
 @IsString() @Length(2,60) name!:string;
 @IsString() @Length(20,2000) description!:string;
 @IsString() @Length(0,180) shortDescription!:string;
 @IsOptional() @IsUUID() parentId?:string|null;
 @IsInt() @Min(0) @Max(100000) sortOrder!:number;
 @IsIn(['ACTIVE','ARCHIVED']) status!:'ACTIVE'|'ARCHIVED';
}
export class RestoreDto { @IsString() @Length(5,500) reason!:string; }
