import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

import style from '../../../styles/components/Input.module.css';
import {inputColors} from '../../../styles/_colors';

const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.pdf',
    '.png',
    '.jpg',
]

const DragDrop: React.FC = () => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(async(file:File) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                const binaryStr = reader.result;
            };
            reader.readAsArrayBuffer(file);
        });
        console.log(acceptedFiles);
        setFiles((prev) => [...prev, ...acceptedFiles]);
    }, [])

    const {
        getRootProps, 
        getInputProps, 
        isDragActive,  
        fileRejections      
    } = useDropzone({
        onDrop,
        accept: fileTypes,
        multiple: true,
        maxSize: 5000000,
        maxFiles: 4,
    })

    const onDropRejected = fileRejections.map(file => {
        return file.file.name;
    })



    return (
        <div>
            <fieldset >
                <label htmlFor='fileUpload'>
                    <p>File Upload</p>
                </label>
                <div id='fileUpload' className={style.fileContainer} style={{
                        backgroundColor: inputColors.fileInput.primary,
                    }}>

                    <div {...getRootProps()} 
                        className={style.dropZone}
                        style={{
                            backgroundColor: inputColors.fileInput.secondary
                        }}>
                        <input {...getInputProps()} />
                        {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>
                                Upload files <br/>
                                <em> (Max: 4 files, only xlsx, pdf, docx, and pptx).</em>
                                
                            </p>
                        }
                    </div>
                    {
                        files.length > 0 &&
                        <table 
                            style={{
                                backgroundColor: inputColors.fileInput.secondary
                            }}>
                            <thead>
                                <tr>
                                    <th>Delete</th>
                                    <th>Name</th>
                                    <th>Size (kb)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    files.map((file:File, index:number) => (
                                        <tr key={index}>
                                            <td>
                                                <button onClick={() => setFiles(files.filter(f => f.name !== file.name))}>
                                                    Delete
                                                </button>
                                            </td>
                                            <td>{file.name}</td>
                                            <td>{
                                                Math.round(file.size / 10) / 100
                                            }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                
                </div>
            </fieldset>
        </div>
    )
}

export default DragDrop;