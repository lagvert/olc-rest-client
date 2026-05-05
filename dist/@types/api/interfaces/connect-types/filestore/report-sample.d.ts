export declare const SampleReport: {
    properties: {
        application: string;
        author: string;
        created: string;
        file: string;
        modified: string;
    };
    template: {
        manifest: {
            colorSpaces: {
                colorSpaceType: string;
                name: string;
                id: string;
            }[];
            colors: {
                name: string;
                colorSpace: {
                    colorSpaceType: string;
                    name: string;
                    id: string;
                };
                values: string[];
                spot: string;
                autoName: string;
                overprint: string;
                id: string;
            }[];
            contexts: ({
                type: string;
                section: {
                    location: string;
                    context: string;
                    name: string;
                    size: {
                        name: string;
                        width: string;
                        height: string;
                    };
                    portrait: string;
                    "left-margin": string;
                    "top-margin": string;
                    "right-margin": string;
                    "bottom-margin": string;
                    "left-bleed": string;
                    "top-bleed": string;
                    "right-bleed": string;
                    "bottom-bleed": string;
                    zoomLevel: string;
                    styleSheetOrder: ({
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context"?: undefined;
                    } | {
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context": string;
                    })[];
                    includedStyleSheets: ({
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context"?: undefined;
                    } | {
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context": string;
                    })[];
                    finishing: {
                        binding: {
                            style: string;
                            edge: string;
                            type: string;
                            angle: string;
                            "item-count": string;
                            area: string;
                        };
                    };
                    sectionBackground: {
                        resource: string;
                        position: string;
                        allPages: string;
                        from: string;
                        to: string;
                        rotation: string;
                        scale: string;
                    };
                    duplex: string;
                    "email-subject": string;
                    "email-attachpdf": string;
                    "email-addPlainText": string;
                    numbering: {
                        restartPageNumbering: string;
                        format: string;
                        addPrefixToPageCounts: string;
                    };
                    tumble: string;
                    facingPages: string;
                    mediaRotation: string;
                    sameSheetConfigForAll: string;
                    omitEmptyBackside: string;
                    minPages: string;
                    "email-inlineMode": string;
                    id: string;
                    masterSheets?: undefined;
                };
                defSection: {
                    location: string;
                    context: string;
                    name: string;
                    size: {
                        name: string;
                        width: string;
                        height: string;
                    };
                    portrait: string;
                    "left-margin": string;
                    "top-margin": string;
                    "right-margin": string;
                    "bottom-margin": string;
                    "left-bleed": string;
                    "top-bleed": string;
                    "right-bleed": string;
                    "bottom-bleed": string;
                    zoomLevel: string;
                    styleSheetOrder: ({
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context"?: undefined;
                    } | {
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context": string;
                    })[];
                    includedStyleSheets: ({
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context"?: undefined;
                    } | {
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context": string;
                    })[];
                    finishing: {
                        binding: {
                            style: string;
                            edge: string;
                            type: string;
                            angle: string;
                            "item-count": string;
                            area: string;
                        };
                    };
                    sectionBackground: {
                        resource: string;
                        position: string;
                        allPages: string;
                        from: string;
                        to: string;
                        rotation: string;
                        scale: string;
                    };
                    duplex: string;
                    "email-subject": string;
                    "email-attachpdf": string;
                    "email-addPlainText": string;
                    numbering: {
                        restartPageNumbering: string;
                        format: string;
                        addPrefixToPageCounts: string;
                    };
                    tumble: string;
                    facingPages: string;
                    mediaRotation: string;
                    sameSheetConfigForAll: string;
                    omitEmptyBackside: string;
                    minPages: string;
                    "email-inlineMode": string;
                    id: string;
                };
                id: string;
                finishing?: undefined;
                colorOutput?: undefined;
            } | {
                type: string;
                section: {
                    location: string;
                    context: string;
                    name: string;
                    size: {
                        name: string;
                        width: string;
                        height: string;
                    };
                    portrait: string;
                    "left-margin": string;
                    "top-margin": string;
                    "right-margin": string;
                    "bottom-margin": string;
                    "left-bleed": string;
                    "top-bleed": string;
                    "right-bleed": string;
                    "bottom-bleed": string;
                    zoomLevel: string;
                    styleSheetOrder: ({
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context"?: undefined;
                    } | {
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context": string;
                    })[];
                    includedStyleSheets: ({
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context"?: undefined;
                    } | {
                        location: string;
                        readOnly: string;
                        id: string;
                        "target-context": string;
                    })[];
                    finishing: {
                        binding: {
                            style: string;
                            edge: string;
                            type: string;
                            angle: string;
                            "item-count": string;
                            area: string;
                        };
                    };
                    sectionBackground: {
                        resource: string;
                        position: string;
                        allPages: string;
                        from: string;
                        to: string;
                        rotation: string;
                        scale: string;
                    };
                    duplex: string;
                    "email-attachpdf": string;
                    "email-addPlainText": string;
                    numbering: {
                        restartPageNumbering: string;
                        format: string;
                        addPrefixToPageCounts: string;
                    };
                    tumble: string;
                    facingPages: string;
                    mediaRotation: string;
                    sameSheetConfigForAll: string;
                    omitEmptyBackside: string;
                    minPages: string;
                    "email-inlineMode": string;
                    masterSheets: {
                        media: {
                            name: string;
                            preprinted: string;
                            "front-side-background-image-page-number": string;
                            "front-side-background-position": string;
                            "back-side-background-image-page-number": string;
                            "back-side-background-position": string;
                            size: {
                                name: string;
                                width: string;
                                height: string;
                            };
                            "media-type": string;
                            "media-front-coating": string;
                            "media-back-coating": string;
                            "media-texture": string;
                            "media-grade": string;
                            "use-front-side-background-image": string;
                            "use-back-side-background-image": string;
                            id: string;
                        };
                        frontMaster: {
                            location: string;
                            name: string;
                            media: {
                                name: string;
                                preprinted: string;
                                "front-side-background-image-page-number": string;
                                "front-side-background-position": string;
                                "back-side-background-image-page-number": string;
                                "back-side-background-position": string;
                                size: {
                                    name: string;
                                    width: string;
                                    height: string;
                                };
                                "media-type": string;
                                "media-front-coating": string;
                                "media-back-coating": string;
                                "media-texture": string;
                                "media-grade": string;
                                "use-front-side-background-image": string;
                                "use-back-side-background-image": string;
                                id: string;
                            };
                            duplex: string;
                            size: {
                                name: string;
                            };
                            portrait: string;
                            id: string;
                        };
                        frontAllowContent: string;
                        backAllowContent: string;
                        omitEmptyMasterBack: string;
                    }[];
                    id: string;
                    "email-subject"?: undefined;
                };
                finishing: {
                    binding: {
                        style: string;
                        edge: string;
                        type: string;
                        angle: string;
                        "item-count": string;
                        area: string;
                    };
                };
                colorOutput: {
                    keepRgbBlack: string;
                    textSmallerThan: string;
                };
                id: string;
                defSection?: undefined;
            })[];
            images: {
                location: string;
                id: string;
            }[];
            masters: {
                location: string;
                name: string;
                media: {
                    name: string;
                    preprinted: string;
                    "front-side-background-image-page-number": string;
                    "front-side-background-position": string;
                    "back-side-background-image-page-number": string;
                    "back-side-background-position": string;
                    size: {
                        name: string;
                        width: string;
                        height: string;
                    };
                    "media-type": string;
                    "media-front-coating": string;
                    "media-back-coating": string;
                    "media-texture": string;
                    "media-grade": string;
                    "use-front-side-background-image": string;
                    "use-back-side-background-image": string;
                    id: string;
                };
                duplex: string;
                size: {
                    name: string;
                };
                portrait: string;
                id: string;
            }[];
            medias: {
                name: string;
                preprinted: string;
                "front-side-background-image-page-number": string;
                "front-side-background-position": string;
                "back-side-background-image-page-number": string;
                "back-side-background-position": string;
                size: {
                    name: string;
                    width: string;
                    height: string;
                };
                "media-type": string;
                "media-front-coating": string;
                "media-back-coating": string;
                "media-texture": string;
                "media-grade": string;
                "use-front-side-background-image": string;
                "use-back-side-background-image": string;
                id: string;
            }[];
            sections: ({
                location: string;
                context: {
                    type: string;
                    section: string;
                    finishing: {
                        binding: {
                            style: string;
                            edge: string;
                            type: string;
                            angle: string;
                            "item-count": string;
                            area: string;
                        };
                    };
                    colorOutput: {
                        keepRgbBlack: string;
                        textSmallerThan: string;
                    };
                    id: string;
                    defSection?: undefined;
                };
                name: string;
                size: {
                    name: string;
                    width: string;
                    height: string;
                };
                portrait: string;
                "left-margin": string;
                "top-margin": string;
                "right-margin": string;
                "bottom-margin": string;
                "left-bleed": string;
                "top-bleed": string;
                "right-bleed": string;
                "bottom-bleed": string;
                zoomLevel: string;
                styleSheetOrder: ({
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context"?: undefined;
                } | {
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context": string;
                })[];
                includedStyleSheets: ({
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context"?: undefined;
                } | {
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context": string;
                })[];
                finishing: {
                    binding: {
                        style: string;
                        edge: string;
                        type: string;
                        angle: string;
                        "item-count": string;
                        area: string;
                    };
                };
                sectionBackground: {
                    resource: string;
                    position: string;
                    allPages: string;
                    from: string;
                    to: string;
                    rotation: string;
                    scale: string;
                };
                duplex: string;
                "email-attachpdf": string;
                "email-addPlainText": string;
                numbering: {
                    restartPageNumbering: string;
                    format: string;
                    addPrefixToPageCounts: string;
                };
                tumble: string;
                facingPages: string;
                mediaRotation: string;
                sameSheetConfigForAll: string;
                omitEmptyBackside: string;
                minPages: string;
                "email-inlineMode": string;
                masterSheets: {
                    media: {
                        name: string;
                        preprinted: string;
                        "front-side-background-image-page-number": string;
                        "front-side-background-position": string;
                        "back-side-background-image-page-number": string;
                        "back-side-background-position": string;
                        size: {
                            name: string;
                            width: string;
                            height: string;
                        };
                        "media-type": string;
                        "media-front-coating": string;
                        "media-back-coating": string;
                        "media-texture": string;
                        "media-grade": string;
                        "use-front-side-background-image": string;
                        "use-back-side-background-image": string;
                        id: string;
                    };
                    frontMaster: {
                        location: string;
                        name: string;
                        media: {
                            name: string;
                            preprinted: string;
                            "front-side-background-image-page-number": string;
                            "front-side-background-position": string;
                            "back-side-background-image-page-number": string;
                            "back-side-background-position": string;
                            size: {
                                name: string;
                                width: string;
                                height: string;
                            };
                            "media-type": string;
                            "media-front-coating": string;
                            "media-back-coating": string;
                            "media-texture": string;
                            "media-grade": string;
                            "use-front-side-background-image": string;
                            "use-back-side-background-image": string;
                            id: string;
                        };
                        duplex: string;
                        size: {
                            name: string;
                        };
                        portrait: string;
                        id: string;
                    };
                    frontAllowContent: string;
                    backAllowContent: string;
                    omitEmptyMasterBack: string;
                }[];
                id: string;
                "email-subject"?: undefined;
            } | {
                location: string;
                context: {
                    type: string;
                    section: string;
                    defSection: string;
                    id: string;
                    finishing?: undefined;
                    colorOutput?: undefined;
                };
                name: string;
                size: {
                    name: string;
                    width: string;
                    height: string;
                };
                portrait: string;
                "left-margin": string;
                "top-margin": string;
                "right-margin": string;
                "bottom-margin": string;
                "left-bleed": string;
                "top-bleed": string;
                "right-bleed": string;
                "bottom-bleed": string;
                zoomLevel: string;
                styleSheetOrder: ({
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context"?: undefined;
                } | {
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context": string;
                })[];
                includedStyleSheets: ({
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context"?: undefined;
                } | {
                    location: string;
                    readOnly: string;
                    id: string;
                    "target-context": string;
                })[];
                finishing: {
                    binding: {
                        style: string;
                        edge: string;
                        type: string;
                        angle: string;
                        "item-count": string;
                        area: string;
                    };
                };
                sectionBackground: {
                    resource: string;
                    position: string;
                    allPages: string;
                    from: string;
                    to: string;
                    rotation: string;
                    scale: string;
                };
                duplex: string;
                "email-subject": string;
                "email-attachpdf": string;
                "email-addPlainText": string;
                numbering: {
                    restartPageNumbering: string;
                    format: string;
                    addPrefixToPageCounts: string;
                };
                tumble: string;
                facingPages: string;
                mediaRotation: string;
                sameSheetConfigForAll: string;
                omitEmptyBackside: string;
                minPages: string;
                "email-inlineMode": string;
                id: string;
                masterSheets?: undefined;
            })[];
            snippets: {
                location: string;
                id: string;
            }[];
            stylesheets: ({
                location: string;
                readOnly: string;
                id: string;
                "target-context"?: undefined;
            } | {
                location: string;
                readOnly: string;
                id: string;
                "target-context": string;
            })[];
        };
        datamodelconfigadapter: {
            dataTypes: {
                enumerable: string;
                name: {
                    name: string;
                    names: {
                        entry: {
                            key: {
                                displayNames: {
                                    entry: {
                                        key: {
                                            iso: string;
                                        };
                                        value: string;
                                    };
                                };
                                iso: {
                                    iso: string;
                                };
                            };
                            value: string;
                        };
                    };
                };
            }[];
            datamodel: {
                configs: {
                    field: {
                        name: string;
                        required: string;
                        type: string;
                        value: string;
                    }[];
                    table: {
                        configs: {
                            field: {
                                name: string;
                                required: string;
                                type: string;
                                value: string;
                            }[];
                        };
                        name: string;
                        required: string;
                    };
                };
                name: string;
                schemaVersion: string;
                version: string;
            };
        };
        locale: {
            source: string;
        };
        colorSettings: {
            colorManagement: string;
            renderingIntent: string;
        };
        scripts: {
            script: {
                enabled: string;
                name: string;
                scope: string;
                selectorText: string;
                selectorType: string;
                source: string;
                type: string;
            }[];
            folder: ({
                scripts: ({
                    "com.objectiflune.scripting.text.TextScriptModel": {
                        entry: {
                            field: {
                                path: string[];
                                type: string;
                            };
                            fieldFormatString: {
                                type: string;
                            };
                            format: {
                                type: string;
                                value: string;
                            };
                        };
                        convertToJSON: string;
                        schemaVersion: string;
                    };
                    enabled: string;
                    findText: string;
                    name: string;
                    origin: {
                        entry: {
                            key: string;
                            value: string;
                        }[];
                    };
                    scope: string;
                    selectorText: string;
                    selectorType: string;
                    type: string;
                    source?: undefined;
                } | {
                    enabled: string;
                    name: string;
                    scope: string;
                    selectorText: string;
                    selectorType: string;
                    source: string;
                    type: string;
                    "com.objectiflune.scripting.text.TextScriptModel"?: undefined;
                    findText?: undefined;
                    origin?: undefined;
                })[];
                filterParentScope: string;
                name: string;
            } | {
                scripts: ({
                    "com.objectiflune.scripting.text.EmailSubjectScriptModel": {
                        entry: {
                            field: {
                                path: string;
                                type: string;
                            };
                            fieldFormatString: {
                                type: string;
                            };
                            format: {
                                type: string;
                                value: string;
                            };
                            prefix: string;
                        };
                        attribute: string;
                        convertToJSON: string;
                        insertMethod: string;
                        schemaVersion: string;
                    };
                    enabled: string;
                    name: string;
                    origin: {
                        entry: {
                            key: string;
                            value: string;
                        }[];
                    };
                    scope: string;
                    selectorText: string;
                    selectorType: string;
                    type: string;
                    "com.objectiflune.scripting.text.EmailRecipientScriptModel"?: undefined;
                    "com.objectiflune.scripting.text.TextScriptModel"?: undefined;
                    findText?: undefined;
                } | {
                    "com.objectiflune.scripting.text.EmailRecipientScriptModel": {
                        entry: {
                            field: {
                                path: string;
                                type: string;
                            };
                            fieldFormatString: {
                                type: string;
                            };
                            format: {
                                type: string;
                                value: string;
                            };
                        };
                        attribute: string;
                        convertToJSON: string;
                        insertMethod: string;
                        schemaVersion: string;
                    };
                    enabled: string;
                    name: string;
                    origin: {
                        entry: {
                            key: string;
                            value: string;
                        }[];
                    };
                    scope: string;
                    selectorText: string;
                    selectorType: string;
                    type: string;
                    "com.objectiflune.scripting.text.EmailSubjectScriptModel"?: undefined;
                    "com.objectiflune.scripting.text.TextScriptModel"?: undefined;
                    findText?: undefined;
                } | {
                    "com.objectiflune.scripting.text.TextScriptModel": {
                        entry: {
                            field: {
                                path: string;
                                type: string;
                            };
                            fieldFormatString: {
                                type: string;
                            };
                            format: {
                                type: string;
                                value: string;
                            };
                        };
                        convertToJSON: string;
                        schemaVersion: string;
                    };
                    enabled: string;
                    findText: string;
                    name: string;
                    origin: {
                        entry: {
                            key: string;
                            value: string;
                        }[];
                    };
                    scope: string;
                    selectorType: string;
                    type: string;
                    "com.objectiflune.scripting.text.EmailSubjectScriptModel"?: undefined;
                    selectorText?: undefined;
                    "com.objectiflune.scripting.text.EmailRecipientScriptModel"?: undefined;
                })[];
                filterParentScope: string;
                name: string;
            })[];
        };
        htmlVersion: string;
        schemaVersion: string;
    };
};
