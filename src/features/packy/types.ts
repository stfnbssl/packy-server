type RequiredPackyFileAttributes = {
    contents: string;
    type: 'ASSET' | 'CODE';
    generated?: true;
};
  
export type PackyFiles = {
    [x: string]: RequiredPackyFileAttributes;
};

export type TemplateList = string[];

export type Template = {
    name: string;
    files: PackyFiles;
}