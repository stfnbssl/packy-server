export type GithubRepo = {
    name: string;
    username: string;
    password: string;
}

export type FileDiffKind = '+' | '-' | '<>';

export type FileDiffItem = {
    path: string;
    content: string;
}

export type FileDiff = {
    kind: FileDiffKind;
    a?: FileDiffItem;
    b?: FileDiffItem;
}


