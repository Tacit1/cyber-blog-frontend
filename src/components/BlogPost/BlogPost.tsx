import {useEffect, useState} from 'react';
import './BlogPost.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const BlogPost = () => {
    const dummy_posts = {
                            title: 'Title',
                            content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                            image: "/public/images/post01.jpg"
                        };

    const [post, setPost] = useState(dummy_posts);
    const params = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${params.id}`).then((response: any) => {
        console.log("Response of posts", response.data);
        if(response && response.data && response.data.length){
            setPost(response.data[0]);
        }
        }).catch((error) => {
            console.log("error while getting posts", error);
        })
    }, []);
    console.log("params", params);                     
    return (
                <div className='post'>
                    <div className='single-blog-post-image' style={{backgroundImage: `url(http://localhost:3000/public/${post.image})`}}>

                    </div>
                    {/* image first, caraousel way */}
                    {/* content */}
                    <div className='post-content-container' dangerouslySetInnerHTML={{__html: post.content}}>
                        
                    </div>
                </div>
           )

}