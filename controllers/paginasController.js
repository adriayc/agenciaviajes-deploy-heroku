import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {                    // req (request): lo que enviamos, res (response): lo que espress responde
    // Creamos un array con las consultas
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {

        // No es bueno para el performace por que no se ejecutaran al mismo tiempo
        // Consultar 3 viajes del modelo Viaje
        // const viajes = await Viaje.findAll({ limit: 3 });
        // Consultar 3 testimoniales del modelo Testimoniales
        // const testimoniales = await Testimonial.findAll({ limit: 3 });

        // Ejecutar varias consultas al mismo tiempo usando promesas
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            // viajes,
            // testimoniales
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    // Consultar DB
    const viajes = await Viaje.findAll();
    console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        // viajes: viajes,
        viajes,
    });
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    // console.log(req.params);             // Solicitud del params al servidor
    // console.log(req.params.viaje);

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug }});

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        });
    } catch (error) {
        
    }
};

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });   
    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}