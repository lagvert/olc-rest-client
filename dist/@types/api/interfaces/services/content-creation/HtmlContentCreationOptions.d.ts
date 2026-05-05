import { NamedProperties, Scalar } from "@objectif-lune/core";
import { InlineOption } from "./InlineOption";
export interface HtmlContentCreationOptions {
    section?: string;
    cssSelector?: string;
    inline?: InlineOption;
    runtimeParameters?: NamedProperties<Scalar>;
}
