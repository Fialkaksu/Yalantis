import React from "react";

class UserTabs extends React.Component {

  render() {
    const { months, sort_by_month, updateSortBy } = this.props;

    const handleClick = value => () => {
      updateSortBy(value);
    };

    const getClassLink = value => {
      return `list-group-item ${sort_by_month === value.num ? "active" : ""} ${value.colorIndicator}`;
    };

    return (
      <div className="col-3">
        <h3>Depending on the number of people:</h3>
        <ul className="list-group">
          <li className="list-group-item bg-secondary">[0-2]</li>
          <li className="list-group-item bg-primary">[3-6]</li>
          <li className="list-group-item bg-success">[7-10]</li>
          <li className="list-group-item bg-danger">[11+]</li>
        </ul>
        <br />
        <ul className="list-group">
          <li className="list-group-item text-center">click for show people in specific month</li>
          {months.map(month => {
            return (
              <li
                key={month.name}
                className={getClassLink(month)}
                onClick={handleClick(month)}
              >
                {month.name}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default UserTabs;
