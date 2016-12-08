class AjaxBoards extends React.Component {
  constructor(props) {
    super(props);

    this.state = { boards: [], loading: true, boardId: null };

    this.addBoard= this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.setBoardId = this.setBoardId.bind(this);
  }


// Component Life-Cycle Functions
//--------------------------
// componentWillMount
// componentDidMount ** Most Common- successfully mounted on the page
// componentWillRecieveProps
// componentWillUpdate
// componentDidUpdate

  componentDidMount() {
    // Materialize componenet initialization
    // $('select').materialize-select();


    // Ajax calls to grab component data
    $.ajax({
      type: 'GET',
      url: './boards',
      dataType: 'JSON'
    }).success( boards => {
      //once we have data back, set state
      //console.log(data) to see data - with (data => after success... this.({ boards: data })
      this.setState({ boards, loading: false });
    }).fail(data => {
      // handle with alert or flash
      this.setState({ loading: false });
      console.log(data);
    });
  }

  setBoardId(boardId) {
    this.setState({ boardId });
  }

// deleteBoard from Board.js onclick delete button
  deleteBoard(e, id) {
    e.preventDefault();
    $.ajax({
      // interpolation = ``
      url: `/boards/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).success(data => {
      // FIGURE OUT HOW TO SET STATE AND REMOVE THAT BOARD
      let boards = this.state.boards;
      // id equals the id that was passed in above
      let index = boards.findIndex( b => b.id === id);
      // Will take out the chunk of the array -- jumping over the index we want to remove
      this.setState({
        boards:
        [
          ...boards.slice(0, index),
          ... boards.slice(index + 1, boards.length)
        ]
      });
    }).fail(data => {
      console.log(data);
    });
  }

  displayBoards() {
    let boards = this.state.boards;
    if(boards.length) {
    // LONG WAY OF MAP
    //   let reactBoards = [];
    //   for( let i = 0; i < boards.length; i++) {
    //     let board = boards[i];
    //     reactBoards.push(<Board key={board.id} board={board} />);
    //   }
    //   return reactBoards;
    // MAP WAY
    // second return pushes into map and first return is what is returned
    return boards.map( board => {
      return(<Board
              key={board.id}
              board={board}
              deleteBoard={this.deleteBoard}
              setBoardId={this.setBoardId}
              />
            );
    });

    } else {
      return(<h3>No Boards, Please Add One!</h3>)
    }
  }

  addBoard(e) {
    e.preventDefault();
    // grab the value from the input
    let boardName = this.refs.boardName.value;

    // make the POST Ajax create call
    // handle success and fail
    $.ajax({
      type: 'POST',
      url: './boards',
      dataType: 'JSON',
      data: { board: { name: boardName}}
    }).success( board => {
      // console.log(data);
      // set state to add the new board on success
      this.setState({ boards: [...this.state.boards, board] });
      // reset the form
      this.refs.addBoardForm.reset();
      // auto focus the board name input
      this.refs.boardName.focus();
    }).fail(data => {
      console.log(data);
    });
  }

  render() {
    if(this.state.loading) {
      return(<h3>Loading Boards...</h3>);
    } else {
      return(
        <div className="row">
        <h1>Beer Boards</h1>
        <form ref='addBoardForm' onSubmit={ this.addBoard }>
          <input ref='boardName' type='text' required placeholder="Board Name" />
          <input type='submit' className='btn orange'/>
        </form>
        <hr />
        {this.displayBoards()}
        <BoardModal boardId={this.state.boardId} />
        </div>
      );
    }
  }
}
