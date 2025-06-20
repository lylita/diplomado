function validate(schema, target = 'body') {
    return (req, res, next) => {
        const data = req[target];
        //paso 1: verificar que exista datos
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No data provided' });
        }
        //paso 2: Validar contra el esquema de opciones
        const { error ,value} = schema.validate(data, { 
            abortEarly: false,  //ono se detenga en el primer error
            stripUnknown: true //elimina las propiedades que no esten en el esquema
            
            
        });
        //paso 3: si hay error, retornar el error
        if (error) {
            return res.status(400).json({  
                message: `error de validacion en ${target}` ,
                errors: error.details.map(err =>error.message)        
            });
        }
        //paso 4: reemplzar los datos validados en el objeto de la peticion
        req[target] = value;
        //paso 5: continuar con la siguiente funcion
        next();

    }
}   
export default validate;