import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";


function DisplayComplaints() {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = (e) => {
    fetch('https://test-demo-gql-backend.herokuapp.com/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'SECRET'
      },
      body: JSON.stringify({
        query: `
          query MyQuery {
            complaint(limit: 10, order_by: {created_at: desc}) {
              id
              company {
                name
              }
              source
              complaint
            }
          }
          `,
      }),
    })
    .then((res) => res.json())
    .then((result) => {
        const {data} = result;
        const response = Object.values(data)[0]
        setComplaints(response)
      }
    )
  }

  useEffect(()=> getComplaints(), [])

  // const COMPLAINTS_UPDATED = gql`
  //   subscription MySubscription {
  //     complaint(limit: 10, order_by: {created_at: desc}) {
  //       id
  //       company {
  //         name
  //       }
  //       source
  //       complaint
  //     }
  //   }
  // `;

  // function LatestComplaints() {
  //   const { data, loading } = useSubscription(
  //     COMPLAINTS_UPDATED,
  //   );
  //   return <h4>New comment: {!loading && data.commentAdded.content}</h4>;
  // }

  // console.log(LatestComplaints)

  const createRow = () => {
    const rows = complaints.map((complaint)=> {
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

export default DisplayComplaints;