class BoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { board: {}, loading: true, lists: [] }
    this.modalDisplay = this.modalDisplay.bind(this);
    this.addList = this.addList.bind(this);
    this.updateLists = this.updateLists.bind(this);
  }


  componentWillReceiveProps(newProps) {
    // console.log('modal mounted');
    $.ajax({
      url: `/boards/${newProps.boardId}`,
      type: 'GET',
      dataType: 'JSON'
    }).success(board => {
      let lists = board.lists
      this.setState({ board, loading: false, lists });
      // console.log(data);
    }).fail(data => {
      this.setState({ loading: false });
      console.log(data);
    });
  }

  displayLists() {
    let lists = this.state.lists;
    let board = this.state.board;
    if(lists.length) {
      return lists.map( list => {
        return(<List boardId={board.id} key={list.id} list={list} update={ () => this.updateLists(id) } />);
      });
    } else {
      return(<h4>No Lists, Please Add One!</h4>)
    }
  }


  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.state.board.id}/lists`,
      type: 'POST',
      dataType: 'JSON',
      data: { list: { title: this.refs.listName.value }}
    }).success( list => {
      let board = this.state.board;
      board.lists.push(list);
      this.setState({ board });
      this.refs.addListForm.reset();
      this.refs.listName.focus();
      // console.log(data);
    }).fail( data => {
      console.log(data);
    });
  }

  updateLists(id) {
    let lists = this.state.lists;
    let index = lists.findIndex( l => l.id === id);
    this.setState({
      lists:
      [
        ...lists.slice(0, index),
        ...lists.slice(index + 1, lists.length)
      ]
    });
  }


  modalDisplay() {
    // add a new form to add a list to a board
    let board = this.state.board;

    if(this.state.loading) {
      return(<h4>Loading Data...</h4>);
    } else {
      return(
        <div>
        <h4> {board.name} </h4>
        <form ref='addListForm' onSubmit={this.addList}>
          <input type='text' required ref='listName' placeholder='List Name' />
          <input type='submit' className='btn orange' />
        </form>
        <hr />
        { this.displayLists() }
        </div>
      );
    }
  }

  render() {
    return(
      <div id="show-modal" className="modal modal-fixed-footer">
        <div className="modal-content">
          { this.modalDisplay() }
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
        </div>
      </div>
    );
  }
}
