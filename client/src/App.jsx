import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <h1>Loading..</h1>;
  console.log(data);
  return (
    <div className="App">
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
