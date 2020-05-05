import React from "react"

class Label extends React.Component {

	render_switch(label){
		switch(label) {
			case "low priority":
				return <span className="badge lowPriority">Low Priority</span>
			case "medium priority":
				return <span className="badge mediumPriority">Medium Priority</span>
			case "high priority":
				return <span className="badge highPriority">High Priority</span>
			case "not quite":
				return <span className="badge notQuite">Not Quite</span>
			default:
				return ""
			} 
	}

	render(){
		const label = this.render_switch(this.props.label)
		return (
			<div>
				{label}
			</div>
		)
	}
}

export default Label