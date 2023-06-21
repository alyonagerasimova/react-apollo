import {gql, useMutation} from "@apollo/client";

const ADD_TODO = gql`
    mutation AddTodo($type: String!){
        addTodo(type: $type){
            id
            type
        }
    }
`;

export function AddTodo() {
    let input;
    const [addTodo, {loading, error, data}] = useMutation(ADD_TODO, {
        update(cache, {data: {addTodo}}) {
            cache.modify({
                fields: {
                    todos(existingTodos = []) {
                        const newTodoRef = cache.writeFragment({
                            data: addTodo,
                            fragment: gql`
                                fragment NewTodo on Todo {
                                    id
                                    type
                                }     
                            `
                        });
                        return [...existingTodos, newTodoRef];
                    }
                }
            })
        },
        refetchQueries: ["ReallyImportantQuery"],
        // onQueryUpdated(observableQuery){
        //     if(shouldRefetchQuery(observableQuery)){
        //         return observableQuery.refetch();
        //     }
        // }
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error ${error.message}`;


    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    addTodo({variables: {type: input.value}})
                    input.value = "";
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}