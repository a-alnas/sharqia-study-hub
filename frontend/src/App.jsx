import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import './App.css';

function App() {
    // 1. Create a placeholder for our data, and a loading switch
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. The moment the app loads, call the backend
    useEffect(() => {
        fetch('http://localhost:5000/api/subjects', { cache: 'no-store' })
            .then(response => response.json()) // Convert the raw JSON to a Javascript array
            .then(data => {
                setSubjects(data); // Save the data to our state
                setLoading(false); // Turn off the loading screen
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []); // The empty array means "only do this once when the page loads"

    return (
        <div>
            <Navbar />
            <main className="main-content">
                <h1>Welcome to the Hub</h1>
                <p className="subtitle">Select a subject to start studying.</p>

                {/* 3. If loading is true, show text. Otherwise, show the cards! */}
                {loading ? (
                    <p>Loading your study materials...</p>
                ) : (
                    <div className="card-grid">
                        {subjects.map(subject => (
                            <SubjectCard
                                key={subject.id}
                                title={subject.title}
                                description={subject.description}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;