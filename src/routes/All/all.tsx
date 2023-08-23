// import { Form } from 'react-router-dom'
import '../general.css'
import App from '../filters/filter'
import Button from '../filters/createButton'

export default function All(){
    return (
            <div className="content">
                <div className="top">
                    <h1>All tasks</h1>
                    <div className="filters">
                        {/* <div>Importance</div> */}
                        <App placeholder="Importance: All" />
                        <App placeholder="Category: All" />
                        <App placeholder="By Date: All" />
                    </div>
                    <Button />
                </div>
                
            </div>
    )
}