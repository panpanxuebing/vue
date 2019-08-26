const getCompnentName = url => {
    return url.split('view/')[1].split('.html')[0];
}

const getMenu = jsonData => {
    const parentMenus = jsonData.filter(item => !item.pid);
    const childMenus = jsonData.filter(item => item.pid);

    childMenus.forEach(item => {
        const pMenu = parentMenus.find(menu => item.pid === menu.id);

        if(!pMenu.subs) {
            pMenu.subs = [];
        }

        if(pMenu) {
            const componentName = getCompnentName(item.url);

            pMenu.subs.push({
                name: item.text,
                componentName
            });
        }
    });
    
    const menus = parentMenus.map(item => {
        return {
            id: item.id,
            name: item.text,
            subs: item.subs
        }
    });

    return menus;
}

export default getMenu;