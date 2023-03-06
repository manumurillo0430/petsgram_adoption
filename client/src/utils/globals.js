export const requiredField = 'Required field.'
export const userNameTooShort = 'Username too short.'
export const passwordTooShort = 'Password too short.'

export const telRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const petTypes = ['Any', 'Dog', 'Cat', 'Rabbit', 'Bird']

export const petStatus = ['Adopted', 'Fostered', 'Available']
export const userRoleColor = (role) => {
    let style = {}

    if (role === true) style['color'] = '#0096FF'
    else style['color'] = '#50C878'

    return style
}

export const logInPictureLight =
    'https://res.cloudinary.com/dugudxkyu/image/upload/v1676643038/7fbac6523f58c558f3f2329469aa5594_hmabe1.jpg'

export const logInPictureDark = 'https://res.cloudinary.com/dugudxkyu/image/upload/v1676644100/image0_2_taakem.jpg'

export const noProfilePictureDark = 'https://res.cloudinary.com/dugudxkyu/image/upload/v1675782681/pngegg_2_fydscv.png'

export const noProfilePictureLight =
    'https://res.cloudinary.com/dugudxkyu/image/upload/v1675882255/nbhe8urlmuolmesci04g.png'

export const noProfilePetDark = 'https://res.cloudinary.com/dugudxkyu/image/upload/v1675953123/pngwing.com_2_pzt5nj.png'

export const noProfilePetLight = 'https://res.cloudinary.com/dugudxkyu/image/upload/v1675954405/gato_2_o7iwlu.png'

export const logoWithBrandDark = 'https://res.cloudinary.com/dugudxkyu/image/upload/v1676923781/negro_ggol1w.png'

export const brandLight =
    'https://res.cloudinary.com/dugudxkyu/image/upload/v1677687994/petsgram_logo_larger-02_1_ctchek.png'

export const brandDark =
    'https://res.cloudinary.com/dugudxkyu/image/upload/v1677687993/petsgram_logo_larger-01_1_dstiix.png'

export const logoWithBrandLight = 'https://res.cloudinary.com/dugudxkyu/image/upload/v1676923781/blanco_wlbvex.png'

export const petStatusColor = (adoptionStatus) => {
    let style = {}

    if (adoptionStatus === 'Adopted') style['color'] = '#DA70D6'
    else if (adoptionStatus === 'Fostered') style['color'] = '#0096FF'
    else style['color'] = '#50C878'

    return style
}

export const petStatusBgColor = (adoptionStatus) => {
    let style = {}

    if (adoptionStatus === 'Adopted') style['background-color'] = '#DA70D6'
    else if (adoptionStatus === 'Fostered') style['background-color'] = '#0096FF'
    else style['background-color'] = '#50C878'

    return style
}
