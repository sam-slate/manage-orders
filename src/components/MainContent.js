import React from "react"
import Header from "./Header"
import Inventory from "./Inventory"
import ShoppingList from "./ShoppingList"
import ShoppingTrips from "./ShoppingTrips"

const SERVER_DOMAIN = "http://localhost:9000"

class MainContent extends React.Component {

	constructor(props) {
		console.log("Running main content constructor")

		super(props)

		this.on_inventory_list_focus_out = this.on_inventory_list_focus_out.bind(this)
		this.on_inventory_location_focus_out = this.on_inventory_location_focus_out.bind(this)
		this.on_inventory_notes_focus_out = this.on_inventory_notes_focus_out.bind(this)
      	this.on_inventory_X_click = this.on_inventory_X_click.bind(this)
      	this.on_inventory_add_click = this.on_inventory_add_click.bind(this)
      	this.on_inventory_arrow_click = this.on_inventory_arrow_click.bind(this)

      	this.prepare_shopping_list = this.prepare_shopping_list.bind(this)
		this.on_shopping_list_focus_out = this.on_shopping_list_focus_out.bind(this)
		this.on_shopping_list_notes_focus_out = this.on_shopping_list_notes_focus_out.bind(this)
      	this.on_shopping_arrow_click = this.on_shopping_arrow_click.bind(this)
      	this.on_shopping_X_click = this.on_shopping_X_click.bind(this)
      	this.on_shopping_add_click = this.on_shopping_add_click.bind(this)
      	this.add_shopping = this.add_shopping.bind(this)
      	this.on_shopping_change_priority = this.on_shopping_change_priority.bind(this)

      	this.on_trip_name_focus_out = this.on_trip_name_focus_out.bind(this)
      	this.on_trip_service_focus_out = this.on_trip_service_focus_out.bind(this)
      	this.on_trip_store_focus_out = this.on_trip_store_focus_out.bind(this)
      	this.on_trip_method_focus_out = this.on_trip_method_focus_out.bind(this)
      	this.on_trip_date_focus_out = this.on_trip_date_focus_out.bind(this)
      	this.on_trip_estimated_cost_focus_out = this.on_trip_estimated_cost_focus_out.bind(this)
      	this.on_trips_change_status = this.on_trips_change_status.bind(this)
      	this.on_trips_X_click = this.on_trips_X_click.bind(this)
      	this.on_trips_add_click = this.on_trips_add_click.bind(this)
      	this.on_trip_item_focus_out = this.on_trip_item_focus_out.bind(this)
      	this.on_trip_item_add_click = this.on_trip_item_add_click.bind(this)
      	this.on_trip_item_corresponds_change = this.on_trip_item_corresponds_change.bind(this)
		this.on_trip_item_X_click = this.on_trip_item_X_click.bind(this)
		this.on_trip_item_change_success =   this.on_trip_item_change_success.bind(this)
		this.on_trip_notes_focus_out = this.on_trip_notes_focus_out.bind(this)

		this.save_inventory = this.save_inventory.bind(this)
		this.save_shopping_list = this.save_shopping_list.bind(this)
		this.save_shopping_trips = this.save_shopping_trips.bind(this)
		this.save_all = this.save_all.bind(this)
		this.on_save_button_click = this.on_save_button_click.bind(this)

		this.state = {
			inventory: [],
			max_inventory_ID: 0,
			shopping_list: [],
			max_shopping_list_ID: 0,
			shopping_trips: [],
			max_shopping_trip_ID: 0,
			max_shopping_trip_item_ID: 0,
			save_text: "Save"
		}
	}

	componentDidMount() {
		fetch(SERVER_DOMAIN + "/api/inventory")
		  .then(res => res.json())
		  .then(
			(result) => {
				var inventory = result

				// get highest inventory ID
				var max_inventory_ID = Math.max.apply(null, inventory.map(item => parseInt(item.id)))
				if (max_inventory_ID === -Infinity) {max_inventory_ID = 0} 
				console.log("Highest inventory ID: " + max_inventory_ID)

				var new_state = this.state
				new_state.inventory = inventory
				new_state.max_inventory_ID = max_inventory_ID
				this.setState(new_state)
			},
			(error) => {
			  console.log(error)
			}
		  )

		fetch(SERVER_DOMAIN + "/api/shopping_list")
		  .then(res => res.json())
		  .then(
			(result) => {
				var shopping_list = result
				console.log("In get shopping list")
				console.log(shopping_list)

				// get highest shopping list ID 
				var max_shopping_list_ID = Math.max.apply(null, shopping_list.map(item => parseInt(item.id)))
				if (max_shopping_list_ID === -Infinity) {max_shopping_list_ID = 0} 
				console.log("Highest shopping list ID: " + max_shopping_list_ID)

				var new_state = this.state
				new_state.shopping_list = shopping_list
				new_state.max_shopping_list_ID = max_shopping_list_ID
				this.setState(new_state)
			},
			(error) => {
			  console.log(error)
			}
		  ).then(
			// Make sure the shopping list is loaded before retrieving the shopping trips
			fetch(SERVER_DOMAIN + "/api/shopping_trips")
			.then(res => res.json())
			.then(
				(result) => {
					var shopping_trips = result

					// get highest shopping trip ID
					var max_shopping_trip_ID = Math.max.apply(null, shopping_trips.map(item => parseInt(item.id)))
					if (max_shopping_trip_ID === -Infinity) {max_shopping_trip_ID = 0} 
					console.log("Highest shopping list ID: " + max_shopping_trip_ID)
		
					// get highest shopping trip item ID (all trip items use the same ID counter)
		
					var shopping_trip_items = shopping_trips.reduce((item_list, trip) => item_list.concat(trip.trip_items), [])
					var shopping_trip_item_IDs = shopping_trip_items.map(item => item.id)
					var max_shopping_trip_item_ID = Math.max.apply(null, shopping_trip_item_IDs)
					if (max_shopping_trip_item_ID === -Infinity) {max_shopping_trip_item_ID = 0} 
		
					var new_state = this.state
					new_state.shopping_trips = shopping_trips
					new_state.max_shopping_trip_ID = max_shopping_trip_ID
					new_state.max_shopping_trip_item_ID = max_shopping_trip_item_ID
					this.setState(new_state)
				},
				(error) => {
				console.log(error)
				}
			)
		  )
	  }

	/* Save functions */

	async save_inventory(){
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state.inventory)
		};
		return fetch(SERVER_DOMAIN + "/api/inventory", requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				return data
			});
	}

	async save_shopping_list(){
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state.shopping_list)
		};
		return fetch(SERVER_DOMAIN + "/api/shopping_list", requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				return data
			});
	}
	
	async save_shopping_trips(){
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state.shopping_trips)
		};
		return fetch(SERVER_DOMAIN + "/api/shopping_trips", requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				return data
			});
	}

	save_all(){
		return Promise.all([this.save_inventory(), this.save_shopping_list(), this.save_shopping_trips()])
	}

	on_save_button_click(){
		this.save_all().then(values => {
			console.log(values)

			if(values.every(item => item)){
				console.log("Saved succesfully")
				var new_state = this.state
				new_state.save_text = "Success!"
				this.setState(new_state)

				setTimeout(() => {
					var new_state = this.state
					new_state.save_text = "Save"
					this.setState(new_state)
				}, 2000);
			} else {
				console.log("Saved succesfully")
				var new_state = this.state
				new_state.save_text = "Error"
				this.setState(new_state)

				setTimeout(() => {
					var new_state = this.state
					new_state.save_text = "Save"
					this.setState(new_state)
				}, 2000);
			}
		})

		
	}

	/* Shopping Trip functions */

	on_trip_name_focus_out(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].name = text

		var new_state = this.state
		new_state.shopping_trips= new_shopping_trips
		this.setState(new_state)
	}

	on_trip_service_focus_out(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].service = text

		var new_state = this.state
		new_state.shopping_trips= new_shopping_trips
		this.setState(new_state)
	}

	on_trip_store_focus_out(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].store = text

		var new_state = this.state
		new_state.shopping_trips= new_shopping_trips
		this.setState(new_state)
	}

	on_trip_method_focus_out(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].method = text

		var new_state = this.state
		new_state.shopping_trips= new_shopping_trips
		this.setState(new_state)
	}

	on_trip_date_focus_out(text, id){

		//Check if valid date
		const date_regex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
		if (date_regex.test(text)){
			var new_shopping_trips = this.state.shopping_trips
			var index = new_shopping_trips.findIndex(element => element.id === id)
			new_shopping_trips[index].date = text

			var new_state = this.state
			new_state.shopping_trips= new_shopping_trips
			this.setState(new_state)
		}
	}

	on_trip_estimated_cost_focus_out(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].estimated_cost = text

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)
	}

	on_trip_notes_focus_out(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].notes = text

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)
	}

	on_trips_change_status(text, id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips[index].status = text

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)
	}

	on_trips_X_click(id){
		var new_shopping_trips = this.state.shopping_trips
		var new_shopping_list = this.state.shopping_list

		// Delete shopping trip
		var index = new_shopping_trips.findIndex(element => element.id === id)
		new_shopping_trips.splice(index, 1)


		// Deletes shopping trip from any shopping list
		new_shopping_list = new_shopping_list.map((item) => {
			//Filter the trip IDs
			item.trips = item.trips.filter((trip) => {
				// Check if the shopping trip has the same ID
				return (trip.id !== id)
			})
			return item
		})

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		new_state.shopping_list = new_shopping_list
		this.setState(new_state)
	}

	on_trips_add_click(){
		var new_shopping_trips = this.state.shopping_trips
		var new_id = this.state.max_shopping_trip_ID + 1

		// Add new trip to the inventory
		new_shopping_trips.unshift({id: new_id, 
									name: "Trip " + new_id, 
									service: "insert service",
									store: "insert store",
									method: "insert method",
									date: "mm/dd/yyyy",
									status: "in process",
									estimated_cost: "$",
									notes: "insert notes", 
									trip_items: [] 
									})

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		new_state.max_shopping_trip_ID = new_id
		this.setState(new_state)
	}

	on_trip_item_add_click(trip_id){
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_trips.findIndex(element => element.id === trip_id)

		var new_item_id = this.state.max_shopping_trip_item_ID + 1

		// Add new trip item to the trip
		new_shopping_trips[index].trip_items.push({id:new_item_id, name: "insert name", 
													  corresponds_id: -1, success:false})

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		new_state.max_shopping_trip_item_ID = new_item_id
		this.setState(new_state)
	}

	on_trip_item_focus_out(text, item_id, trip_id){
		var new_shopping_trips = this.state.shopping_trips
		var trips_index = new_shopping_trips.findIndex(element => element.id === trip_id)
		var item_index = new_shopping_trips[trips_index].trip_items.findIndex(element => element.id === item_id)
		new_shopping_trips[trips_index].trip_items[item_index].name = text

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)

	}


	on_trip_item_corresponds_change(text, trip_item_id, old_list_item_id, trip_id){
		
		var new_shopping_trips = this.state.shopping_trips
		var new_shopping_list = this.state.shopping_list

		// Find the relevent trip index based on id
		var trips_index = new_shopping_trips.findIndex(element => element.id === trip_id)

		//Finds the relevant trip item index based on id
		var trip_item_index = new_shopping_trips[trips_index].trip_items.findIndex(element => element.id === trip_item_id)

		console.log("Trip id: " + trip_id)

		// Set the default to the none option
		var new_list_item_id = -1

		// Check if none is not selected
		if (text !== "none"){
			// Find the relevant shopping list item index based on its id
			var list_index = new_shopping_list.findIndex(element => element.id === parseInt(text))

			console.log("Text is: " + text)
			console.log("List index is: ")
			// Retrieves the id of the shopping list item from index
			new_list_item_id = new_shopping_list[list_index].id

			//Add the trip index to the trips list
			new_shopping_list[list_index].trips.push({id:trip_id})
		} 

		// Sets the corresponding ID of the shopping trip item to the new ID
		new_shopping_trips[trips_index].trip_items[trip_item_index].corresponds_id = new_list_item_id

		// Remove the trip id from the old list item
		if (old_list_item_id !== -1){
			console.log("Not none!")
			// Find the relevant shopping list item index based on its index
			var old_list_index = new_shopping_list.findIndex(element => element.id === old_list_item_id)
			console.log("Old list index is: " + old_list_index)

			console.log(new_shopping_list[old_list_index].trips)

			// Find the index of the trip in the old list
			var trip_in_old_list_index = new_shopping_list[old_list_index].trips.findIndex(element => element.id === trip_id)
			console.log("Trip in old list index: " + trip_in_old_list_index)
			// Remove the trip id
			if (trip_in_old_list_index !== -1){
				new_shopping_list[old_list_index].trips.splice(trip_in_old_list_index, 1)
			}
		}

		var new_state = this.state
		new_state.shopping_list = new_shopping_list
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)
	}

	on_trip_item_X_click(item_id, corresponding_item_id, trip_id){
		var new_shopping_trips = this.state.shopping_trips
		var new_shopping_list = this.state.shopping_list
		var trips_index = new_shopping_trips.findIndex(element => element.id === trip_id)
		var trip_item_index = new_shopping_trips[trips_index].trip_items.findIndex(element => element.id === item_id)
		new_shopping_trips[trips_index].trip_items.splice(trip_item_index, 1)

		// Remove the trip id from the old list item
		if (corresponding_item_id !== -1){
			console.log("Not none!")
			// Find the relevant shopping list item index based on its index
			var old_list_index = new_shopping_list.findIndex(element => element.id === corresponding_item_id)
			console.log("Old list index is: " + old_list_index)

			console.log(new_shopping_list[old_list_index].trips)

			// Find the index of the trip in the old list
			var trip_in_old_list_index = new_shopping_list[old_list_index].trips.findIndex(element => element.id === trip_id)
			console.log("Trip in old list index: " + trip_in_old_list_index)
			// Remove the trip id
			if (trip_in_old_list_index !== -1){
				new_shopping_list[old_list_index].trips.splice(trip_in_old_list_index, 1)
			}
		}

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		new_state.shopping_list = new_shopping_list
		this.setState(new_state)
	}

	on_trip_item_change_success(item_id, trip_id){
		var new_shopping_trips = this.state.shopping_trips
		var trips_index = new_shopping_trips.findIndex(element => element.id === trip_id)
		var item_index = new_shopping_trips[trips_index].trip_items.findIndex(element => element.id === item_id)
		
		new_shopping_trips[trips_index].trip_items[item_index].success = ! new_shopping_trips[trips_index].trip_items[item_index].success

		var new_state = this.state
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)
	}

	/* Shopping List functions */

	prepare_shopping_list(){
		console.log("In prepare shopping list")

		/* Converts the IDs of shopping trips to their names */ 

		var prepared_shopping_list = JSON.parse(JSON.stringify(this.state.shopping_list))
		// Maps over the shopping list
		prepared_shopping_list = prepared_shopping_list.map((item) => {
			var new_item = item

			// Reduces over the trip IDs
			new_item.trips = new_item.trips.reduce((result, trip) => {
				// For each trip ID, finds the name from the shopping trip
				var index = this.state.shopping_trips.findIndex(element => element.id === trip.id)
				
				// Check if the shopping trip doesn't exist or is cancelled or finished
				if (index === -1 || this.state.shopping_trips[index].status === "cancelled" || this.state.shopping_trips[index].status === "finished"){
					// If so, skip it
					return result
				}

				var name = this.state.shopping_trips[index].name
				result.push({name:name})
				return result
			}, [])

			console.log(new_item)

			return new_item
		})
		
		return prepared_shopping_list
	}

	on_shopping_list_focus_out(text, id){
		console.log(text)
		console.log(id)
		var new_shopping_list = this.state.shopping_list
		var index = new_shopping_list.findIndex(element => element.id === id)
		console.log(index)
		new_shopping_list[index].name = text

		var new_state = this.state
		new_state.shopping_list= new_shopping_list
		this.setState(new_state)
	}

	on_shopping_list_notes_focus_out(text, id){
		var new_shopping_list = this.state.shopping_list
		var index = new_shopping_list.findIndex(element => element.id === id)
		new_shopping_list[index].notes = text

		var new_state = this.state
		new_state.shopping_list= new_shopping_list
		this.setState(new_state)
	}

	on_shopping_arrow_click(id){
		var index = this.state.shopping_list.findIndex(element => element.id === id)
		this.add_inventory(this.state.shopping_list[index].name, this.state.shopping_list[index].notes)

		this.on_shopping_X_click(id)
	}

	on_shopping_X_click(id){
		console.log("In shopping X click")
		console.log(id)
		var new_shopping_list = this.state.shopping_list
		var new_shopping_trips = this.state.shopping_trips
		var index = new_shopping_list.findIndex(element => element.id === id)
		console.log(index)
		new_shopping_list.splice(index, 1)

		/* Delete instances of the item in shopping trips */

		for (var trip of new_shopping_trips){
			trip.trip_items.map(item => {
				if(item.corresponds_id === id){
					item.corresponds_id = -1
				}

				return item
			})
		}

		var new_state = this.state
		new_state.shopping_list = new_shopping_list
		new_state.shopping_trips = new_shopping_trips
		this.setState(new_state)
	}

	add_shopping(name, trips, priority, notes){
		var new_shopping_list = this.state.shopping_list
		var new_id = this.state.max_shopping_list_ID + 1

		// Add new item to the inventory
		new_shopping_list.unshift({id: new_id, name: name, trips: trips, priority: priority, notes: notes})

		var new_state = this.state
		new_state.shopping_list = new_shopping_list
		new_state.max_shopping_list_ID = new_id
		this.setState(new_state)
	}

	on_shopping_add_click(){
		this.add_shopping("new item", [], "medium", "insert note")
	}

	on_shopping_change_priority(priority, id){
		var new_shopping_list = this.state.shopping_list
		var index = new_shopping_list.findIndex(element => element.id === id)
		console.log(index)
		new_shopping_list[index].priority = priority

		var new_state = this.state
		new_state.shopping_list= new_shopping_list
		this.setState(new_state)
	}

	/* Inventory List functions */


	on_inventory_list_focus_out(text, id){
		console.log(text)
		console.log(id)
		var new_inventory = this.state.inventory
		var index = new_inventory.findIndex(element => element.id === id)
		console.log(index)
		new_inventory[index].name = text

		var new_state = this.state
		new_state.inventory = new_inventory
		this.setState(new_state)
	}

	on_inventory_location_focus_out(text, id){
		var new_inventory = this.state.inventory
		var index = new_inventory.findIndex(element => element.id === id)
		console.log(index)
		new_inventory[index].location = text

		var new_state = this.state
		new_state.inventory = new_inventory
		this.setState(new_state)
	}

	on_inventory_notes_focus_out(text, id){
		var new_inventory = this.state.inventory
		var index = new_inventory.findIndex(element => element.id === id)
		console.log(index)
		new_inventory[index].notes = text

		var new_state = this.state
		new_state.inventory = new_inventory
		this.setState(new_state)
	}

	on_inventory_X_click(id){
		console.log(id)
		var new_inventory = this.state.inventory
		var index = new_inventory.findIndex(element => element.id === id)
		console.log(index)
		new_inventory.splice(index, 1)

		var new_state = this.state
		new_state.inventory = new_inventory
		this.setState(new_state)
	}

	on_inventory_add_click(){
		this.add_inventory("new item", "insert note")
	}

	on_inventory_arrow_click(id){
		var index = this.state.inventory.findIndex(element => element.id === id)
		this.add_shopping(this.state.inventory[index].name, [], "medium", this.state.inventory[index].notes)

		this.on_inventory_X_click(id)
	}

	add_inventory(name, notes){
		var new_inventory = this.state.inventory
		var new_id = this.state.max_inventory_ID + 1

		// Add new item to the inventory
		new_inventory.unshift({id: new_id, name: name, location: "insert location", notes: notes})

		var new_state = this.state
		new_state.inventory = new_inventory
		new_state.max_inventory_ID = new_id
		this.setState(new_state)
	}

	render() {
		console.log(this.state)

		return(
			<div>
				<div className="container">
					<Header on_save_button_click={this.on_save_button_click} save_text={this.state.save_text}/>
				</div>
				<div className="container">
				    <div className ="row">
				    	<div className="col-3">
							<Inventory inventory={this.state.inventory}
									   on_inventory_list_focus={this.on_inventory_list_focus}
									   on_inventory_list_focus_out={this.on_inventory_list_focus_out}
									   on_inventory_X_click={this.on_inventory_X_click}
									   on_inventory_add_click={this.on_inventory_add_click}
									   on_inventory_arrow_click={this.on_inventory_arrow_click}
									   on_inventory_location_focus_out={this.on_inventory_location_focus_out}
									   on_inventory_notes_focus_out={this.on_inventory_notes_focus_out}
							/>
						</div>
				    	<div className="col-3">
							<ShoppingList shopping_list={this.prepare_shopping_list()}
										  on_shopping_list_focus={this.on_shopping_list_focus}
										  on_shopping_list_focus_out={this.on_shopping_list_focus_out}
									      on_shopping_X_click={this.on_shopping_X_click}
									      on_shopping_add_click={this.on_shopping_add_click}
									      on_shopping_arrow_click={this.on_shopping_arrow_click}
										  on_shopping_change_priority={this.on_shopping_change_priority}
										  on_shopping_list_notes_focus_out={this.on_shopping_list_notes_focus_out}
							/>
						</div>
				    	<div className="col-6">
							<ShoppingTrips shopping_trips={this.state.shopping_trips}
										   shopping_list={this.state.shopping_list}
										   on_trip_name_focus_out={this.on_trip_name_focus_out}
										   on_trip_service_focus_out={this.on_trip_service_focus_out}
										   on_trip_store_focus_out={this.on_trip_store_focus_out}
										   on_trip_method_focus_out={this.on_trip_method_focus_out}
										   on_trip_date_focus_out={this.on_trip_date_focus_out}
										   on_trip_estimated_cost_focus_out={this.on_trip_estimated_cost_focus_out}
										   on_trips_change_status={this.on_trips_change_status}
										   on_trips_X_click={this.on_trips_X_click}
										   on_trips_add_click={this.on_trips_add_click}
										   on_trip_item_focus_out={this.on_trip_item_focus_out}
										   on_trip_item_add_click={this.on_trip_item_add_click}
										   on_trip_item_corresponds_change={this.on_trip_item_corresponds_change}
										   on_trip_item_X_click={this.on_trip_item_X_click}
										   on_trip_notes_focus_out={this.on_trip_notes_focus_out}
										   on_trip_item_change_success={this.on_trip_item_change_success}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MainContent
