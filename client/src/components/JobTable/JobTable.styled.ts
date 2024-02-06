// JobTable.styled.ts

import styled from 'styled-components';

export const JobTableWrapper = styled.div`
  margin: 20px; /* Adjust the margin as per your design */
  font-family: 'Arial', sans-serif; /* Change the font-family */

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px; /* Adjust the margin as per your design */
    background-color: #fff; /* Change the background color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add box shadow for a subtle effect */
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd; /* Add border bottom for cells */
  }

  th {
    background-color: #f2f2f2; /* Change the background color for header cells */
  }

  .counter {
    margin-top: 20px; /* Adjust the margin as per your design */
    font-size: 18px; /* Change the font size */
  }

  input {
    padding: 8px;
    margin-right: 10px; /* Adjust the margin as per your design */
  }

  button {
    padding: 8px 12px;
    background-color: #4caf50; /* Change the background color for the button */
    color: #fff; /* Change the text color for the button */
    cursor: pointer;
  }
`;
