import * as wizzi from 'wizzi';
import { FsJson } from 'wizzi-repo';

export type JsonWizziFactory = {
    wf: wizzi.WizziFactory;
    fsJson: FsJson;
}