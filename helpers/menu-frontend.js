const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'Gráficas', url: 'grafica1' },
                // { titulo: 'rxjs', url: 'rxjs' },
                // { titulo: 'Promesas', url: 'promesas' },
                // { titulo: 'ProgressBar', url: 'progress' },
            ]
        },

        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Fotografos', url: 'fotografos' },
                { titulo: 'Estudios', url: 'estudios' },
                { titulo: 'Eventos', url: 'eventos' },
            ]
        },
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' }, { titulo: 'Ficha Medicas', url: 'fichamedicas' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}