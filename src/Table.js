import React from "react";

export class Table extends React.Component {
  // componentDidMount() {
  //   this.props.subscribeToNewComments();
  // }

  createRow() {
    const {loading} = this.props;
    console.log(loading);
    if (loading) return <div> Loading... </div>;
    console.log(this.props)
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
        {this.createRow()}
      </table>
    )
  }
}

export default Table;