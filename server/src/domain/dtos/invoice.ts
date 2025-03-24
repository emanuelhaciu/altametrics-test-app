import { IsBoolean, IsNumber, IsString } from "class-validator";

export class GetInvoicesResponseDto {
    @IsString()
    id: string;

    @IsString()
    vendor_name: string;

    @IsString()
    due_date

    @IsString()
    description
    
    @IsNumber()
    amount

    @IsBoolean()
    paid
}

export class GetInvoiceByidResponseDto {
    @IsString()
    id: string;

    @IsString()
    vendor_name: string;

    @IsString()
    due_date: string;

    @IsString()
    description: string;

    @IsNumber()
    amount: number;

    @IsBoolean()
    paid: boolean;
    
    @IsString()
    created_by: string;

    @IsString()
    created_at: string;
    
    @IsString()
    updated_at: string;
}