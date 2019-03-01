import * as wizzi from 'wizzi';
import { FsJson } from 'wizzi-repo';

export type JsonWizziFactory = {
    wf: wizzi.WizziFactory;
    fsJson: FsJson;
}

export type GeneratedArtifact = {
    artifactContent: string;
    sourcePath: string;
    artifactGenerator: string;
}