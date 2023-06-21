import {gql, NetworkStatus, useQuery} from "@apollo/client";
import React from "react";

export const GET_DOG_PHOTO = gql`
    query Dog($breed: String!){
        dog(breed: $breed){
            id
            displayImage
        }
    }
`;

export function DogPhoto({breed}) {
    const {loading, error, data, refetch, networkStatus} = useQuery(GET_DOG_PHOTO, {
        variables: {breed},
        notifyOnNetworkStatusChange: true
    });
    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>Error: {error.message}</p>);
    if (networkStatus === NetworkStatus.refetch) return 'Refetching';

    return <div>
        <img src={data.dog.displayImage} style={{height: 100, width: 100}} alt=""/>
        <button
            onClick={() => refetch({breed: 'new_dog_breed'})}>
            Refetch!
        </button>
    </div>
}