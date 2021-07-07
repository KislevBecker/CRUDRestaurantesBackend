import RestaurantTypes from '../models/restaurantTypes';


export async function getRestaurantTypes(req, res) {
    try {
        const restaurantTypes = await RestaurantTypes.findAll({
            atributes: ['id', 'name']
        });
        res.json({
            data: restaurantTypes
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Algo ha salido mal, intente de nuevo'
        });
    }
};

export async function createRestaurantTypes(req, res) {
    const { name } = req.body;
    try {
        let newRestaurantTypes = await RestaurantTypes.create({
            name
        }, {
                fields: ['name']
            });
        if (newRestaurantTypes) {
            return res.json({
                message: 'Nuevo tipo de restaurante creado',
                data: newRestaurantTypes
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salió mal, intente de nuevo.',
            data: {},
        })
    }
    res.json('received');
};

export async function getOneRestaurantTypes(req, res) {
    const { id } = req.params;
    try {
        const restaurantTypes = await RestaurantTypes.findOne({
            where: {
                id
            }
        })
        res.json(restaurantTypes);
    } catch (error) {
        console.log(error);
    }
}

