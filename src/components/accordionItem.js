import React from "react"
import PropTypes from "prop-types"
import { XIcon, ChevronDownIcon } from '@heroicons/react/outline'

class AccordionItem extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            "isToggled": false
        }
    }
    
    handleClick = () => {
        this.setState(state => ({"isToggled": !state.isToggled}))
    }

    render() {
        const icon = this.state.isToggled ? XIcon : ChevronDownIcon
        return (
            <div>
                <div className="border rounded border-white p-2 bg-light" onClick={this.handleClick}>
                    <div className="d-flex justify-content-between align-items-center p-2">
                        <div className="lead">{this.props.title}</div> 
                        <icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                </div>
                {
                    this.state.isToggled 
                        && 
                    <div className="blockquote text-left bg-white my-2 pl-4 py-2 text-secondary text-sm">
                        {this.props.children}
                    </div>
                }
            </div>
        )
    }
}

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default AccordionItem