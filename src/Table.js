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

    const complaints = this.props.data.complaint

    const rows = complaints.map((complaint)=> {
      return (
        <tr key={complaint.id}>
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