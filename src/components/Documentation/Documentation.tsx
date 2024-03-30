import * as React from 'react';
import { DocumentationInterface, DocumentationDataInterface } from '@/interface/documentationInterface';
import CodeBlock from "@/components/Documentation/CodeBlock"
const DocumentationWholeData = async (DocumentationId: number): Promise<DocumentationDataInterface[]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "DocumentData/" + DocumentationId, { cache: 'no-store' });
  const response = await fetchData.json();
  return response;
}

export async function Documentation (props: DocumentationInterface) {  
  const docData: DocumentationDataInterface[] = await DocumentationWholeData(1);
 
  console.log(docData)
  return (
    <div>
      <h1 className=' my-5 text-3xl font-bold'>{props.DocumentName}</h1>
      {docData.map((data, index) => (
        <div key={index} className='my-1 '>
          {data.show_format === "text"  &&  <div dangerouslySetInnerHTML={{ __html: data.text }} />}
          {data.show_format === "code"  &&<CodeBlock codeString={data.text}/>}
          {data.show_format === "image" && <img src={data.image} alt="Image" />}
       </div>
      ))}
    </div>
  );
}
