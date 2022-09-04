import React from 'react';
import { useState } from 'react';
import DisplayComplaints from './DisplayComplaints';

function App() {
  const [source, editSource] = useState('');
  const [complaint, editComplaint] = useState('');
  const [companyName, editCompanyName] = useState('');
  const companyId = "ad6f4da8-06af-45be-ba79-83156a72471f";

  const submitComplaint = (e) => {
    e.preventDefault();
    fetch('https://test-demo-gql-backend.herokuapp.com/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'SECRET'
      },
      body: JSON.stringify({
        query: `
          mutation MyMutation($source: String!, $complaint: String!, $companyId: uuid!) {
            insert_complaint_one(object: {source: $source , complaint: $complaint , companyId: $companyId}) {
              id
            }
          }
          `,
          variables: {
            source: source,
            complaint: complaint,
            companyId: companyId
          },
      }),
    })
    .then((res) => res.json())
    .then((result) => console.log(result));
  }

  const handleChange = (e) => {
    const value = e.target.name;
    if (value === 'source') {
      editSource(e.target.value)
    }
    if (value === 'complaint') {
      editComplaint(e.target.value)
    }
    if (value === 'companyName') {
      editCompanyName(e.target.value)
    }
  }

  return (
    <div className='container-center'>
      <h1 className='heading'>Submit Complaint</h1>
      <form onSubmit={submitComplaint} className="form-container">
        <input value={source} onChange={handleChange} name="source" placeholder='source' />
        <input value={complaint} onChange={handleChange} name="complaint" placeholder='complaint' />
        <input value={companyName} onChange={handleChange} name="companyName" placeholder='company name' />
        <button type='submit'> Submit</button>
      </form>
      <h2 className='heading2'>List of Complaints</h2>
      <DisplayComplaints />
    </div>
  );
}

export default App;

