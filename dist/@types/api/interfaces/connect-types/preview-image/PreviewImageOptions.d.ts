import { NamedProperties, Scalar } from "@objectif-lune/core";
import { PreviewImageType } from "./PreviewImageType";
export type PreviewImageOptions = Partial<{
    type: PreviewImageType;
    quality: number;
    bleed: boolean;
    pages: string;
    archive: boolean;
    dpi: number;
    context: string;
    sectionName: string;
    viewPortWidth: number;
    runtimeParameters: NamedProperties<Scalar>;
}>;
