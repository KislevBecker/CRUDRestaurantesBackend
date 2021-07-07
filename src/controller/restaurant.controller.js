import Restaurant from '../models/restaurants';
import RestaurantTypes from '../models/restaurantTypes';

export async function getRestaurant(req, res) {
    try {
        const restaurant = await Restaurant.findAll({
            atributes: ['id', 'name']
        });
        res.json({
            data: restaurant
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Algo ha salido mal, intente de nuevo'
        });
    }
};

export async function createRestaurant(req, res) {
    const { name } = req.body;
    try {
        let newRestaurant = await Restaurant.create({
            name
        }, {
                fields: ['name']
            });
        if (newRestauran) {
            return res.json({
                message: 'Nuevo tipo de restaurante creado',
                data: newRestaurant
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

export async function getOneRestaurant(req, res) {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findOne({
            where: {
                id
            }
        })
        res.json(restaurant);
    } catch (error) {
        console.log(error);
    }
}

export async function updateRestaurant(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const restaurant = await Restaurant.findAll({
            atributes: ['id', 'name'],
            where: {
                id
            }
        });
        if (restaurant.length > 0) {
            restaurant.forEach(async (restaurant) => {
                await restaurant.update({
                    // name: name ? name : project.name,
                    name
                });
            });
            return res.json({
                message: 'Tipo de restaurante actualizado',
                data: restaurantTypes
            })
        }
    } catch (e) {
        res.json({
            message: 'No se pudo actualizar este tipo de restaurante restaurante.',
            data: {}
        })
    }
};

export async function deleteRestaurant(req, res) {
    const { id } = req.params;
    try {
        await RestaurantTypes.destroy({
            where: {
                restaurantType: id
            }
        });
        const deleteRowsCount = await Restaurant.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Tipo de restaurante eliminado',
            count: deleteRowsCount
        })
    } catch (error) {
        res.json({
            message: 'Falló la eliminación.',
            data: {}
        });
    }
};


export async function deleteAll(req, res) {
    try {
        await RestaurantTypes.destroy({
            where: {   },
            truncate:false
        });
        const deleteRowsCount = await Restaurant.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Tipo de restaurante eliminado',
            count: deleteRowsCount
        })
    } catch (error) {
        res.json({
            message: 'Falló la eliminación.',
            data: {}
        });
    }
};

