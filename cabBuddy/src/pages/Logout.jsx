import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear authentication token
    localStorage.removeItem('token')
    // Redirect to home page
    navigate('/')
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  )
}

export default Logout