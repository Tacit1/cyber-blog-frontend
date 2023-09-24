import {useEffect, useState} from 'react';
import './BlogPosts.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const BlogPosts = (props: any) => {
    console.log("props", props);
    const dummy_posts = [
                        {
                            _id: "1",
                            title: 'Title',
                            content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                            image: "/images/post01.jpg"
                        },
                        {
                            _id: "2",
                            title: 'Title',
                            content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                            image: "/images/post02.jpg"
                        },
                        {
                            _id: "3",
                            title: 'Title',
                            content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                            image: "/images/post03.jpg"
                        },
                        {
                            _id: "4",
                            title: 'Title',
                            content: ` Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
                            image: "/images/post04.jpg"
                        },
                    ]
    const [posts, setPosts] = useState(dummy_posts);    
    
    useEffect(() => {
        axios.get('http://localhost:3000/posts').then((response: any) => {
        console.log("Response of posts", response.data);
        if(response && response.data && response.data.length){
            setPosts(response.data);
        }
        }).catch((error) => {
            console.log("error while getting posts", error);
        })
    }, []);
    
    
    function padZero(str: any, len?: any) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    function invertColor(hex: any, bw?: boolean) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw 'HEX is invalid';
        }
        let r = parseInt(hex.slice(0, 2), 16) as any;
        let    g = parseInt(hex.slice(2, 4), 16) as any;
        let    b = parseInt(hex.slice(4, 6), 16) as any;
        if (bw) {

            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        return "#" + padZero(r) + padZero(g) + padZero(b);
    }
    
    function getRandomColor(): any{
        const color = "#" + Math.floor(Math.random()*16777215).toString(16);
        if(color.length > 7){
            return color.slice(0, 7);
        }else if(color.length == 7){
            return color
        }else{
            return getRandomColor();
        }
    }

    const navigate = useNavigate();

    function handlePostClick(postId: any){
        return () => {
            navigate('/blog/' + postId);
        }
    }
    return (
                        <div className='posts'>
                           {
                            posts.map((post, i) => {
                                const color = getRandomColor();
                                const inverseColor = invertColor(color, true);
                                    return (
                                        <div key={post.title + "-" + i} className='posts-container' onClick={handlePostClick(post._id)}>
                                            <div className='post-image' style={{backgroundImage: `url('http://localhost:3000/public/${post.image}')`}}>
                                                
                                            </div>
                                            <div className='post-content' style={{backgroundColor: color, color: inverseColor}}>
                                                <div className='title'>
                                                    {post.title} {i+1}
                                                </div>
                                                <div className='content' dangerouslySetInnerHTML={{__html: post.content}}>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    )
                            })
                           }
                        </div>
                        
                    )

}