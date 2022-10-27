import TextInput from "../FormComponents/TextInput";
import { Formik, Field } from "formik";

export default function CreateGame({ setGames }) {

  const actionUrl = "https://notthisweek.herokuapp.com/api/post/createPost"
  
  return (
    <>
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
            {/* <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" required/>
            </div> */}

            <Field as="textarea" onChange={handleChange} value={values.caption} className="form-control" id="gameDescription" placeholder="Game Description" name="caption"></Field>
            
            {/* <div className="mb-3">
              <label htmlFor="caption" className="form-label">Description</label>
              <textarea className="form-control" id="caption" name="caption" required></textarea>
            </div> */}

            <div className="mt-2">
              <label htmlFor="imgUpload" className="form-label">Image</label>
              <input type="file" onChange={ (e)=> setFieldValue("file", e.currentTarget.files[0]) } className="form-control" id="imageUpload" name="file" required/>
            </div>
            {/* <div className="mb-3">
              <label htmlFor="imgUpload" className="form-label">Image</label>
              <input type="file" className="form-control" id="imageUpload" name="file" required/>
            </div> */}
            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary" value="Upload">Create Game</button>
          </form>
        )}
      </Formik>
    </>
  )
}