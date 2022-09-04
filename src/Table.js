import React from "react";

export class Table extends Component {
  componentDidMount() {
    this.props.subscribeToNewComments();
  }

  createRow() {
    const rows = this.props.complaints.map((complaint)=> {
      return (
        <tr>
          <td> {complaint.company.name}</td>
          <td>{complaint.complaint}</td>
          <td>{complaint.source}</td>
        </tr>
      )
    })
    return rows;
  }

  render() {
    return (
      <table>
        <tr>
          <th>Company Name</th>
          <th>Complaint</th>
          <th>Source</th>
        </tr>
        {createRow()}
      </table>
    )
  }
}

export default Table;