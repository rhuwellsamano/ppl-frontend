import React from 'react';
import {connect} from 'react-redux';
import {usersGetFetch} from '../redux/actions';
import Card from '../components/Card';

class Container extends React.Component {
  componentDidMount = () => {
    this.props.usersGetFetch()
  }

  formatCards = () => {
    return this.props.users.map(user => <Card key={user.id} user={user}/>)
  }

  // YOU CAN CALL THE REDUX STORE WITH this.props.whateverkeyvalueyouneed AS
  // LONG AS MAPSTATETOPROPS FUNCTION IS IN THE JS FILE AND YOU
  // IMPORTED AND USED CONNECT IN YOUR EXPORT DEFAULT BELOW!!

  render() {
    return (
      <div>
        <h2>Project Management App</h2>
        {this.props.message}
        {this.formatCards()}
      </div>
    )
  }
}

// "I'm getting something from the store"
const mapStateToProps = state => {
  return {
    message: state.message,
    users: state.users
  }
}

// "I got your shipment right here boi"
const mapDispatchToProps = dispatch => {
  return {
    usersGetFetch: () => dispatch(usersGetFetch())
  }
}

// the middle-man connect // mapStateToProps to have access to Store // mapDispatchToProps to have access to Dispatcher
export default connect(mapStateToProps, mapDispatchToProps)(Container);
