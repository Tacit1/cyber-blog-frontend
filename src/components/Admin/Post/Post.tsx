import { useEffect, useState } from 'react';
import './Post.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Quill from 'quill'

let quill = null as any;
export const Post = () => {

    const dummy_post = {
            id: "1",
            title: 'Title',
            content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            image: "images/post01.jpg",
    }

    const [post, setPost] = useState(dummy_post);
    const params = useParams();
    const [title, setTitle] = useState('');
    useEffect(() => {
        const editor = document.getElementById('editor');
        console.log("edtior")
            if(editor && !quill){
                 quill = new Quill('#editor', {
                    theme: 'snow',
                    placeholder: 'Compose an epic...',
                    
                }) 
        }
        axios.get(`/service/posts/${params.id}`).then((response: any) => {
        console.log("Response of posts", response.data);
        if(response && response.data && response.data.length){
            console.log("response.data", response.data);
            setPost(response.data[0]);
            quill.root.innerHTML = response.data[0].content;
            setTitle(response.data[0].title);
        }
        }).catch((error) => {
            console.log("error while getting posts", error);
        })
    }, []);

    // function createMarkup() {
    //     return {__html: post.content};
    // }

    function updatePost(){
        const content = quill.root.innerHTML
        console.log("quill content", content);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        // need to upload it to server;
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `/service/post/${params.id}`,
            data : {title: title, content: content}
          };
        axios.request(config).then((response: any) => {
            console.log("axios response", response);
            window.alert("Post created successfully")
        }).catch((error: any) => {
            console.log("erorr in fetching response", error)
            window.alert("error creating post");
        })
    }

    return (
        <>
        <div className='admin-posts-container'>
        <div className="admin-posts">
            {
                <>
                 
                 <div>
                    <button type='button' onClick={updatePost}>Update</button>
                 </div>
                 <form>
                    <input className='form-element' type='text' placeholder='Title' value={title} onInput={(e) => setTitle((e.target as HTMLInputElement).value)}></input>
                    <div className='eidtor-container'>
                                    <div id='editor'>
                                            
                                    </div>
                    </div>
                

                 </form>
                
                   
                </>
                
            }    
            </div>
        </div>
        
        </>
    )
}