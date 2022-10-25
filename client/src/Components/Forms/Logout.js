import { useFormik, Form } from 'formik'

export default function Logout() {
  const url = `/api/logout`

  const formik = useFormik({
    onSubmit: () => {
      fetch(url, {
        method: 'get',
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedOut) {
          navigate('/')
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