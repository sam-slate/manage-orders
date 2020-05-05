import React from "react"
import EditableLabel from 'react-inline-editing'
import Form from 'react-bootstrap/Form'


class TripItem extends React.Component{

	constructor(props){
		super(props)
		this.handle_trip_item_focus_out = this.handle_trip_item_focus_out.bind(this)
		this.handle_list_item_change = this.handle_list_item_change.bind(this)
		this.handle_X_click = this.handle_X_click.bind(this)
		this.handle_change_success = this.handle_change_success.bind(this)
	}

	handle_trip_item_focus_out(text){
		this.props.on_trip_item_focus_out(text, this.props.id, this.props.trip_id)
	}

	handle_list_item_change(event){
		this.props.on_trip_item_corresponds_change(event.target.value, this.props.id, this.props.corresponds_id, this.props.trip_id)
	}

	handle_X_click(){
		this.props.on_trip_item_X_click(this.props.id, this.props.corresponds_id, this.props.trip_id)
	}

	handle_change_success(event){
		this.props.on_trip_item_change_success(this.props.id, this.props.trip_id)
	}

	get_corresponds_name(){
		// Get the name of the corresponding shopping list item, 
		// -1 is the id for no corresponding shopping list item
		var corresponds_name = "None"
		if (this.props.corresponds_id !== -1){
			console.log(this.props.name)
			console.log("Corresponding id: " + this.props.corresponds_id)
			var index = this.props.shopping_list.findIndex(element => element.id === this.props.corresponds_id)
			console.log("Corresponding index: " + index)
			if(index !== -1){
				corresponds_name = this.props.shopping_list[index].name
				console.log("Corresponding name: " + corresponds_name)
			}
		}

		return corresponds_name
	}

	render(){

		// Get the list of components for the corresponding shopping list item option
		const shopping_list_options = this.props.shopping_list.map(item=>{
			return(<option key={item.id} value={item.id}>{item.name}</option>)
		})


		return(
		<tr>
			<th scope="row">{this.props.index + 1}</th>
			<td>
				<EditableLabel text={this.props.name !== "" ? this.props.name : "_"}
							   inputWidth='120px'
					           onFocusOut={this.handle_trip_item_focus_out}/>
			</td>
			<td>
					<Form.Control size="sm" as="select" onChange={this.handle_list_item_change}>
						<option value="" selected hidden>{this.get_corresponds_name()}</option>
						<option value="none">None</option>
						{shopping_list_options}
					</Form.Control>
			</td>
			<td>
				<div className="d-flex justify-content-center">
					<Form>
						<Form.Check 
							type="switch"
							id={this.props.id}
							onChange={this.handle_change_success}
							checked={this.props.success}
							label=""
						/>
					</Form>
				</div>
			</td>
			<td>
				<button type="button" onClick={this.handle_X_click} className="inventoryXButton btn btn-sm btn-outline-danger">✕</button>
			</td>
		</tr>


		)
	}
}

export default TripItem