import React from "react"
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ShoppingTrip from "./ShoppingTrip"

class ShoppingTrips extends React.Component {
	constructor(props){
		super(props)

		this.handle_sort_change = this.handle_sort_change.bind(this)
		this.sort_shopping_trips = this.sort_shopping_trips.bind(this)
		
		this.state = {
			sort: "created"
		}
	
	}

	handle_sort_change(event){
		var new_state = this.state
		new_state.sort = event.target.value
		this.setState(new_state)
	}

	sort_shopping_trips(shopping_trips){
		switch(this.state.sort) {
			case "alphabetical":
				return shopping_trips.sort((a, b) => (a.name.localeCompare(b.name)))
			case "service":
				return shopping_trips.sort((a, b) => (a.service.localeCompare(b.service)))
			case "store":
				return shopping_trips.sort((a, b) => (a.store.localeCompare(b.store)))
			case "date":
					return shopping_trips.sort((a, b) => {
						//convert mm/dd/yyyy to yyyymmdd
						var a_date = a.date.substring(6) + a.date.substring(0, 2) + a.date.substring(3, 5)
						var b_date = b.date.substring(6) + b.date.substring(0, 2) + b.date.substring(3, 5)
						console.log(a_date)
						console.log(b_date)
						return (b_date - a_date)
					})	
			case "status":
				var status_order = ["in_process", "finished", "cancelled"]
				return shopping_trips.sort((a, b) => status_order.indexOf(a.status) - status_order.indexOf(b.status))
			// Also the "created" option
			default:
				return shopping_trips.sort((a, b) => (b.id - a.id))
		}
	}
	render() {
		var shopping_trips = this.props.shopping_trips
		shopping_trips = this.sort_shopping_trips(shopping_trips)

		const ShoppingTrips = shopping_trips.map(item => <ShoppingTrip key={item.name} 
																				  id={item.id}
																				  name={item.name}
																				  service={item.service}
																				  store={item.store}
																				  method={item.method}
																				  date={item.date}
																				  status={item.status}
																				  estimated_cost={item.estimated_cost}
																				  notes={item.notes}
																				  trip_items={item.trip_items}
																				  shopping_list={this.props.shopping_list}
																				  on_trip_name_focus_out={this.props.on_trip_name_focus_out}
																				  on_trip_service_focus_out={this.props.on_trip_service_focus_out}
																				  on_trip_store_focus_out={this.props.on_trip_store_focus_out}
																				  on_trip_method_focus_out={this.props.on_trip_method_focus_out}
																				  on_trip_date_focus_out={this.props.on_trip_date_focus_out}
																				  on_trip_estimated_cost_focus_out={this.props.on_trip_estimated_cost_focus_out}
																				  on_trips_change_status={this.props.on_trips_change_status}
																				  on_trips_X_click={this.props.on_trips_X_click}
																				  on_trip_item_focus_out={this.props.on_trip_item_focus_out}
																				  on_trip_item_add_click={this.props.on_trip_item_add_click}
																				  on_trip_item_corresponds_change={this.props.on_trip_item_corresponds_change}
																				  on_trip_item_X_click={this.props.on_trip_item_X_click}
																				  on_trip_notes_focus_out={this.props.on_trip_notes_focus_out}
																				  on_trip_item_change_success={this.props.on_trip_item_change_success}
																	/>)

		return(
			<div>
				<h2>Shopping Trips</h2>
				<br/>
				<button type="button" className="btn btn-success addNew" onClick={this.props.on_trips_add_click}>Add New</button>
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
								        	<option value="service">Service</option>
											<option value="store">Store</option>
											<option value="date">Date</option>
											<option value="status">Status</option>
								      	</Form.Control>
								    </Col>
							    </Row>
						    </Form.Group>
				</div>
				{ShoppingTrips}
			</div>
		)
	}
}

export default ShoppingTrips