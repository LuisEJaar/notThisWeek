import { useFormik, Form } from 'formik'

export default function Logout() {
  const url = `/api/logout`

  const formik = useFormik({
    initialValues: {
      characterTurn: characterTurn
    },
    onSubmit: () => {
      fetch(url, {
        method: 'get',
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
      <button className="btn btn-warning" type="submit">Logout</button>
    </Form>
  )
}