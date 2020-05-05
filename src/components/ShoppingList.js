import React from "react"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ShoppingListItem from "./ShoppingListItem"

class ShoppingList extends React.Component {
	
	constructor(props){
		super(props)

		this.handle_sort_change = this.handle_sort_change.bind(this)
		this.sort_shopping_list = this.sort_shopping_list.bind(this)
		
		this.state = {
			sort: "created"
		}
	
	}

	handle_sort_change(event){
		var new_state = this.state
		new_state.sort = event.target.value
		this.setState(new_state)
	}

	sort_shopping_list(shopping_list){
		switch(this.state.sort) {
			case "alphabetical":
				return shopping_list.sort((a, b) => (a.name.localeCompare(b.name)))
			case "priority":
				var priority_order = ["high", "medium", "low"]
				return shopping_list.sort((a, b) => priority_order.indexOf(a.priority) - priority_order.indexOf(b.priority))
			// Also the "created" option
			default:
				return shopping_list.sort((a, b) => (b.id - a.id))
		}
	}

	render() {
		var shopping_list = this.props.shopping_list
		shopping_list = this.sort_shopping_list(shopping_list)

		const ShoppingList = shopping_list.map(item => <ShoppingListItem key={item.id}
																					id={item.id} 
																					name={item.name} 
																					trips={item.trips} 
																					priority={item.priority}
																					notes={item.notes}
																					on_shopping_list_focus={this.props.on_shopping_list_focus}
																   			 		on_shopping_list_focus_out={this.props.on_shopping_list_focus_out}
																   			  		on_shopping_X_click={this.props.on_shopping_X_click}
																   			  		on_shopping_change_priority={this.props.on_shopping_change_priority}
																					on_shopping_arrow_click={this.props.on_shopping_arrow_click}
																					on_shopping_list_notes_focus_out={this.props.on_shopping_list_notes_focus_out}
																   			  		/>)

		return(
			<div>
				<h2>Shopping List</h2>
				<br/>
				<button type="button" onClick={this.props.on_shopping_add_click} className="btn btn-success addNew">Add New</button>
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
								        	<option value="priority">Priority</option>
								      	</Form.Control>
								    </Col>
							    </Row>
						    </Form.Group>
				</div>
				{ShoppingList}
			</div>
		)
	}
}

export default ShoppingList