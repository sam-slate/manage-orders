import React from "react"
import EditableLabel from 'react-inline-editing'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class ShoppingListItem extends React.Component {
	
	constructor(props){
      super(props)

	  this.handle_name_focus = this.handle_name_focus.bind(this)
	  this.handle_notes_focus_out = this.handle_notes_focus_out.bind(this)
      this.handle_name_focus_out = this.handle_name_focus_out.bind(this)
      this.handle_X_click = this.handle_X_click.bind(this)
      this.handle_priority_change = this.handle_priority_change.bind(this)
      this.handle_arrow_click = this.handle_arrow_click.bind(this)
      this.get_background_color = this.get_background_color.bind(this)
    }

	// Not in use at the moment
	handle_name_focus(text) {
    }
 
 	// Used to update name
    handle_name_focus_out(text) {
    	console.log(this.props.id)
        this.props.on_shopping_list_focus_out(text, this.props.id)
	}
	
	handle_notes_focus_out(text){
		this.props.on_shopping_list_notes_focus_out(text, this.props.id)
	}

    // Used to delete item
    handle_X_click() {
    	console.log("X click")
    	this.props.on_shopping_X_click(this.props.id)
    }

    // Used to change priority of item
    handle_priority_change(event) {
    	console.log("Priority changed to: " + event.target.value)
    	this.props.on_shopping_change_priority(event.target.value, this.props.id)
    }

    // Used to move a shopping list item back to the inventory
    handle_arrow_click(){
    	this.props.on_shopping_arrow_click(this.props.id)
    }

    // Returns background color based on priority 
    get_background_color(){
    	console.log("returning color based on: " + this.props.priority)

    	switch (this.props.priority){
    		case "low":
    			return "#ffffe6"
    		case "medium":
    			return "#fff8eb"
    		case "high":
    			return "#ffebeb"
    		default:
    			return "#ffffff"
    	}
    }

	render() {

		const trips_as_list = this.props.trips.map(trip => <li key={trip.id} className="list-group-item py-1">{trip.name}</li>)

		var background_color = this.get_background_color()

		return(
			<div className="card shoppingListItem" style={{backgroundColor: background_color}}> 
				<div className="card-body">
					<div className="d-flex justify-content-between">
						<EditableLabel text={this.props.name}
			                inputWidth='120px'
			                inputHeight='25px'
			                inputMaxLength={50}
			                labelFontWeight='bold'
			                inputFontWeight='bold'
			                onFocus={this.handle_name_focus}
                			onFocusOut={this.handle_name_focus_out}
			            />
						<div>
							<button type="button" onClick={this.handle_arrow_click} className="inventoryMoveButton btn btn-sm btn-outline-success">←</button>
							<button type="button" onClick={this.handle_X_click} className="inventoryXButton btn btn-sm btn-outline-danger">✕</button>
						</div>
					</div>
					<div className="priorityInput">
						<Form.Group controlId="exampleForm.ControlSelect1">
							<Row>
								<Col sm={3}>
							      	<Form.Label>Priority:</Form.Label>
							    </Col>
							   	<Col>
							      	<Form.Control size="sm" as="select" defaultValue={this.props.priority} onChange={this.handle_priority_change}>
							        	<option value="high">High</option>
							        	<option value="medium">Medium</option>
							        	<option value="low">Low</option>
							      	</Form.Control>
							    </Col>
						    </Row>
					    </Form.Group>
				   	</div>
					<div className="d-flex flex-row">
						Notes:&nbsp;
						<EditableLabel text={this.props.notes}
					            	onFocusOut={this.handle_notes_focus_out}
					    /> 
					</div>
						{trips_as_list.length > 0 ?(
							<div>
								<div>Shopping Trips:</div>
								<ul className="list-group">{trips_as_list}</ul>
							</div>
						):null}
					

					
				</div>
			</div>
		)
	}
}

export default ShoppingListItem