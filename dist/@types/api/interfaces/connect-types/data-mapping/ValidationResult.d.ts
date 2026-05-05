import { ValidationResultError } from "./ValidationResultError";
export interface ValidationResult {
    success: boolean;
    recordCount: number;
    errors: ValidationResultError[];
}
