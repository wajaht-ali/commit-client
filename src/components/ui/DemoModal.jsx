import { FaTimes } from 'react-icons/fa';
import './DemoModal.css';

const DemoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="demo-modal-backdrop" onClick={handleBackdropClick}>
            <button
                onClick={onClose}
                className="demo-modal-close"
                aria-label="Close modal"
            >
                <FaTimes />
            </button>
            <div className="demo-modal-content">

                <div className="demo-modal-body">
                    <div className="demo-video-placeholder">
                        <p>Demo Video Coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoModal;
