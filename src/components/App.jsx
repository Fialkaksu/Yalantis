import React from 'react';
import { API_URL } from '../utils/api';
import { MONTH } from '../utils/month';
import UserTabs from './UserTabs';
import UserItem from './UserItem';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [],
      months: MONTH,
      sort_by_month: undefined,
      allUsers: []
    }
  }

  componentDidMount() {
    this.getAll();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by_month !== this.state.sort_by_month) {
      const usersUpdate = this.state.allUsers.filter(user => user.mob === this.state.sort_by_month);
      this.setState({
        users: usersUpdate
      })
    }
  }

  getAll = () => {
    fetch(API_URL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        Array.from(data).forEach(user => {
          const dob = new Date(user.dob);
          user.mob = Number(dob.getMonth());

          Array.from(this.state.months).forEach(item => {
            if (item.num === user.mob) {
              item.count += 1;
            }

            if (item.count >= 11) {
              item.colorIndicator = 'bg-danger';
            } else if (item.count < 11 && item.count >= 7) {
              item.colorIndicator = 'bg-success';
            } else if (item.count < 7 && item.count >= 3) {
              item.colorIndicator = 'bg-primary';
            } else if (item.count < 3) {
              item.colorIndicator = 'bg-secondary';
            }
          })
        })

        this.setState({
          users: data,
          allUsers: data
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  updateSortBy = value => {
    const usersFilter = this.state.users.filter(user => user.mob === value.num);
    this.setState({
      sort_by_month: value.num,
      users: usersFilter
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <UserTabs
            months={this.state.months}
            sort_by_month={this.state.sort_by_month}
            updateSortBy={this.updateSortBy}
          />
          <div className="col-9">
            <table className="table table-sm table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>User</th>
                  <th>DOB</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user => {
                  return (
                    <UserItem
                      key={user.id}
                      user={user}
                    />
                  )
                }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;