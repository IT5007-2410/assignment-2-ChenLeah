/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 3421029332933, 
    name: 'Jack', 
    phone: 88885555,
    bookingTime: new Date(),
    from:'Singapore',
    to: 'Thailand',
    trainNum:'TR123'
  },
  {
    id: 2929505942041, 
    name: 'Rose', 
    phone: 88884444,
    bookingTime: new Date(),
    from:'Singapore',
    to: 'Thailand',
    trainNum:'TR123'
  },
];
const initialTrains = [
  {
    id:"TR123",
    type:"Express",
    totalSeats: 10,
    freeSeats: 8,
  },
  {
    id:"TR456",
    type:"Express",
    totalSeats: 10,
    freeSeats: 10,
  },
  {
    id:"TR789",
    type:"Express",
    totalSeats: 10,
    freeSeats: 10,
  },
]


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const {traveller} = props;
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{new Date(traveller.bookingTime).toLocaleString()}</td>
      <td>{traveller.from}</td>
      <td>{traveller.to}</td>
      <td>{traveller.trainNum}</td>
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>From</th>
          <th>To</th>
          <th>Train Number</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => <TravellerRow key={traveller.id} traveller={traveller} />)}
        {/*Note: key prop is not passed as a prop, but for React's internal use.*/}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const newBooking={
      id: Date.now(),
      name:e.target.name.value,
      phone: parseInt(e.target.phone.value, 10),
      from:e.target.from.value,
      to:e.target.to.value,
      trainNum:e.target.trainNum.value,
      bookingTime: new Date()
    }
    this.props.addfunction(newBooking);
    e.target.reset();
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="phone" placeholder="Phone Number" />
        <select
          name="from"
          required
        >
          <option value="">From</option>
          <option value="Singapore">Singapore</option>
          <option value="Thailand">Thailand</option>
        </select>
        <select
          name="to"
          required
        >
          <option value="">To</option>
          <option value="Singapore">Singapore</option>
          <option value="Thailand">Thailand</option>
        </select>
        <select
          name="trainNum"
          required
        >
          <option value="">Select Train Number</option>
          {this.props.trains.map((train) => (
            <option
              key={train.id}
              value={train.id}
              disabled={train.freeSeats === 0} // Disable if no free seats
            >
              {train.id} {train.freeSeats === 0 ? "(No Seats Available)" : ""}
            </option>
          ))}
        </select>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.state = { searchName: '', matchingTravellers: [], selectedTravellerId: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const selectedId=this.state.selectedTravellerId;
    console.log(selectedId);
    //code to delete the travelar
    this.props.deletefunction(selectedId);
  }

  handleSearch(e){
    e.preventDefault();
    const searchName = this.state.searchName.trim().toLowerCase();
    // console.log(searchName);
    // Find matching travellers by name (case-insensitive)
    const matchingTravellers= this.props.travellers.filter((traveller) =>
      traveller.name.toLowerCase().includes(searchName)
    );
    // console.log(matchingTravellers);
    this.setState({ matchingTravellers, selectedTravellerId: '' });
  }

  handleSelect(e){
    this.setState({ selectedTravellerId: e.target.value});
  }

  render() {
    return (
      <div>
        <form name="searchTraveller" onSubmit={this.handleSearch}>
          <input type="text" 
            name="travellername" 
            value={this.state.searchName} 
            placeholder="Enter Traveller Name" 
            onChange={(e)=> this.setState({searchName:e.target.value})} 
          />
          <button>Search</button>
        </form>

        {this.state.matchingTravellers.length > 0 && (
          <form name="deleteTraveller" onSubmit={this.handleSubmit}>
            {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
            <label>Select a Traveller to Delete:</label>
            <select value={this.state.selectedTravellerId} onChange={this.handleSelect} required>
              <option value="">Select Traveller</option>
              {this.state.matchingTravellers.map((traveller) => (
                <option key={traveller.id} value={traveller.id}>
                  {traveller.name} (ID: {traveller.id}, Train: {traveller.trainNum})
                </option>
              ))}
            </select>
            <button>Delete</button>
          </form>
        )}
      </div>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
  this.state = {selectedTrainId:''};
  this.handleSelect = this.handleSelect.bind(this);
	}

  handleSelect(e){
    this.setState({selectedTrainId:e.target.value});
    //console.log(e.target.value);
  }

	render(){
    const selectedTrainData = this.props.trains.find(
      (train) => train.id === this.state.selectedTrainId
    );
    
    //just write inline css for simplification
    const seatStyles = {
      width: '20px',
      height: '20px',
      margin: '3px',
      borderRadius: '4px',
      display: 'inline-block',
    };

    const availableSeat = { ...seatStyles, backgroundColor: 'green' };
    const reservedSeat = { ...seatStyles, backgroundColor: 'grey' };

	return (
    <div>
      {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
      <h1> Train Seat Availability</h1>
      <select value={this.state.selectedTrainId} onChange={this.handleSelect}>
        <option value="">Select Train</option>
        {this.props.trains.map((train) => (
          <option key={train.id} value={train.id}>
            {train.id}
          </option>
        ))}
      </select>
    
      {selectedTrainData && (
        <div style={{ margin: '20px 0' }}>
          <p> Seat Available: {selectedTrainData.freeSeats} / {selectedTrainData.totalSeats}</p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            {Array(selectedTrainData.totalSeats)
              .fill()
              .map((_, index) => {
                const isAvailable = index < selectedTrainData.freeSeats;
                return (
                  <div
                    key={index}
                    style={{
                      ...isAvailable ? availableSeat : reservedSeat,
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}

    </div>);
	}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1, trains:[]};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    if (value=='Home'){this.setState({selector:1})}
    if (value=='Display'){this.setState({selector:2})}
    if (value=='Add'){this.setState({selector:3})}
    if (value=='Delete'){this.setState({selector:4})}
  }
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(){
    console.log(this.state.travellers);
    console.log(this.state.selector);
    console.log(this.state.trains);
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
      this.setState({ trains: initialTrains });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState({travellers: [...this.state.travellers, passenger]});
      this.setState({trains: this.state.trains.map(train => {
        if (train.id === passenger.trainNum) {
          return {
            ...train,
            freeSeats: train.freeSeats -= 1,
          };
        }
        return train;
      })});
  }

  deleteTraveller(travellerId) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("delete travellerId:",travellerId);
    // actual deletion
    var newlist=[]
    this.state.travellers.forEach(element=>{
      if (element.id!=travellerId){newlist.push(element)}
      else{
        this.state.trains.forEach(train=>{
          if (train.id==element.trainNum){
            train.freeSeats+=1;
          }
        });
      }
    });

    this.setState({travellers:newlist});
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
      <button onClick={()=> this.setSelector('Home')}>
        Home
      </button>
      <button onClick={()=> this.setSelector('Display')}>
        Display Traveller
      </button>
      <button onClick={()=> this.setSelector('Add')}>
        Add Traveller
      </button>
      <button onClick={()=> this.setSelector('Delete')}>
        Delete Traveller
      </button>
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
    {this.state.selector==1 && <Homepage trains={this.state.trains} />}
		{/*Q3. Code to call component that Displays Travellers.*/}
		{this.state.selector==2 && <Display travellers={this.state.travellers}/>}
		{/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector==3 && <Add addfunction={this.bookTraveller} trains={this.state.trains}/>}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector==4 && <Delete deletefunction= {this.deleteTraveller} travellers={this.state.travellers}/>}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
