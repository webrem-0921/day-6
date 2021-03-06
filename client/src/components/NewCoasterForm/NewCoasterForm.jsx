import { useContext, useState } from "react"
import { Form, Button, Row, Col } from 'react-bootstrap'
import { saveCoaster } from "../../services/coasters.service"
import { uploadImage } from "../../services/upload.service"
import { MessageContext } from './../../context/userMessage.context'
import Spinner from './../LoadingSpinner/LoadingSpinner'

function NewCoasterForm(props) {

    const [coasterForm, setCoasterForm] = useState({
        title: '',
        description: '',
        inversions: 0,
        length: 0,
        imageUrl: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { title, description, inversions, length, imageUrl } = coasterForm

    const handleInputChange = e => {
        const { name, value } = e.target
        setCoasterForm({ ...coasterForm, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadImage(uploadData)
            .then(res => {
                setLoadingImage(false)
                setCoasterForm({ ...coasterForm, imageUrl: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    const handleFormSubmit = e => {
        e.preventDefault()

        saveCoaster(coasterForm)
            .then(() => props.finishFormActions())
            .catch(err => {
                setMessageInfo({ title: 'Error', desc: 'El formulario contiene errores' })
                setShowMessage(true)
            })
    }

    return (

        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripci??n</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
                <Form.Text className="text-muted">M??nimo 20 caracteres</Form.Text>
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="inversions">
                        <Form.Label>Inversiones</Form.Label>
                        <Form.Control type="number" value={inversions} onChange={handleInputChange} name="inversions" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="length">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control type="number" value={length} onChange={handleInputChange} name="length" />
                    </Form.Group>
                </Col>

                <Col>
                    {/* <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" value={imageUrl} onChange={handleInputChange} name="imageUrl" />
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Imagen (file)</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>

                </Col>
            </Row>

            <Button disabled={loadingImage} variant="dark" type="submit" >{loadingImage ? 'Cargando...' : 'Crear monta??a rusa'}</Button>
            {loadingImage && <Spinner />}

        </Form>
    )
}

export default NewCoasterForm