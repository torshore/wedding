import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import DetailPageLayout from '../components/DetailPageLayout.jsx';
import DropdownInput from '../components/DropdownInput.jsx';
import Spinner from '../components/Spinner.jsx';
import { getFirebase } from '../../firebase';

import '../styles/rsvp.scss';

export default function rsvp() {
    const [data, setData] = useState([])
    const [currentItem, setCurrentItem] = useState(0)
    const [currentPhase, setCurrentPhase] = useState('select')
    const [formData, setFormData] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [firebaseDatabase, setFirebaseDatabase] = useState({})
    
    useEffect(() => {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')
      
        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            const database = getFirebase(firebase).database()
            setFirebaseDatabase(database)
            // do something with `database` here,
            // or store it as an instance variable or in state
            // to do stuff with it later
            database.ref('/guests/').on('value', snap => {
                setData(snap.val())
            })
        })     
    }, []);

    const handleNameSelect = (event) => {
        setCurrentItem(Number(event.target.value))
        setCurrentPhase('name-confirmation')
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

    const handleFormChange = (event, index, type) => {
        let currentFormData = JSON.parse(formData)
        currentFormData[index][type] = event.target.value
        setFormData(JSON.stringify(currentFormData))
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
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

    if (currentPhase === 'select'){
        return <DetailPageLayout>
            {data
                ? <div className="rsvp">
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

                    {/*<select value={currentItem} onChange={(event) => handleNameSelect(event)}>
                    { data.map((item, index) => {
                        return <option key={ index } value={ index }>
                            { item.name }
                        </option>
                    }) } }
                </select>*/}
                </div>
                : <Spinner />
            }
        </DetailPageLayout>
    }
    
    if (currentPhase === 'name-confirmation'){
        return <DetailPageLayout>
            <div>
                You have selected { data[currentItem].name }. Please Confirm.
            </div>
            <div>
                <div className='confirmation-button' onClick={() => setCurrentPhase('attendance-confirmation')}>YES</div>
                <div className='confirmation-button' onClick={() => setCurrentPhase('select')}>NO</div>
            </div>
        </DetailPageLayout>
    }
    if (currentPhase === 'attendance-confirmation'){
        return <DetailPageLayout>
            <div>
                Are You or anyone in your party atttending?
            </div>
            <div>
                <div className='confirmation-button' onClick={() =>  handleAttending(true)}>YES</div>
                <div className='confirmation-button' onClick={() =>  handleAttending(false) }>NO</div>
            </div>
        </DetailPageLayout>
    }
    if (currentPhase === 'thanks'){
        return <DetailPageLayout>
            <div>
                Thank you.
            </div>
            <div>
                Any concerns or messages for Tory and Macky?
            </div>
            <form onSubmit={ handleMessageSubmit }>
                <input type='text' value={ message } onChange={ handleMessageChange } />
                <input type='submit' />
            </form>
        </DetailPageLayout>
    }
    if (currentPhase === 'details'){
        return <DetailPageLayout>
            <div>
                Hello, Party of { data[currentItem].name }. You have been alloted { data[currentItem].count } seats.
            </div>
            <div>
                Please Fill in the following details for your reservation. If you dont need all the slots just leave the space blank.
            </div>
            <div>
                <form onSubmit={ handleSubmit }>
                { JSON.parse(formData).map( (formItem, index) => {
                    return <div key={ index }>
                        <input placeholder='name' type="text" value={ formItem.name } onChange={ () => handleFormChange(event, index, 'name') } name={ index }>
                        </input>
                        <div className='dinner-picker'>
                            <p>
                                select a dinner choice:
                            </p>
                            <select value={ formItem.dinner } onChange={ () => handleFormChange(event, index, 'dinner') } name={ index }>
                            <option value='undecided'>
                                    undecided
                                </option>
                                <option value='chicken'>
                                    chicken
                                </option>
                                <option value='beef'>
                                    beef
                                </option>
                                <option value='veggie'>
                                    veggie
                                </option>
                                <option value='kids meal'>
                                    kids meal
                                </option>
                            </select>
                        </div>
                    </div>
                }) }
                <input type='submit'/>
                </form>
            </div>
            <div>
                { error }
            </div>
            <div>
                if you have any concerns about your number of seats, please email torymackywedding@gmail.com
            </div>
        </DetailPageLayout>
    }
}