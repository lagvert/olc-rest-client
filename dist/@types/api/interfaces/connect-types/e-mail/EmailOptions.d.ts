import { NamedProperties, Scalar } from "@objectif-lune/core";
export interface EmailOptions extends Partial<Record<"attachPdfPage" | "attachWebPage" | "eml", boolean>> {
    sectionName?: string;
    runtimeParameters?: NamedProperties<Scalar>;
}
