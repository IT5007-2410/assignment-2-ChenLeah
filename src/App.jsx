/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    bookingTime: new Date(),
    from:'Singapore',
    to: 'Thailand',
    trainNum:'TR123'
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    bookingTime: new Date(),
    from:'Singapore',
    to: 'Thailand',
    trainNum:'TR123'
  },
];


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
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    console.log(form.travellername.value);
    //code to delete the travelar
    this.props.deletefunction(form.travellername.value);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
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
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    console.log("delete traveller name:",passenger);
    // actual deletion
    var newlist=[]
    this.state.travellers.forEach(element=>{
      if (element.name!=passenger){newlist.push(element)}
    });
    this.setState({travellers:newlist});
    console.log(newlist);
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
    {this.state.selector==1 && <Homepage/>}
		{/*Q3. Code to call component that Displays Travellers.*/}
		{this.state.selector==2 && <Display travellers={this.state.travellers}/>}
		{/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector==3 && <Add/>}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector==4 && <Delete deletefunction= {this.deleteTraveller}/>}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
