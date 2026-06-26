export default function SubjectCard({ title, description }) {
    return (
        <div className="subject-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="card-btn">Start Studying</button>
        </div>
    );
}