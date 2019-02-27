type RequiredPackyFileAttributes = {
    contents: string;
    type: 'ASSET' | 'CODE';
  };
  
export type PackyFiles = {
    [x: string]: RequiredPackyFileAttributes;
};

export type TemplateList = string[];

export type Template = {
    name: string;
    files: PackyFiles;
}