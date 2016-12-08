class Boards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boards: props.boards };
  }

  render() {
    return(
      <div>
        <h1>Beer Boards</h1>
      </div>
    );
  }
}
