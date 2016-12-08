class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, board: props.board};

    this.toggleEdit = this.toggleEdit.bind(this);
    this.editBoard = this.editBoard.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

// Edit is happening on the card itself. It doesn't need to talk to the main
  toggleEdit(e) {
    if(e != undefined) {
    e.preventDefault();
  }
    this.setState({ edit: !this.state.edit });
  }


// all edit stuff in this component (BOARD.js)
  editBoard(e) {
    let boardName = this.refs.boardName;
    e.preventDefault();

    $.ajax({
      url: `/boards/${this.props.board.id}`,
      type: 'PUT',
      data: { board: { name: boardName.value } },
      dataType: 'JSON'
    }).success(board => {
      this.setState({ board });
      this.toggleEdit();
      // console.log(data);
    }).fail(data => {
      console.log(data);
    });
  }

  nameDisplay() {
    let board = this.state.board

    if(this.state.edit) {
      return(
        <form ref='editForm' onSubmit={this.editBoard}>
          <input
            type='text'
            defaultValue={board.name}
            required
            placeholder="Board Name"
            ref="boardName"
            />
            <input type='submit' className='btn orange' />
        </form>
      )
    } else {
      // we took this out of the card and replaced it with {this.nameDisplay()}
      return(<span className="card-title">{board.name}</span>);
    }
  }

// setBoardId must be called on main
  render() {
    let board = this.state.board;
    return(
      <div className="col s12 m4">
        <div className="card grey darken-4">
          <div className="card-content white-text">
            { this.nameDisplay() }
            <p></p>
          </div>
            <div className="card-action">
              <a onClick={() => this.props.setBoardId(board.id) } className='modal-trigger' href='#show-modal'>Show</a>
              <a href="#" onClick={ this.toggleEdit }>Edit</a>
              <a href="#" onClick={(e) => this.props.deleteBoard(e, board.id)}>Delete</a>
          </div>
        </div>
      </div>
    );
  }
}
