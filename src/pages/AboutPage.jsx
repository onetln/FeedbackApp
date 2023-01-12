import Card from '../components/Shered/Card'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <div className="about">
          <h2>About This Project</h2>
          <p>This is a react app to leave feedback about something.</p>
          <p>Version 1.0.0.</p>
          <p><Link to='/'>Back to main page</Link></p>
      </div>
    </Card>
  )
}

export default AboutPage
