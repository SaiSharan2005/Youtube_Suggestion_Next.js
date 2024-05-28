import * as React from 'react';
import { DocumentationInterface, DocumentationDataInterface } from '@/interface/documentationInterface';
import CodeBlock from "@/components/Documentation/CodeBlock"
import Image from 'next/image';

const DocumentationWholeData = async (DocumentationId: number): Promise<DocumentationDataInterface[]> => {
  const fetchData = await fetch(process.env.BACKEND_URL + "DocumentData/" + DocumentationId, { cache: 'no-store' });
  const response = await fetchData.json();
  return response;
}

export async function Documentation (props: DocumentationInterface) {  
  const docData: DocumentationDataInterface[] = await DocumentationWholeData(props.id);

  return (
    <div>
      <h1 className=' my-5 text-1xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold'>{props.DocumentName}</h1>
      {docData.map((data, index) => (
        <div key={index} className='my-5 mx-3 '>
          {data.show_format === "text"  &&  <div dangerouslySetInnerHTML={{ __html: data.text }} />}
          {data.show_format === "code"  &&<CodeBlock codeString={data.text}/>}
          {data.show_format === "image" && <Image src={data.image} alt="Image" className='max-h-[60vh]' width={900} height={600}/>}
       </div>
      ))}
    </div>
  );
}
