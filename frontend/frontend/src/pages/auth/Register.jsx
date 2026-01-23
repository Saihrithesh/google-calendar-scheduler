import { useState } from 'react'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {
const [form, setForm] = useState({ email: '', password: '', role: 'USER' })
const navigate = useNavigate()


const register = async () => {
await api.post('/auth/register', form)
navigate('/login')
}


return (
<div className="card">
<h2>Register</h2>
<input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
<input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
<select onChange={e => setForm({ ...form, role: e.target.value })}>
<option value="USER">USER</option>
<option value="ADMIN">ADMIN</option>
</select>
<button onClick={register}>Register</button>
</div>
)
}