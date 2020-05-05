import React from "react"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InventoryListItem from "./InventoryListItem"

class Inventory extends React.Component {

	constructor(props){
		super(props)

		this.handle_sort_change = this.handle_sort_change.bind(this)
		this.sort_inventory = this.sort_inventory.bind(this)
		
		this.state = {
			sort: "created"
		}
	
	}

	handle_sort_change(event){
		var new_state = this.state
		new_state.sort = event.target.value
		this.setState(new_state)
	}

	sort_inventory(inventory){
		switch(this.state.sort) {
			case "alphabetical":
				return inventory.sort((a, b) => (a.name.localeCompare(b.name)))
			case "location":
				return inventory.sort((a, b) => (a.location.localeCompare(b.location)))
			// Also the "created" option
			default:
				return inventory.sort((a, b) => (b.id - a.id))
		}
	}

	render() {
		var InventoryList = this.props.inventory

		InventoryList = this.sort_inventory(InventoryList)

		var InventoryListComps = InventoryList.map(item => <InventoryListItem key={item.id}
																			  id={item.id}
																			  name={item.name}
																			  location={item.location}
																			  notes={item.notes}
																			  on_inventory_list_focus={this.props.on_inventory_list_focus}
																   			  on_inventory_list_focus_out={this.props.on_inventory_list_focus_out}
																   			  on_inventory_X_click={this.props.on_inventory_X_click}
																			  on_inventory_arrow_click={this.props.on_inventory_arrow_click}
																			  on_inventory_location_focus_out={this.props.on_inventory_location_focus_out}
									   										  on_inventory_notes_focus_out={this.props.on_inventory_notes_focus_out}
														    />)


		return(
			<div>
				<h2>Inventory</h2>
				<br/>
				<button type="button" onClick={this.props.on_inventory_add_click} className="btn btn-success addNew">Add New</button>
				<div className="priorityInput">
							<Form.Group controlId="exampleForm.ControlSelect1">
								<Row>
									<Col sm={4}>
								      	<Form.Label><b>Sort By:</b></Form.Label>
								    </Col>
								   	<Col sm={8}>
								      	<Form.Control size="sm" as="select" defaultValue={this.state.sort} onChange={this.handle_sort_change}>
								        	<option value="created">Created</option>
								        	<option value="alphabetical">Alphabetical</option>
								        	<option value="location">Location</option>
								      	</Form.Control>
								    </Col>
							    </Row>
						    </Form.Group>
				</div>
				{InventoryListComps}
			</div>
		)
	}
}

export default Inventory
