const ProfileModal = ({ user, onClose }) => {
    if (!user) return null; // Ensure user exists

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>User Profile</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                <button className="btn btn-danger" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProfileModal;
