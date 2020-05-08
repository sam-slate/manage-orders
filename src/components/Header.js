import React from "react"

class Header extends React.Component {
	render(){
		return(
			<div className="d-flex justify-content-end">
				<button type="button" className="btn btn-info saveButton" onClick={this.props.on_save_button_click}>{this.props.save_text}</button>
			</div>
		)
	}
}

export default Header