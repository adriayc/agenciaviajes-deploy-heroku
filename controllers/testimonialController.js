import { Testimonial } from '../models/Testimoniales.js';               // Importar el model de Testimonial

const guardarTestimonial = async (req, res) => {
    // Muestra los datos que se envia del formulario
    // console.log(req.body);

    // Validar...
    const { nombre, correo, mensaje } = req.body;
    const errores = [];
    
    if(nombre.trim() === '') {
        // console.log('El nombre esta vacio');
        errores.push({mensaje: 'El Nombre esta vacio'});
    }
    if(correo.trim() === '') {
        // console.log('El correo esta vacio');
        errores.push({mensaje: 'El Correo esta vacio'});
    }
    if(mensaje.trim() === '') {
        // console.log('El mensaje esta vacio');
        errores.push({mensaje: 'El Mensaje esta vacio'});
    }

    // console.log(errores);
    if(errores.length > 0) {
        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // Almacenar en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    guardarTestimonial
};