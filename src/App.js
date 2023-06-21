import {useQuery, gql, NetworkStatus, useLazyQuery} from "@apollo/client";
import './App.css';
import React, {useState} from "react";

const GET_LOCATIONS = gql`
    query GetLocations{
        locations{
            id
            name
            description
            photo
        }
    }
`;

function DisplayLocations() {
    const {loading, error, data} = useQuery(GET_LOCATIONS);
    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>Error: {error.message}</p>);

    return data.locations.map(({id, name, description, photo}) => (
            <div key={id}>
                <h3>{name}</h3>
                <img width="400" height="250" alt="location-reference" src={`${photo}`}/>
                <br/>
                <b>About this location:</b>
                <p>{description}</p>
                <br/>
            </div>
        )
    )
}

const GET_DOGS = gql`
    query GetDogs {
        dogs {
            id
            breed
        }
    }
`;

const GET_DOG_PHOTO = gql`
    query Dog($breed: String!){
        dog(breed: $breed){
            id
            displayImage
        }
    }
`;

function DogPhoto({breed}) {
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

function Dogs({onDogSelected}) {
    const {loading, error, data} = useQuery(GET_DOGS, );
    if (loading) return (<p>...Loading</p>);
    if (error) return (<p>Error: {error.message}</p>);

    return (
        <select name='dog' onChange={onDogSelected}>
            {data.dogs.map((dog) => (
                <option key={dog.id} value={dog.breed}>
                    {dog.breed}
                </option>
            ))}
        </select>
    );
}

function DelayedQuery() {
    const [getDog, {loading, error, data}] = useLazyQuery(GET_DOG_PHOTO);

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;

    return (
        <div>
            {data?.dog && <img src={data.dog.displayImage}/>}
            <button onClick={() => getDog({variables: {breed: 'bulldog'}})}>
                Click me!
            </button>
        </div>
    );
}


function App() {
    const [selectedDog, setSelectedDog] = useState(null);

    function onDogSelected({target}) {
        setSelectedDog(target.value);
    }

    return (
        <div className="App">
            <h2>Мое первое Apollo приложение</h2>
            <Dogs onDogSelected={onDogSelected}/>
            <DogPhoto breed={selectedDog}/>
            {/*<DelayedQuery/>*/}
        </div>
    );
}

export default App;
