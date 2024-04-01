
// React component that represents a sticky note with check boxes and text fields
export default function StickyNote() {
    return (
        <div className="sticky-note" style= {{backgroundColor : '#F9BEC2'}}>
            <div className="note-content">
            <h3 style={{textAlign : 'center'}}>Today</h3>
            <input type="checkbox" />  <span className="task-time">12:00</span>  <span className="task-name">TaskName</span>
            </div>
            
        </div>
    );
}