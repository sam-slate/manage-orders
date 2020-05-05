import React from "react"
import EditableLabel from 'react-inline-editing'

class InventoryListItem extends React.Component {

	constructor(props){
      super(props)

      this.handle_name_focus = this.handle_name_focus.bind(this)
      this.handle_name_focus_out = this.handle_name_focus_out.bind(this)
      this.handle_X_click = this.handle_X_click.bind(this)
	  this.handle_arrow_click = this.handle_arrow_click.bind(this)
	  this.handle_location_focus_out = this.handle_location_focus_out.bind(this)
	  this.handle_notes_focus_out = this.handle_notes_focus_out.bind(this)
    }

    // Not in use at the moment
	handle_name_focus(text) {
    }
 
 	// Used to update name
    handle_name_focus_out(text) {
    	console.log(this.props.id)
        this.props.on_inventory_list_focus_out(text, this.props.id)
	}
	
	handle_location_focus_out(text) {
        this.props.on_inventory_location_focus_out(text, this.props.id)
	}
	
	handle_notes_focus_out(text) {
        this.props.on_inventory_notes_focus_out(text, this.props.id)
    }

    // Used to delete item
    handle_X_click() {
    	console.log("click")
    	this.props.on_inventory_X_click(this.props.id)
    }

    // Used to move item to shopping list
    handle_arrow_click(){
    	console.log("handle arrow click")
    	this.props.on_inventory_arrow_click(this.props.id)
    }

	render() {
		return(
			<div className="card inventoryListItem">
				<div className="card-body">
					<div className="d-flex justify-content-between">
			            <EditableLabel text={this.props.name}
			                inputWidth='120px'
			                inputHeight='25px'
			                inputMaxLength={30}
			                labelFontWeight='bold'
							inputFontWeight='bold'
			                onFocus={this.handle_name_focus}
                			onFocusOut={this.handle_name_focus_out}
			            />
						<div>
							<button type="button" onClick={this.handle_arrow_click} className="inventoryMoveButton btn btn-sm btn-outline-success">→</button>
							<button type="button" onClick={this.handle_X_click} className="inventoryXButton btn btn-sm btn-outline-danger">✕</button>
						</div>
					</div>
					<div className="d-flex flex-row">
							Location:&nbsp;
							<EditableLabel text={this.props.location}
										onFocusOut={this.handle_location_focus_out}
										inputWidth='120px'
					        /> 
					</div>
					<div className="d-flex flex-row">
							Notes:&nbsp;
							<EditableLabel text={this.props.notes}
					                	onFocusOut={this.handle_notes_focus_out}
					        /> 
					</div>
				</div>
			</div>
		)
	}
}

export default InventoryListItem