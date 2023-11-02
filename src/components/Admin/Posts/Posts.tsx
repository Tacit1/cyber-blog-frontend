import { useEffect, useState } from 'react';
import './Posts.css'
import axios from 'axios';
export const Posts = () => {
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
            image: "images/post01.jpg",
            order: 1
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
            image: "images/post02.jpg",
            order: 2
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
            image: "images/post03.jpg",
            order: 3
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
            image: "/images/post04.jpg",
            order: 4
        },
    ]

    const [posts, setPosts] = useState(dummy_posts);
    const [order, setOrder] = useState(new Map());

    function updateOrder(id: any){
        return (e: any) => {
            setOrder(map => new Map(map.set(id, e.target.value)));
        }
    }

    function updatePostOrder(id: any){
        return (e: any) => {
            console.log("updating post =>" , id);
            const newOrder = order.get(id) ? order.get(id): 0;
            console.log("post order => ", newOrder);
            const formData = new FormData();
            formData.append('order', newOrder)
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `/service/post/${id}`,
                data : {order: newOrder}
              };
            axios.request(config).then(respnose => {
                console.log("axios response", respnose);
            }).catch(error => {
                console.log("error updating post", error);
            })
        }
    }

    function deletePost(id: any){
        return () => {
            console.log("deleting post", id);
            axios.delete(`/service/posts/${id}`).then(response => {
                console.log("post deleted", response);
            }).catch(error => {
                console.log('error in post', error);
            })
        }
    }

    useEffect(() => {
        axios.get('/service/posts').then((response: any) => {
        console.log("Response of posts", response.data);
        if(response && response.data && response.data.length){
            setPosts(response.data);
            const orderMap = new Map();
            response.data.map((post: any) => {
                orderMap.set(post._id, post.order);
            })
            setOrder(orderMap);
        }
        }).catch((error) => {
            console.log("error while getting posts", error);
        })
    }, []);

    return (
        <>
        <div className='posts-container'>
        <div className="posts">
            {
                posts.map((post, i) => {
                    return (
                            <div key={post.title + "-" + i} className='post'>
                                <div className='title'>
                                    {i} - {post.title}
                                </div>
                                <div className='description'>
                                        {post.content.trim().substring(0, 100)}...
                                </div>
                                <div className='post-actions'>
                                    <div>
                                        <label>Order </label>
                                        <input type='number' onChange={ updateOrder(post._id) } value={order.get(post._id)}></input>
                                    </div>
                                    <div>
                                        <button onClick={updatePostOrder(post._id)}>Update Order</button>
                                    </div>
                                    <div>
                                        <button onClick={deletePost(post._id)}>Delete Post</button>
                                    </div>
                                </div>
                            </div>
                    )
                })
            }    
            </div>
        </div>
        
        </>
    )
}