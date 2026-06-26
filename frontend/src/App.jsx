import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import './App.css';

function App() {
    // Imagine this data is eventually coming from your backend database!
    const subjects = [
        { id: 1, title: "Mathematics", description: "Calculus, Algebra, and Geometry formulas." },
        { id: 2, title: "Physics", description: "Mechanics, Thermodynamics, and Quantum theory." },
        { id: 3, title: "Computer Science", description: "Data structures, Algorithms, and Web Dev." },
        { id: 4, title: "Chemistry", description: "Organic chemistry and Periodic trends." }
    ];

    return (
        <div>
            <Navbar />
            <main className="main-content">
                <h1>Welcome to the Hub</h1>
                <p className="subtitle">Select a subject to start studying.</p>

                {/* This is where the magic happens */}
                <div className="card-grid">
                    {subjects.map(subject => (
                        <SubjectCard
                            key={subject.id}
                            title={subject.title}
                            description={subject.description}
                        />
                    ))}
                </div>

            </main>
        </div>
    );
}

export default App;