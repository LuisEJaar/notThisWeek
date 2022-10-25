import { useFormik, Form } from 'formik'
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  
  const url = `/api/logout`
  const formik = useFormik({
    onSubmit: () => {
      fetch(url, {
        method: 'get',
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedOut) {
          navigate('https://notthisweek.herokuapp.com/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })

  return (
    <Form
      className="m-3"
      onSubmit={formik.handleSubmit}
    >
      <button className="btn btn-outline-info" type="submit">Logout</button>
    </Form>
  )
}