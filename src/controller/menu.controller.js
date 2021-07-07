import Menu from '../models/menu';
import RestaurantTypes from "./restaurantTypes";


export async function getMenu(req, res) {
    try {
        const menu = await Menu.findAll({
            where: { typeid: RestaurantTypes.id },
            atributes: ['id', 'name', 'typeid']
        });
        res.json({
            data: menu
        })
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Algo ha salido mal, intente de nuevo'
        });
    }
};

export async function createMenu(req, res) {
    const { name } = req.body;
    try {
        let newMenu = await Menu.create({
            name
        }, {
                fields: ['name']
            });
        if (newMenu) {
            return res.json({
                message: 'Nuevo tipo de restaurante creado',
                data: newMenu
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

export async function getOneMenu(req, res) {
    const { id } = req.params;
    try {
        const menu = await Menu.findOne({
            where: {
                id
            }
        })
        res.json(menu);
    } catch (error) {
        console.log(error);
    }
}
