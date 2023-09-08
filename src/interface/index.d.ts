export interface ToothSummary {
    author: string;
    description: string;
    latest_version: string;
    name: string;
    tags: string[];
    tooth: string;
}

export interface ToothDetails {
    author: string;
    available_versions: string[];
    /**
     * Defined in JSON schema
     */
    dependencies: { [key: string]: any };
    description: string;
    name: string;
    readme: null | string;
    tags: string[];
    tooth: string;
    version: string;
}