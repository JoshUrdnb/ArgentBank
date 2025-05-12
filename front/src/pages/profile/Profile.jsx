import './profile.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateUserProfile } from '../../store/user/userSlice.jsx'
import AccountCard from '../../components/accountCard/AccountCard.jsx'
import accountsCardData from '../../components/accountCard/accountCard.json'

export default function Profile() {
    const user = useSelector((state) => state.user.user)
    const { error } = useSelector((state) => state.user)
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

    if (error) {
        return <div className="error-message">{error}</div>
    }

    return (
        <div className='main bg-dark'>

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

            {accountsCardData.map((acc, index) => (
                <AccountCard
                    key={index}
                    title={acc.title}
                    amount={acc.amount}
                    description={acc.description}
                />
            ))}

        </div>
    )
}