import React from "react"
import EditableLabel from 'react-inline-edition';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import TripItem from './TripItem'


class ShoppingTrip extends React.Component {

	constructor(props){
      super(props)

      this.handle_name_focus_out = this.handle_name_focus_out.bind(this)
      this.handle_service_focus_out = this.handle_service_focus_out.bind(this)
      this.handle_store_focus_out = this.handle_store_focus_out.bind(this)
      this.handle_method_focus_out = this.handle_method_focus_out.bind(this)
      this.handle_date_focus_out = this.handle_date_focus_out.bind(this)
      this.handle_estimated_cost_focus_out = this.handle_estimated_cost_focus_out.bind(this)
      this.handle_status_change = this.handle_status_change.bind(this)
      this.handle_X_click = this.handle_X_click.bind(this)
	  this.handle_add_trip_item_click = this.handle_add_trip_item_click.bind(this)
	  this.handle_notes_focus_out = this.handle_notes_focus_out.bind(this)
	  this.get_background_color = this.get_background_color.bind(this)
  	}
	
  	handle_name_focus_out(text){
  		this.props.on_trip_name_focus_out(text, this.props.id)
  	}

  	handle_service_focus_out(text){
  		this.props.on_trip_service_focus_out(text, this.props.id)
  	}

  	handle_store_focus_out(text){
  		this.props.on_trip_store_focus_out(text, this.props.id)
  	}

  	handle_method_focus_out(text){
  		this.props.on_trip_method_focus_out(text, this.props.id)
  	}

  	handle_date_focus_out(text){
  		this.props.on_trip_date_focus_out(text, this.props.id)
  	}

  	handle_estimated_cost_focus_out(text){
  		this.props.on_trip_estimated_cost_focus_out(text, this.props.id)
  	}

	handle_notes_focus_out(text){
		this.props.on_trip_notes_focus_out(text, this.props.id)
	}

  	handle_status_change(event) {
    	console.log("Status changed to: " + event.target.value)
    	this.props.on_trips_change_status(event.target.value, this.props.id)
    }

    // Used to delete item
    handle_X_click() {
    	console.log("click")
    	this.props.on_trips_X_click(this.props.id)
    }

    handle_add_trip_item_click() {
    	this.props.on_trip_item_add_click(this.props.id)
    }

	// Returns background color based on status
    get_background_color(){
    	switch (this.props.status){
    		case "in_process":
    			return "#ffffff"
    		case "finished":
    			return "#edffed"
    		case "cancelled":
    			return "#ffebeb"
    		default:
    			return "#ffffff"
    	}
    }


	render() {

		const trip_items_as_table = this.props.trip_items.map((item, index) => {
			return(
				<TripItem key={item.id} 
						  id={item.id}
						  index={index}
						  trip_id={this.props.id} 
						  name={item.name} 
						  corresponds_id={item.corresponds_id}
						  shopping_list={this.props.shopping_list}
						  success={item.success}
						  on_trip_item_focus_out={this.props.on_trip_item_focus_out}
						  on_trip_item_corresponds_change={this.props.on_trip_item_corresponds_change}
						  on_trip_item_X_click={this.props.on_trip_item_X_click}
						  on_trip_item_change_success={this.props.on_trip_item_change_success}
				/>
			)
		})

		return(
			<div>
				<div className="card shoppingTrip" style={{backgroundColor: this.get_background_color()}}>
					<div className="card-body">
						<h4 className="card-title">
							<div className="d-flex justify-content-between">
								<div><b>{this.props.name}</b></div>
								<div>
									<button type="button" onClick={this.handle_X_click} className="inventoryXButton btn btn-sm btn-outline-danger">✕</button>
								</div>
							</div>
						</h4>
						<div className="d-flex flex-row">
							<b>Service:&nbsp;</b> 
							<EditableLabel text={this.props.service}
					                	onFocusOut={this.handle_service_focus_out}
					        /> 
					    </div>
					    <div className="d-flex flex-row">
							<b>Store:&nbsp;</b> 
							<EditableLabel text={this.props.store}
					                	onFocusOut={this.handle_store_focus_out}
					        /> 
					    </div>
						<div className="d-flex flex-row">
							<b>Method:&nbsp;</b> 
							<EditableLabel text={this.props.method}
					                	onFocusOut={this.handle_method_focus_out}
					        /> 
					    </div>						
						<div className="d-flex flex-row">
							<b>Date:&nbsp;</b> 
							<EditableLabel text={this.props.date}
					                	onFocusOut={this.handle_date_focus_out}
					        /> 
					    </div>						
						<div className="d-flex flex-row">
							<b>Estimated Cost:&nbsp;</b> 
							<EditableLabel text={this.props.estimated_cost}
					                	onFocusOut={this.handle_estimated_cost_focus_out}
					        /> 
					    </div>
						<div className="d-flex flex-row">
							<b>Notes:&nbsp;</b> 
							<EditableLabel text={this.props.notes}
					                	onFocusOut={this.handle_notes_focus_out}
					        /> 
					    </div>
					    <div className="priorityInput">
							<Form.Group controlId="exampleForm.ControlSelect1">
								<Row>
									<Col sm={2}>
								      	<Form.Label><b>Status:</b></Form.Label>
								    </Col>
								   	<Col sm={4}>
								      	<Form.Control size="sm" as="select" defaultValue={this.props.status} onChange={this.handle_status_change}>
								        	<option value="in_process">In Process</option>
								        	<option value="finished">Finished</option>
								        	<option value="cancelled">Cancelled</option>
								      	</Form.Control>
								    </Col>
							    </Row>
						    </Form.Group>
					   	</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">
										<button type="button" className="btn btn-success addNew" onClick={this.handle_add_trip_item_click}>Add</button>
									</th>
									<th scope="col">Trip Item</th>
									<th scope="col">List Item</th>
									<th scope="col">Success</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								{trip_items_as_table}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default ShoppingTrip
