import {Component} from 'react';
import './nav.css'
export class Nav extends Component {
        componentDidMount(){

        }

        render(){
            return (
                <div className='nav'>
                    <div className='logo-container'>
                        <img className='logo' src="/images/logo.jpg" alt="" />
                    </div>
                    <div>
                        Blog
                    </div>
                </div>
            )
        }
}