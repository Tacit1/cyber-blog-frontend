import {Component} from 'react';
import { BlogPosts } from '../components/BlogPosts/BlogPosts';
export class HomePage extends Component {
        componentDidMount(){

        }

        render(){
            return (
                <div>
                    <BlogPosts></BlogPosts>
                </div>
            )
        }
}