import {gql, useMutation} from "@apollo/client";

const INCREMENT_COUNTER = gql`
    mutation IncrementCounter{
        currentValue
    }
`

function MyComponent(){
    const [mutateFunction, {loading, error, data}] = useMutation(INCREMENT_COUNTER);
}