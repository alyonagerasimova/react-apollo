import {gql, useMutation, useQuery} from "@apollo/client";

const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;

const UPDATE_TODO = gql`
    mutation UpdateTodo($id: String!, $type: String!) {
        updateTodo(id: $id, type: $type) {
            id
            type
           }
    }       
`;

export function Todos() {
    const { loading, error, data } = useQuery(GET_TODOS);
    const [updateTodo,  { loading: mutationLoading, error: mutationError }]
        = useMutation(UPDATE_TODO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.todos.map(({ id, type }) => {
        let input;

        return (
            <div key={id}>
                <p>{type}</p>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        updateTodo({variables: {id, type: input.value}})
                        input.value = "";
                    }}
                >
                    <input
                        ref={node => {
                            input = node;
                        }}
                    />
                    <button type="submit">Update Todo</button>
                </form>
                {mutationLoading && <p>Loading...</p>}
                {mutationError && <p>Error :( Please try again</p>}
            </div>
        );
    });
}