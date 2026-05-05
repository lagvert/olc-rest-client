import { ArtefactId } from "../artefacts";
/**
 * Properties shared between the API responses.
 *
 * @since 0.9.16
 *
 * @interface JobStatisticsBase
 */
interface JobStatisticsBase {
    jobSetId: ArtefactId;
    counts: Counts;
    properties?: string[];
    media: Media;
}
/**
 * Documents only API response.
 *
 * @since 0.9.16
 *
 * @export
 * @interface DocumentOnly
 * @extends {JobStatisticsBase}
 */
export interface DocumentOnly extends JobStatisticsBase {
    documents: Documents[];
}
/**
 * Document set only API response.
 *
 * @since 0.9.16
 *
 * @export
 * @interface DocumentSetsOnly
 * @extends {JobStatisticsBase}
 */
export interface DocumentSetOnly extends JobStatisticsBase {
    documentSets: DocumentSets[];
}
/**
 * Document set with document info API response.
 *
 * @since 0.9.16
 *
 * @export
 * @interface DocumentSetsOnly
 * @extends {JobStatisticsBase}
 */
export interface DocumentSetAll extends JobStatisticsBase {
    documentSets: DocumentSetsWithDocuments[];
}
export type JobSetStatistics = DocumentOnly | DocumentSetOnly | DocumentSetAll;
/**
 * Document sets property object.
 *
 * @since 0.9.16
 *
 * @interface DocumentSets
 */
interface DocumentSets {
    documentSetId: number;
    counts: Counts;
    media: Record<string, number>;
}
/**
 * Document sets property object.
 *
 * @since 0.9.16
 *
 * @interface DocumentSetsWithDocuments
 */
interface DocumentSetsWithDocuments extends DocumentSets {
    documents: Documents;
}
/**
 * Documents property object.
 *
 * @since 0.9.16
 *
 * @interface Documents
 */
export interface Documents {
    documentId: number;
    contentItemId: number;
    dataRecordId: number;
    properties?: Record<string, string>;
    counts: Counts;
    media: Record<string, number>;
}
/**
 * Media property object.
 *
 * @since 0.9.16
 *
 * @interface Media
 */
interface Media {
    name: string;
    type: string;
    size: {
        width: string;
        height: string;
    };
    color: string | null;
    weight: string;
    count: number;
}
/**
 * Counts property object.
 *
 * @since 0.9.16
 *
 * @interface Counts
 */
interface Counts {
    documents: number;
    sheets: number;
    pages: number;
}
/**
 * Scope types.
 *
 * @export
 * @enum {string}
 */
export declare enum Scope {
    documentOnly = "documentOnly",
    documentSetAll = "documentSetAll",
    documentSetOnly = "documentSetOnly"
}
export {};
