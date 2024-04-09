"use client"
import { button } from "@nextui-org/react";
import { useState } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FaRegClipboard } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

export interface ICodeBlockProps {
    codeString: string
}


export default function CodeBlock(props: ICodeBlockProps) {
    const [copy, setCopy] = useState<boolean>(false)
    return (
        <div className='bg-gray-500 grid place-items-center rounded-md'>
            <div className=' w-full bg-[#3a404d] rounded-md overflow-hidden'>
                <div className='flex justify-between px-4 py-2 text-white  text-xs items-center'>
                    <p className="text-sm">Example Code</p>
                    {copy ? (<button className="py-1 inline-flex items-center gap-1">
                        <span>
                            <TiTick />
                        </span>
                        Copied!
                    </button>) : (
                        <button className="py-1 inline-flex items-center gap-1" onClick={() => {
                            navigator.clipboard.writeText(props.codeString);
                            setCopy(true);
                            setTimeout(() => {
                                setCopy(false);
                            }, 3000)
                        }}> <FaRegClipboard /> Copy code</button>
                    )}
                </div>

                <SyntaxHighlighter language="python" style={atomOneDark} customStyle={{ "padding": "25px" }}>
                    {props.codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
