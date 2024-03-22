export interface DocumentationInterface {
    id: number,
    DocumentName: string,
    host: number,
    Category: number,
    SubTopic: number,
    subCourse: number     
}

export interface DocumentationDataInterface {
    id: number,
    text: string,
    show_format: string,
    host: number,
    Document: number,
    image:string
  }