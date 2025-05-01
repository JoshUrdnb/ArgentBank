import './profile.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateUserProfile } from '../../store/user/userSlice.jsx'

export default function Profile() {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState(user?.firstName || '')
    const [lastName, setLastName] = useState(user?.lastName || '')

    const handleSave = () => {
        dispatch(updateUserProfile({ firstName, lastName }))
        setIsEditing(false)
    }

    const handleCancel = () => {
        setFirstName(user?.firstName || '')
        setLastName(user?.lastName || '')
        setIsEditing(false)
    }

    return (
        <div className='bg-dark'>

            <div className="form-container">
                {!isEditing ? (
                    <>
                        <h1>Welcome back<br />{user?.firstName} {user?.lastName} !</h1>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                    </>
                ) : (
                    <div className="edit-form">
                        <h1>Edit Name</h1>
                        <div className='input-container'>
                            <input className="input-field"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input className="input-field"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='button-container'>
                            <button className="save-button edit-button-style" onClick={handleSave}>Save</button>
                            <button className="cancel-button edit-button-style" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            <h2 className="sr-only">Accounts</h2>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>

                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>

                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>

            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>

                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </div>
    )
}