import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import DetailPageLayout from '../components/DetailPageLayout.jsx';
import DropdownInput from '../components/DropdownInput.jsx';
import Spinner from '../components/Spinner.jsx';
import TextInput from '../components/TextInput.jsx';
import { getFirebase } from '../../firebase';

import '../styles/rsvp.scss';

const foodOptions = [
    { name: 'undecided' },
    { name: 'Chicken' },
    { name: 'Beef' },
    { name: 'Vegetarian' },
    { name: 'Kids Meal' }
];

export default function rsvp() {
    const [data, setData] = useState(null);
    const [currentItem, setCurrentItem] = useState(0);
    const [currentPhase, setCurrentPhase] = useState('select');
    const [formData, setFormData] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [firebaseDatabase, setFirebaseDatabase] = useState({});
    
    useEffect(() => {
        const lazyApp = import('firebase/app');
        const lazyDatabase = import('firebase/database');
      
        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            const database = getFirebase(firebase).database()
            setFirebaseDatabase(database)
            // do something with `database` here,
            // or store it as an instance variable or in state
            // to do stuff with it later
            database.ref('/guests/').on('value', snap => {
                setData(snap.val());
            })
        })     
    }, []);

    const handleNameSelect = (value) => {
        setCurrentItem(Number(value));
        setCurrentPhase('name-confirmation');
    }

    const handleAttending = (bool) => {
        // remove attending value from data
        let currentData = data[currentItem]
        if (currentData.attending){
            delete currentData.attending
        }
        let updates = {}
        updates['/guests/' + currentItem] = {
            attending: bool,
            ...currentData
        }
        firebaseDatabase.ref().update(updates)
        bool ? handleInitialFormData(data[currentItem].count)
        : setCurrentPhase('thanks')
    }
 
    const handleInitialFormData = (count) => {
        // this makes an array of numbers based on the given count. ie: count of 2, array = [1,2]
        // let count = data[currentItem].count
        const array = []
        while (count > 0){
            array.push(count)
            count --
        }
        array.sort() 
        let currentForm = formData
        array.map(() => {
            let obj = {
                name: '',
                dinner: 'undecided'
            }
            currentForm.push(obj)
        })
        setFormData(JSON.stringify(currentForm))
        setCurrentPhase('details')
    }

    const handleFormChange = (value, index, type) => {
        let currentFormData = JSON.parse(formData)
        currentFormData[index][type] = value;
        setFormData(JSON.stringify(currentFormData))
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleMessageSubmit = (event) => {
        event.preventDefault()
        let updates = {}
        updates['/guests/' + currentItem] = {
            ...data[currentItem],
            message: message
        }
        firebaseDatabase.ref().update(updates)
        navigate("/")
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const currentFormData = JSON.parse(formData)
        // removes blank names
        const filteredFormData = currentFormData.filter(item => !!item.name)
         // check for any unpicked dinner choices in filtered form data
         const noDinnerCheck = filteredFormData.filter(item => item.dinner === 'undecided')
        // throw error if any unfilled dinner choices
        if (filteredFormData.length === 0){
            setError('please input at least one name.')
        } else if (noDinnerCheck.length !== 0){
            setError('please input dinner choices for everyone attending')
        } else {
            let updates = {}
            updates['/guests/' + currentItem] = {
                ...data[currentItem],
                attending: true,
                confirmed_count: filteredFormData.length
            }
            let guests = []
            filteredFormData.map(item => {
                guests.push({
                    name: item.name,
                    dinner: item.dinner
                })
            })
            updates['/guests/' + currentItem] = {
                guests,
                ...data[currentItem]
            }
            firebaseDatabase.ref().update(updates)
            setCurrentPhase('thanks')
        }
    }
    return <DetailPageLayout>
        <div className="rsvp">
            {currentPhase === 'select'
                ? data
                    ? <>
                        <div className="_title">
                            <div className="_image" />

                            <span>Please choose your name from the list below:</span>
                        </div>
                        <DropdownInput
                            placeholder="Guests"
                            value={currentItem}
                            onChange={(event) => handleNameSelect(event.target.value)}
                            options={data}
                        />
                    </>
                    : <Spinner />
                : null
            }

            {currentPhase === 'name-confirmation'
                ? <>
                    <div className="_title">
                        <div className="_image" />

                        <span>Please confirm your selection:</span>
                        <span className="_name">{data[currentItem].name}</span>
                    </div>
                   
                    <div className="_button-group">
                        <button 
                            className='confirmation-button'
                            onClick={() => setCurrentPhase('attendance-confirmation')}
                        >
                            YES
                        </button>
                        <button
                            className='confirmation-button'
                            onClick={() => setCurrentPhase('select')}
                        >
                            NO
                        </button>
                    </div>
                </>
                : null
            }

            {currentPhase === 'attendance-confirmation'
                ? <>
                    <div className="_title">
                        <div className="_image" />

                        <span>Will you, or anyone in your party, be able to attend?</span>
                    </div>
                    
                    <div className="_button-group">
                        <button
                            className="confirmation-button"
                            onClick={() => handleAttending(true)}
                        >
                            YES
                        </button>
                        <button
                            className="confirmation-button"
                            onClick={() => handleAttending(false)}
                        >
                            NO
                        </button>
                    </div>
                </>
                : null
            }

            {currentPhase === 'thanks'
                ? <>
                    <div className="_title">
                        <div className="_image" />

                        {/* eslint-disable react/no-unescaped-entities */}
                        <span>Thank you for taking the time to RSVP!</span>
                        <span>If you can't make it, we're sorry you can't be there to celebrate with us!</span>
                    </div>
                    
                    <form onSubmit={handleMessageSubmit}>
                        <TextInput
                            type="textarea"
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Let us know if you have any messages or questions"
                        />
                        <button type='submit'>Finish RSVP</button>
                    </form>
                </>
                : null
            }

            {currentPhase === 'details'
                ? <>
                    <div className="_title">
                        <div className="_image" />

                        <span>RSVP</span>
                    </div>
                    <div className="_label">
                        <span>Hi, {data[currentItem].name}! We have reserved {data[currentItem].count} seats in your honour</span>

                        <span>Please fill in the following details for your reservation</span>
                    </div>
                    <div className="_label -italics">
                        If a member of your party is unable to attend, please leave their row blank
                    </div>
                    <div className="_label">
                        Please input the name and dinner selection for each guest:
                    </div>
                    <form onSubmit={handleSubmit}>
                        {JSON.parse(formData).map((formItem, index) => {
                            return <div className='_dinner-picker' key={index}>
                                <div className="_align-input -text"><TextInput
                                    placeholder="Name of Guest"
                                    type="text"
                                    value={formItem.name}
                                    onChange={() => handleFormChange(event.target.value, index, 'name')}
                                    name={index}
                                /></div>

                                <div className="_align-input">
                                    <DropdownInput
                                        placeholder="Dinner Choice"
                                        value={formItem.dinner}
                                        onChange={(event) => handleFormChange(foodOptions[event.target.value].name, index, 'dinner')}
                                        options={foodOptions}
                                        name={index}
                                        small
                                    />
                                </div>
                            </div>
                        })}
                        <button type='submit'>Submit</button>
                    </form>
                    <div>
                        {error}
                    </div>
                    <div className="_label -italics">
                        If you have any concerns or questions about your RSVP, please email torymackywedding@gmail.com
                    </div>
                </>
                : null
            }
        </div>
    </DetailPageLayout>
}
