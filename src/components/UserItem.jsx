import React from "react";
import { OPTIONS } from '../utils/month';

class UserItem extends React.Component {
  render() {
    const {
      user,
    } = this.props;

    return (
      <tr>
        <th scope="row">
          {user.firstName} {user.lastName}
        </th>
        <td>
          {new Date(user.dob).toLocaleString("en-US", OPTIONS)}
        </td>
      </tr>
    );
  }
}

export default UserItem;
