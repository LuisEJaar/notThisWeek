import TextInput from "../FormComponents/TextInput";
import { Formik, Field } from "formik";

export default function CreateGame({ setGames }) {

  const actionUrl = "https://notthisweek.herokuapp.com/api/post/createPost"
  
  return (
    <>
      <div className="modal fade" id="createGame" tabIndex="-1" aria-labelledby="createGameLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createGameLabel">A new journey awaits!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  file: null,
                  title: "",
                  caption: "",
                }}
                onSubmit={(values) => {
                  let formData = new FormData();
                  formData.append("file", values.file);
                  formData.append("title", values.title);
                  formData.append("caption", values.caption);

                  fetch(actionUrl, {
                    method: 'post',
                    encType: "multipart/form-data",
                    withCredentials: true,
                    body: formData,
                  })
                  .then((res) => res.json())
                  .then((data) => setGames(data.posts))
                  .catch((err) => {
                    console.log(err)
                  })
                }} 
              > 
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    props
                  }) => (
                  <form
                    onSubmit={handleSubmit}
                  >
                    <TextInput handleChange={handleChange} value={values.title} id="title" text="Title:" name="title" placeholder="Interesting Title" required/>
                    <Field as="textarea" onChange={handleChange} value={values.caption} className="form-control" id="gameDescription" placeholder="Game Description" name="caption"></Field>
                    <div className="mt-2">
                      <label htmlFor="imgUpload" className="form-label">Image</label>
                      <input type="file" onChange={ (e)=> setFieldValue("file", e.currentTarget.files[0]) } className="form-control" id="imageUpload" name="file" required/>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary" value="Upload">Create Game</button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

