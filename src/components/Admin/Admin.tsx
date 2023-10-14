import Quill from 'quill'
import './Admin.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import FormData from 'form-data';
let quill = null as any;
let file = null as any;
export const Admin = () => {
    
    useEffect(() => {
        const editor = document.getElementById('editor');
        console.log("edtior")
            if(editor && !quill){
                 quill = new Quill('#editor', {
                    theme: 'snow',
                    placeholder: 'Compose an epic...',
                }) 
             }
    }, [])

    const [title, setTitle] = useState('');

    function formSubmit(){
        console.log("event", title);
        const content = quill.root.innerHTML
        console.log("quill content", content);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        console.log("file", file);
        if(file){
            formData.append('image', file);
        }
        // need to upload it to server;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/service/post',
            data : formData
          };
        axios.request(config).then((response: any) => {
            console.log("axios response", response);
        }).catch((error: any) => {
            console.log("erorr in fetching response", error)
        })
    }

    function fileUpload(e: any){
        if(e.target.files.length != 0){
            file = e.target.files[0];
        }
        // upload file and get the ref
    }
    return (
        <>
      
            <h2 className='admin-heading'>Create Post</h2>
            <form>
                            <input className='form-element' type='text' placeholder='Title' value={title} onInput={(e) => setTitle((e.target as HTMLInputElement).value)}></input>
                            <div className='eidtor-container'>
                                <div id='editor'>

                                </div>
                            </div>
                                
                            <input className='form-element image-element' onChange={fileUpload} type='file' placeholder='upload image'></input>
                            <div>
                                <button className='form-button' type='button' onClick={() => formSubmit()}>Submit</button>
                            </div>
            </form>
        </>
    )
} 