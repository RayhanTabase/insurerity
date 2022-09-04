import React from "react";

export class Table extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewComplaints();
  }

  createRow() {
    const {loading} = this.props;
    if (loading) return (
      <tr>
          <td> Loading . . .</td>
      </tr>
    )

    // console.log(this.props.data.complaint[0])
    let complaints = this.props.data.complaint
    // console.log(complaint);

    const rows = complaints.map((complaint)=> {
      // console.log(complaint);
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
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Complaint</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {this.createRow()}
        </tbody>
      </table>
    )
  }
}

export default Table;